const bookRouter = require('./book');

function route(app) {
    app.use('/books', bookRouter);
}

module.exports = route;
