const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
let fs = require('fs')

let win

function createWindow() {
   win = new BrowserWindow({width: 800, height: 600})
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
   }))
   win.on('closed', function () {
   let filename = 'contacts'
   
   if(fs.existsSync(filename)) {
      let data = fs.readFileSync(filename, 'utf8')
      data = data.replace(/^\s*[\r\n]/gm,"")
      fs.writeFile('contacts', data,  function(err) {
         if (err) {
            return console.error(err);
         }
      })
   }
   
})
}

app.on('ready', createWindow)


