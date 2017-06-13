const fs = require('fs-extra');

fs.exists('.env.json', (envJsonExists) => {
    if (envJsonExists) {
        require('dot-env');
    }

    require('./boot').init();
});
