const BrowserWindow = require('electron').remote
const url = require('url')
const path = require('path')
const {dialog} = require('electron').remote

let win

function createWindow() {
   win = new BrowserWindow({width: 800, height: 600})
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'test1.html'),
      protocol: 'file:',
      slashes: true
   }))
}

dialog.showOpenDialog(createWindow())