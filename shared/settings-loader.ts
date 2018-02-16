import { Settings } from './settings';

declare var browser: any;

export class SettingsLoader {

    public load(): Promise<Settings> {
        return browser.storage.local.get()
            .then((json: any) => new Settings(json));
    }

    public save(settings: Settings): Promise<void> {
        return browser.storage.local.set(settings);
    }

}
