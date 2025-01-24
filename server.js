const express = require('express');
const bodyParser = require('body-parser');
const db = require('./dbConfig'); // Importa a configuração do banco de dados
const path = require('path');

// Inicializa o Express
const app = express();
const PORT = 3000; // Porta do servidor

// Middleware para processar JSON e dados de formulários
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configura a pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota inicial para verificar o funcionamento do servidor
app.get('/', (req, res) => {
  res.send('Servidor do PDAForum está funcionando!');
});

// Rota para recuperar todos os posts
app.get('/posts', (req, res) => {
  db.query('SELECT * FROM posts ORDER BY created_at DESC', (err, results) => {
    if (err) {
      console.error('Erro ao buscar posts:', err.message);
      res.status(500).send('Erro ao buscar posts.');
    } else {
      console.log('Posts recuperados:', results); // Log para debugging
      res.json(results); // Retorna os posts como JSON
    }
  });
});


// Rota para adicionar um novo post
app.post('/add-post', async (req, res) => {
  const { title, content } = req.body;

  // Validação básica
  if (!title || !content) {
    return res.status(400).send('Título e conteúdo são obrigatórios.');
  }

  try {
    await db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content]);
    console.log('Post criado com sucesso!');

    // Redirecionar para a página inicial
    res.redirect('/');
  } catch (error) {
    console.error('Erro ao criar post:', error);
    res.status(500).send('Erro ao criar post.');
  }
});

// Rota padrão para carregar o HTML principal
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
