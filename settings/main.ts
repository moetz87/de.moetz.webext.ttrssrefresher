import { SettingsLoader } from '../shared/settings-loader';
import { UserInterface } from './user-interface';

export class Main {

    constructor(
        readonly ui: UserInterface,
        readonly settingsLoader: SettingsLoader) { }

    public run() {
        this.settingsLoader.load().then(this.ui.setSettings);
    }

    public registerEventHandler() {
        this.ui.urlField.onchange
            = this.ui.intervalField.onchange
            = () => {
                const settings = this.ui.getSettings();
                this.settingsLoader.save(settings)
                    .then(() => this.ui.showMessage('Einstellungen erfolgreich gespeichert.'))
                    .catch(error => this.ui.showErrorMessage(`Fehler beim Speichern von Einstellungen: ${error}.`));
            };
    }

}

/**
 * EXECUTE MAIN
 */
const main = new Main(new UserInterface(), new SettingsLoader());
main.registerEventHandler();
main.run();
