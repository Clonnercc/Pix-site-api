import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const ADMIN_PASS = '001533';
const DATA_FILE = './data.json';

// inicializa dados
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({
    titulo: 'Falta pouco!',
    subtitulo: 'Copie e cole o código no seu app de pagamentos',
    valor: 'R$ 475,21',
    codigo: '',
    validade: 'Código válido por 30 minutos.'
  }, null, 2));
}

// leitura
app.get('/api/pix', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

// atualização (admin)
app.post('/api/pix', (req, res) => {
  const { senha, dados } = req.body;

  if (senha !== ADMIN_PASS) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(dados, null, 2));
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log('API rodando na porta', PORT);
});
