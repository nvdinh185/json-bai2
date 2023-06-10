const bookRouter = require('./book');

function route(app) {
    app.use('/book', bookRouter);
}

module.exports = route;
