const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron');
const path = require('path');

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


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
