import * as JQuery from 'jquery';
import { SettingsLoader } from '../shared/settings-loader';

declare var browser: any;

class RefreshTriggerer {

    constructor(private settingsLoader: SettingsLoader) { }

    public run() {
        this.refreshAfterTimeout(0);
    }

    private refreshAfterTimeout(interval: number) {
        console.log('Refreshing...');
        setTimeout(async () => {
            const settings = await this.settingsLoader.load();
            console.log(`Interval: ${settings.interval}`);
            this.refreshAfterTimeout(settings.interval * 1000);
            await this.isEnabled();
            await this.urlMatches();
            await this.refresh();
        }, interval);
    }

    private isEnabled(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.settingsLoader.load().then(
                settings => {
                    if (settings.enabled) {
                        console.log('is enabled');
                        resolve();
                    } else {
                        console.log('is disabled');
                        reject();
                    }
                },
                error => console.log(`Error: ${error}`));
        });
    }

    private urlMatches(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.settingsLoader.load().then(settings => {
                const regex = new RegExp(settings.url, 'g');
                // const currentUrl = window.location.href;
                browser.tabs.query({ active: true, currentWindow: true }).then(
                    tabs => {
                        const currentUrl = tabs[0].url;
                        if (regex.test(currentUrl)) {
                            console.log(`url ${currentUrl} matches regex ${regex}`);
                            resolve();
                        } else {
                            console.log(`url ${currentUrl} does not match regex ${regex}`);
                            reject();
                        }
                    },
                    error => console.log(`Error: ${error}`));
            });
        });
    }

    private refresh(): Promise<void> {
        return new Promise((resolve, reject) => {
            JQuery('span:contains("Feeds")').trigger('click');
            browser.tabs.query({ active: true, currentWindow: true }).then(
                tabs => {
                    const tabId = tabs[0].id;
                    console.log(`TabID: ${tabId}`);
                    browser.tabs.executeScript(tabId, { file: '/content-scripts/refresher.js' }).then(
                        () => {
                            console.log('refreshed');
                            resolve();
                        },
                        error => {
                            console.error(`Error: ${error}`);
                            reject();
                        });
                },
                error => console.log(`Error: ${error}`));
        });
    }

}

/**
 * EXECUTE MAIN
 */
new RefreshTriggerer(new SettingsLoader()).run();
