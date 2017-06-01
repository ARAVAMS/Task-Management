const electron = require('electron');
const {app, BrowserWindow, Menu} = electron
const path = require('path')
const url = require('url')

// Template for the Menu
menuTemplate = [
  {
    label: 'TaskManager',
    submenu: [
      {
        label: 'TaskDtails',
		click: () => {
          openAboutWindow()
        }
       
      },
	  {
        label: 'Add Task',
		click: () => {
          openAboutWindow()
        }
       
      }
    ]
  }
]

// Keep a global reference so the garbage collector does not destroy our app
let mainWindow

// In renderer process (web page).
const ipc = require('electron').ipcRenderer;
var ipcMain = require('electron').ipcMain;


function createWindow () {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1150,
    height: 550,
	backgroundColor: '#AABBCC'
	
	
  })

  // Load the index.html file
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Set up the menu
  var menu = Menu.buildFromTemplate(menuTemplate)
  mainWindow.setMenu(menu)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// Opens the about window
function openAboutWindow() {

  let aboutWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    width: 600,
    height: 400
  })
  aboutWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'about.html'),
    protocol: 'file:',
    slashes: true
  }))
  aboutWindow.setMenu(null)
  aboutWindow.once('ready-to-show', () => {
    aboutWindow.show()
  })
}

// Create the window then the app is ready
app.on('ready', () => {
  createWindow()
  electron.powerMonitor.on('on-ac', () => {
    mainWindow.restore()
  })
  electron.powerMonitor.on('on-battery', () => {
    mainWindow.minimize()
  })
})

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Reopen the app on macOS
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
