const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));


const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Erro ao conectar ao SQLite:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});


db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    senha TEXT
  )`, (err) => {
    if (err) console.error("Erro ao criar tabela:", err.message);
  });


  const sqlInsert = `INSERT OR IGNORE INTO users (email, senha) VALUES (?, ?)`;
  db.run(sqlInsert, ['usuario@teste.com', '123'], (err) => {
    if (err) console.error("Erro ao inserir usuário:", err.message);
  });
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;


  const sql = `SELECT * FROM users WHERE email = ? AND senha = ?`;

  db.get(sql, [email, senha], (err, row) => {
    if (err) {

      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    if (row) {

      res.status(200).json({ message: 'Login efetuado com sucesso!' });
    } else {

      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  });
});

app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`);
});