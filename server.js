const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_FILE = path.join(__dirname, 'data.json');
const ADMIN_PASS = '001533';

app.use(cors());
app.use(express.json());

// ===== FUNÇÕES SEGURAS =====
function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) return null;

    const content = fs.readFileSync(DATA_FILE, 'utf8');
    if (!content) return null;

    return JSON.parse(content);
  } catch (err) {
    console.error('Erro JSON:', err.message);
    return null;
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ===== ROTAS =====

// GET Pix (site)
app.get('/api/pix', (req, res) => {
  let data = readData();

  if (!data) {
    data = {
      titulo: 'Falta pouco!',
      subtitulo: 'Copie e cole o código no seu app de pagamentos',
      valor: 'R$ 475,21',
      codigo: '00020126580014br.gov.bcb.pix0136codigo-exemplo',
      validade: 'Código válido por 30 minutos.'
    };
    writeData(data);
  }

  res.json(data);
});

// POST Pix (admin)
app.post('/api/pix', (req, res) => {
  const { senha, dados } = req.body;

  if (senha !== ADMIN_PASS) {
    return res.status(401).json({ error: 'Senha incorreta' });
  }

  if (!dados || typeof dados !== 'object') {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  writeData(dados);
  res.json({ ok: true });
});

// Health check
app.get('/', (req, res) => {
  res.send('API PIX ONLINE');
});

app.listen(PORT, () => {
  console.log('API rodando na porta', PORT);
});
