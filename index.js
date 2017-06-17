import MicroEvent from 'microevent';
import App from './app/App.js';

MicroEvent.mixin(App);

let app = new App(null);

app.bind('fetch', (message) => {
    console.log('FETCH: [%s] %s', message.code, message.uri);
});

app.bind('setWallpaper', (status) => {
    console.log('setWallpaper: ' + status);
});

console.log('Starting Application...');
app.run();