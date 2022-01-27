var PythonShell = require('python-shell');
const fs = require('fs');
const remote = require('electron').remote

var filePath = document.getElementById("file_path");



const {dialog} = require("electron").remote;

filePath.addEventListener("click", () => {
	dialog.showOpenDialog((fileNames) => {
		fs.readFile(fileNames[0],"utf-8", (err, data) => {
			
			var options = {
				mode: 'text',
				pythonPath: '/usr/bin/python3',
				pythonOptions: ['-u'], // get print results in real-time
				scriptPath: '/home/govind/electron/electron-quick-start',
				args: [[fileNames[0]]]
			  };

			PythonShell.run('nltk_p.py', options, function (err, results) {
				console.log("file created")
			  	var window = remote.getCurrentWindow()
				window.loadFile("index.html")
                                //window.addExtension('/home/govind/.config/google-chrome/Default/Extensions/nmmhkkegccagdldgiimedpiccmgmieda/1.0.0.4_0')
                                  
				//window.addDevToolsExtension('/home/govind/.config/google-chrome/Default/Extensions/nmmhkkegccagdldgiimedpiccmgmieda/1.0.0.4_0')
			  });	  
			localStorage.setItem("url", fileNames[0]);
		});
	});
});
