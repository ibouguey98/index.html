const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir les fichiers statiques du dossier projet (pour admin page, front-end, etc.)
app.use(express.static(__dirname));

// Simple Basic Auth pour l'admin
const ADMIN_USER = 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin123';

function checkAuth(req, res, next){
  const auth = req.headers['authorization'];
  if(!auth || !auth.startsWith('Basic ')){
    res.set('WWW-Authenticate','Basic realm="Biinaa-Glam Admin"');
    return res.status(401).json({status:'error',message:'Unauthorized'});
  }
  const base = auth.split(' ')[1];
  const decoded = Buffer.from(base, 'base64').toString();
  const [user, pass] = decoded.split(':');
  if(user === ADMIN_USER && pass === ADMIN_PASS) return next();
  return res.status(403).json({status:'error',message:'Forbidden'});
}

const CSV_FILE = path.join(__dirname, 'contacts.csv');

function ensureHeader(){
  if(!fs.existsSync(CSV_FILE)){
    fs.writeFileSync(CSV_FILE, 'timestamp,name,email,phone,message\n', {encoding:'utf8'});
  }
}

function escapeCsv(value){
  if(value==null) return '';
  const s = String(value).replace(/"/g,'""');
  return `"${s}"`;
}

app.post('/contact', (req, res) => {
  const { name, email, phone, message, timestamp } = req.body || {};

  if(!name || !email || !message){
    return res.status(400).json({ status: 'error', message: 'name, email and message are required' });
  }

  ensureHeader();

  const row = [timestamp || new Date().toISOString(), name, email, phone || '', message].map(escapeCsv).join(',') + '\n';
  fs.appendFile(CSV_FILE, row, (err) => {
    if(err){
      console.error('Failed to append contact:', err);
      return res.status(500).json({ status: 'error', message: 'failed to save' });
    }
    res.json({ status: 'ok' });
  });
});

app.get('/health', (req,res)=>res.json({status:'ok'}));

// Endpoint admin: retourne les soumissions (JSON) — protégé par Basic Auth
app.get('/admin/data', checkAuth, (req, res) => {
  try{
    if(!fs.existsSync(CSV_FILE)) return res.json([]);
    const raw = fs.readFileSync(CSV_FILE, 'utf8');
    const lines = raw.split(/\r?\n/).filter(Boolean);
    // première ligne = en-tête
    const data = lines.slice(1).map(line => {
      // découper CSV simple (les valeurs sont entourées de ")
      const cols = line.match(/"(.*?)"(?:,|$)/g) || [];
      const values = cols.map(c => c.replace(/^"|"$/g, '').replace(/""/g, '"'));
      return {
        timestamp: values[0] || '',
        name: values[1] || '',
        email: values[2] || '',
        phone: values[3] || '',
        message: values[4] || ''
      };
    });
    res.json(data);
  }catch(err){
    console.error('admin/data error', err);
    res.status(500).json({status:'error',message:'failed to read data'});
  }
});

app.listen(PORT, ()=>{
  console.log(`Biinaa-Glam backend listening on http://localhost:${PORT}`);
});
