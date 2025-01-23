const express = require('express');
const bodyParser = require('body-parser');
const db = require('./dbConfig'); // Importa a configuração do banco de dados

const app = express();
const PORT = 3000;

// Middleware para processar JSON e dados de formulários
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota inicial para verificar o funcionamento do servidor
app.get('/', (req, res) => {
  res.send('Servidor do PDAForum está funcionando!');
});

// Rota para recuperar todos os posts
app.get('/posts', (req, res) => {
  db.query('SELECT * FROM posts ORDER BY created_at DESC', (err, results) => {
    if (err) {
      console.error('Erro ao buscar posts:', err);
      res.status(500).send('Erro ao buscar posts.');
    } else {
      res.json(results); // Retorna os posts como JSON
    }
  });
});

// Rota para adicionar um novo post
app.post('/add-post', async (req, res) => {
  const { title, content } = req.body;

  // Validação básica
  if (!title ||!content) {
    return res.status(400).send('Título e conteúdo são obrigatórios.');
  }

  try {
    await db.query('INSERT INTO posts (title, content) VALUES (?,?)', [title, content]);
    res.status(200).send('Post criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar post:', error);
    res.status(500).send('Erro ao criar post.');
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});