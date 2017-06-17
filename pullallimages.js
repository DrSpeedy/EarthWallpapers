let fs = require('fs');
let request = require('request');
let colors = require('colors');
let exec = require('child_process').exec;

const imageIds = require('./app/resources/imageIds.js').ids;

function fetch(uri, filename, pathToSave, callback) {
    request.head(uri, function (err, res, body) {
        
        if (res.statusCode == 200) {
            console.log(colors.green('[%s] %s'), res.statusCode, uri);
        } else {
            console.log(colors.red('[%s] %s'), res.statusCode, uri);
        }

        // console.log('RES: ' + JSON.stringify(res) + ' | ERR: ' + JSON.stringify(err));
        let filePath = './' + filename;
        if (pathToSave != null) {
            filePath = pathToSave + filename;
        }
        try {
            let req = request(uri);
            req.on('error', (error) => {
                console.error(error);
            });
            req.pipe(fs.createWriteStream(filePath)).on('close', callback);
        } catch(e) {
            console.log(colors.red('%s'), e);
        }
    });
}

function fetchRandom() {
    let index = imageIds[Math.floor(Math.random() * (imageIds.length - 1))];
    let uri = 'https://earthview.withgoogle.com/download/' + index + '.jpg';

    fetch(uri, 'wallpaper.jpg', '/tmp/', () => { return console.log('[FETCHED] ' + uri); });
}

function setWallpaper() {
    let command = 'gsettings set org.gnome.desktop.background picture-uri /tmp/wallpaper.jpg';
    exec(command, (error, stdout, stderr) => {
        if (error !== null) {
            console.out('ERROR => %s', error);
        }
    });
}

fetchRandom();
setWallpaper();



//fetch('https://earthview.withgoogle.com/download/1017.jpg', 'test.jpg', '/tmp/', () => { return console.log('Downloaded test'); });