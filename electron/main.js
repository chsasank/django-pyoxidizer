// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const http = require("http");

function startDjangoExecutable() {
  var resourcePath = path.join(
    __dirname,
    "extraResources/x86_64-apple-darwin/debug/install/pyapp"
  );

  const server = spawn(resourcePath, ["runserver"]);

  server.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  server.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  server.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });

  return server;
}

var server;


function retryLoadURL(mainWindow){
  var options = { method: "GET", host: "127.0.0.1", port: 8000, path: "/" };
  var req = http.request(options, (r) => {
    console.log("Loading url");
    mainWindow.loadURL("http://127.0.0.1:8000/");
  });
  req.on("error", function (error) {
    // Error handling here
    console.log("retrying LoadURL in 200ms");
    setTimeout(() => retryLoadURL(mainWindow), 200)
  });
  req.end();
}


function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");
  retryLoadURL(mainWindow)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  server = startDjangoExecutable();
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// kill server before quitting
app.on("before-quit", function () {
  console.log("killing server");
  server.kill();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
