var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: '/home/govind/electron/electron-quick-start/electron-quick-start-linux-x64',
    outputDirectory: '/home/govind/electron',
    authors: 'My App Inc.',
    exe: 'myapp.exe'
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));
