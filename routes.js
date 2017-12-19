module.exports = function(app){
    var ips = require('./controllers/ips');

    app.get('/v1/:ip', ips.findByIp);

    app.get('/import', ips.import);

}