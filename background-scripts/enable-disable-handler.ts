import { SettingsLoader } from '../shared/settings-loader';

declare var browser: any;

class EnableDisableHandler {

    constructor(private settingsLoader: SettingsLoader) { }

    public run() {
        this.init();
        browser.browserAction.onClicked.addListener(this.onMenubarIconClicked);
    }

    public init() {
        this.settingsLoader.load().then(settings => {
            if (settings.enabled === true) {
                this.setEnabledIcon();
            } else {
                this.setDisabledIcon();
            }
        });
    }

    public onMenubarIconClicked = () => {
        this.settingsLoader.load().then(settings => {
            if (settings.enabled === true) {
                this.setDisabledIcon();
            } else {
                this.setEnabledIcon();
            }
            settings.enabled = !settings.enabled;
            this.settingsLoader.save(settings);
            console.log(`Enabled? ${settings.enabled}`);
        });
    }

    private setDisabledIcon() {
        browser.browserAction.setIcon({path: 'icons/logo-disabled.png'});
    }

    private setEnabledIcon() {
        browser.browserAction.setIcon({path: 'icons/logo.png'});
    }

}

new EnableDisableHandler(new SettingsLoader()).run();
