const express = require('express');
const app = express();
const path = require('path');
const { engine, create } = require('express-handlebars');
const port = 8000;
const morgan = require('morgan');
const route = require('./routes');
const methodOverride = require('method-override');
const { connect } = require('./config/db');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
connect();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); // xử lý data từ form submit
app.use(express.json()); //xử lý data được gửi từ XMLRequest, fetch, aixos, ...
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(SortMiddleware);
app.engine(
    '.hbs',
    engine({ extname: '.hbs', helpers: require('./helpers/handlebars') }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));
//Route initss
route(app);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
