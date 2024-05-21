const fs = require('fs');

const MEMES = {
    'png': 'data:image/png;base64,',
    'jpg': 'data:image/jpg;base64,',
    'mp3': 'data:audio/mpeg;base64,'
}

module.exports = class AssetsLoader {
    constructor() {
        this.path = process.cwd() + '/src';
        this.target = process.cwd() + '/assets';
        this.assets = {};
        this.init();
    }

    init() {
        this.cleanTarget();
        this.createTarget();
        this.readDirectory(this.path + '/img');
        this.readDirectory(this.path + '/audio');
        this.createJSON();
    }

    cleanTarget() {
        fs.rmSync(this.target, { recursive: true, force: true });
    }

    createTarget() {
        try {
            if (!fs.existsSync(this.target)) {
                fs.mkdirSync(this.target);
            } else {
            }
        } catch (err) {
            console.error(err);
        }
    }

    readDirectory(folderPath, prefix) {
        let json = {};
        const files = fs.readdirSync(folderPath);

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            const splitString = file.split('.');
            const ext = file.split('.').pop();
            const name = splitString[0];
            let data;

            if (fs.lstatSync(folderPath + '/' + file).isDirectory() && file !== '.DS_Store') {
                this.readDirectory(folderPath + '/' + file, file);
                continue;
            }

            switch (ext) {
                case 'mp3':
                case 'png':
                case 'jpg':
                    data = MEMES[ext] + fs.readFileSync(folderPath + `/${file}`, { encoding: 'base64' });
                    const key = prefix ? `${prefix}/${file}` : file;
                    json[key] = data;
                    break;
            }
        }

        this.assets = { ...this.assets, ...json };
    }

    createJSON() {
        fs.writeFileSync(this.target + '/file.json', JSON.stringify(this.assets), 'utf8');
    }
}