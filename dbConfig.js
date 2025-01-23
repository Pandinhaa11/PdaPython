const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Usuário padrão do XAMPP
  password: '', // Deixe vazio se não configurou uma senha
  database: 'forum_db',
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

module.exports = connection;
