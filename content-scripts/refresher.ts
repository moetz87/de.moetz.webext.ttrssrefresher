import * as JQuery from 'jquery';

class Refresher {

    public run() {
        console.log('Refresher triggered');
        JQuery('span:contains("Feeds")').trigger('click');
    }

}

/**
 * EXECUTE MAIN
 */
new Refresher().run();
