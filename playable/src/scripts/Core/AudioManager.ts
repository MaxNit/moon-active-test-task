import { sound } from '@pixi/sound'

export class AudioManger {

    play(name: string, volume?: number, loop?: boolean) {
        const audio = sound.find(name);
        if (volume !== undefined) audio.volume = volume;
        if (loop !== undefined) audio.loop = loop;

        audio.play();
    }
}