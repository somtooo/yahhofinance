http = require('https');
module.exports = function(endpoint, callback) {
    http.get(endpoint, res => {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', chunk => {
            data += chunk;
        });
        res.on('end', () => {
            try {
                callback(data);
            } catch (e) {
                callback( null );
            }
        });
        res.resume();
    }).on('error', e => {
        callback( null );
    });
}