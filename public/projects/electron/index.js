const { app, BrowserWindow } = require('electron');
function createWindow() {
    let win = new BrowserWindow({ width: 800, height: 600 });
    win.loadFile('index.html');
    setInterval(() => {
        console.log('reload');
        win.reload();
    }, 10*60*1000);
}
app.on('ready', createWindow);
