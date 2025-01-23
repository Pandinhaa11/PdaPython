// app.js
const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron');
const path = require('path');

document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');

    // Dados simulados
    const posts = [
        { id: 1, title: 'Bem-vindo ao Fórum!', content: 'Esse é o nosso primeiro post.' },
        { id: 2, title: 'Postagem de Exemplo', content: 'Aqui está um exemplo de postagem no fórum.' },
    ];

    // Renderizar os posts
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
           
        `;

        // Adicionar evento de clique ao post inteiro
        postElement.addEventListener('click', () => {
            window.location.href = `post.html?id=${post.id}`;
        });

        postsContainer.appendChild(postElement);
    });

    // Impedir que o clique no botão "Leia Mais" cause problemas (opcional)
    document.querySelectorAll('.view-post').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede o clique de se propagar para o elemento pai
        });
    });
});


let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    title: "PDAForum",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
  });

  mainWindow.loadFile('index.html');

  // Configurar o menu do aplicativo
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        { role: 'quit' },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Sobre',
          click: () => {
            showAboutDialog();
          },
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);
});

// Função para exibir o diálogo "Sobre"
function showAboutDialog() {
  dialog.showMessageBox({
    type: 'info',
    title: 'Sobre o PDAForum',
    message: 'PDAForum',
    detail: `Versão: 1.0.0\n\n© 2025 PDAForum Team.`,
    icon: path.join(__dirname, 'icon.svg'), // Certifique-se de que este arquivo exista
    buttons: ['OK'],
  });
}
