import { Loader as PIXILoader } from 'pixi.js';
import { sound } from '@pixi/sound';
export class Loader {

    private _loader: PIXILoader;

    get loader() { return this._loader };

    constructor(pixiLoader: PIXILoader) {
        this._loader = pixiLoader;
    }

    load(): Promise<void> {
        const config = window['Assets'];
        const keys = Object.keys(config);

        for (let name of keys) {
            const base64 = config[name];
            const split = name.split('.');
            const key = split[0];
            const ext = split[1];

            if (ext === 'mp3') {
                sound.add(key, base64);
            } else {
                this.loader.add(key, base64);
            }
        }

        return new Promise(resolve => {
            this.loader.load(() => resolve());
        })
    }
}