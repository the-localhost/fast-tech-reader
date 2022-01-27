var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");

const BrowserWindow = require('electron').remote.BrowserWindow;

var words = document.getElementById("word_div");
var btn1 = document.getElementById("btn1");
var pdfu = document.getElementById("pdfu");
var definition = document.getElementById("definition");


console.log(window.location.href)
var rootdir = "..";
var i;
for (i=0; i < process.cwd().split('/').length ; i++) {
	rootdir += '/..';
}
console.log(rootdir);
pdfu.setAttribute("src", "pdfjs/web/viewer.html?file="+rootdir+localStorage.getItem("url"));
console.log(rootdir+localStorage.getItem("url"));
/*
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
				fs.readFile('pdf.json', 'utf8', function (err, data) {
				  if (err) throw err;
				  obj = JSON.parse(data);
				  })
			  });

			console.log("file created")
			
		});
	});
});

var options = {
  mode: 'text',
  pythonPath: '/usr/bin/python3',
  pythonOptions: ['-u'], // get print results in real-time
  scriptPath: '/home/govind/electron/electron-quick-start',
  args: [[fileN]]
};

var fs = require('fs');

var obj;
PythonShell.run('hac.py', options, function (err, results) {
  fs.readFile('pdf.json', 'utf8', function (err, data) {
	if (err) throw err;
	obj = JSON.parse(data);
	})

});


var operation = function() {
	if(window.Worker) {
		var worker = new Worker("js/webworker.js");
		tempP = localStorage.getItem("pageno");
		worker.postMessage({tempP});
	}
}*/

var obj;
fs.readFile('pdf.json', 'utf8', function (err, data) {
	if (err) throw err;
	obj = JSON.parse(data);
});


btn1.addEventListener("click", function() {
	word_div.innerHTML = "";
	var i = 0;
	var url = "http://services.aonaware.com/DictService/Default.aspx?action=define&dict=*&query=";
	words = obj['page'+localStorage.getItem("pageno")];
	//localStorage.setItem('wordL',words.length);
	words.forEach(function(el) {
		fullU = url + el;
		request(fullU, function(err,res,body) {
                		var $ = cheerio.load(body);
                		//console.log($('pre').slice(0).text());

        		}
		);

		word_div.insertAdjacentHTML('beforeend', '<a src="#">' +el+'<br></a>');
	i++;
	});
})

//a = BrowserWindow.addDevToolsExtension('/home/govind/.config/google-chrome/Default/Extensions/nmmhkkegccagdldgiimedpiccmgmieda/1.0.0.4_0')
//console.log(a)
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${'google-dictionary-by-goog'}`))
    .catch((err) => console.log('An error occurred: ', err));