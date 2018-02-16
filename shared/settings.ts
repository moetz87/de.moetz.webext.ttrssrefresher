
export class Settings {

    public url = 'https://sample.url.de.*';
    public interval = 30;
    public enabled = true;

    constructor(json: any) {
        return Object.assign(this, json);
    }

    public toJson(): string {
        return JSON.stringify(this);
    }

}
