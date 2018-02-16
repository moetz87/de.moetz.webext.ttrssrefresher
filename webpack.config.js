var srcdir = `${__dirname}`
var dstdir = `${__dirname}`

var config = {
    context: __dirname,
    target: 'web',
    node: {
        fs: 'empty'
    },
    module: {
        rules: [{
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};

var settingsConfig = Object.assign({}, config, {
    entry: `${srcdir}/settings/main.ts`,
    output: {
        path: `${dstdir}/settings/`,
        filename: 'index.js'
    },
});

var contentScriptConfig1 = Object.assign({}, config, {
    entry: `${srcdir}/content-scripts/refresher.ts`,
    output: {
        path: `${dstdir}/content-scripts/`,
        filename: 'refresher.js'
    },
});

var backgroundScriptConfig1 = Object.assign({}, config, {
    entry: `${srcdir}/background-scripts/enable-disable-handler.ts`,
    output: {
        path: `${dstdir}/background-scripts/`,
        filename: 'enable-disable-handler.js'
    },
});

var backgroundScriptConfig2 = Object.assign({}, config, {
    entry: `${srcdir}/background-scripts/refresh-triggerer.ts`,
    output: {
        path: `${dstdir}/background-scripts/`,
        filename: 'refresh-triggerer.js'
    },
});

module.exports = [
    settingsConfig, backgroundScriptConfig1, backgroundScriptConfig2, contentScriptConfig1
];