const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

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


});


app.post('/cadastro', async (req, res) => {
  const { email, senha } = req.body;

  const sqlCheck = `SELECT * FROM users WHERE email = ?`;
  db.get(sqlCheck, [email], async (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
    if (row) {

      return res.status(409).json({ message: 'Email já cadastrado' });
    }


    const senhaHash = await bcrypt.hash(senha, 10);


    const sqlInsert = `INSERT INTO users (email, senha) VALUES (?, ?)`;
    db.run(sqlInsert, [email, senhaHash], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao cadastrar usuário' });
      }

      res.status(201).json({ message: 'Cadastro realizado com sucesso!' });
    });
  });
});


app.post('/login', (req, res) => {
  const { email, senha } = req.body;


  const sql = `SELECT * FROM users WHERE email = ?`;

  db.get(sql, [email], async (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }


    if (!row) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }


    const senhaValida = await bcrypt.compare(senha, row.senha);

    if (senhaValida) {

      res.status(200).json({ message: 'Login efetuado com sucesso!' });
    } else {

      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  });
});


app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`);
});