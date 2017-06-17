import MicroEvent from 'microevent';
import Request from 'request';
import fs from 'fs';
import { exec as Exec } from 'child_process';

import Ticker from './Ticker';

class App {
    constructor(params) {
        MicroEvent.mixin(Ticker);

        this._data = require('./resources/imageIds').ids;
        this._ticker = new Ticker(3 * 60 * 1000);
    }

    getRandomId(data) {
        let max = data.length;
        let index = Math.floor(Math.random() * (max - 1));

        return data[index];
    }

    fetch(uri, pathToSave, callback) {
        let self = this;
        Request.head(uri, (error, response, body) => {
            self.trigger('fetch', {code: response.statusCode, uri: uri});
            if (response.statusCode === 200) {
                let fileName = pathToSave + 'wallpaper.jpg';
                let req = Request(uri);
                req.pipe(fs.createWriteStream(fileName));
            }
        });
    }

    fetchWallpaper(id) {
        let uri = 'https://earthview.withgoogle.com/download/' + id + '.jpg';
        this.fetch(uri, '/tmp/', null);
    }

    setWallpaper() {
        let command = 'gsettings set org.gnome.desktop.background picture-uri /tmp/wallpaper.jpg';
        Exec(command);
    }

    run() {
        let self = this;

        this._ticker.bind('tick', (date) => {
            console.log(date);
            let id = self.getRandomId(self._data);
            self.fetchWallpaper(id);
            self.setWallpaper();
        });
    }
}

module.exports = App;
