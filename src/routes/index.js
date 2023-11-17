const courseRoute = require('./courseRoute');
const siteRoute = require('./siteRoute');
const apiRoute = require('./apiRoute');
const meRoute = require('./meRoute');
function route(app) {
    app.use('/me', meRoute);
    app.use('/api/v1/courses', apiRoute);
    app.use('/courses', courseRoute);
    app.use('/', siteRoute);
}

module.exports = route;
