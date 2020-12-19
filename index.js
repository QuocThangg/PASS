/* ///
/// B1. Create "project"
/// 	npm  init  -y
/// B2. INSTALL
/// 	npm install express  body-parser  cookie-parser multer ejs mongodb mongoose  express-session cookie-session qrcode  qrcode-svg  --save
/// B3. RUN - server
/// 	node   index.js
*/ // 	

/// ................................................................
/// 					 Khai báo LIB Thêm Vào để sử dụng
/// ................................................................
var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

/// ................................................................
/// 					 		Engine EJS
/// ................................................................
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


/// ................................................................
/// 					 		Config
/// ................................................................
/// Tham số
const PORT = process.env.PORT || 8080
/// ------------------ Khai bao cac Folder Tĩnh, Session, Cookies
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/// ------------------ Khai bao cac Folder Tĩnh, Session, Cookies
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*--- SERVER: Session + Cookies ---*/
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var uuid = require('uuid');
var fileStoreOptions = {};
var sessOptions = {
    genid: function(req) {
        return uuid.v4(); // use UUIDs for session IDs
    },
    store: new FileStore(fileStoreOptions),
    secret: 'AdTekDev - NNTu',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000,
    }
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sessOptions));



/// --- Code SESSION
app.use(function sessionLog(req, res, next) {

        //req.sessionOptions.maxAge = req.session.maxAge || req.sessionOptions.maxAge;

        console.log('\n\t REQ: ',
            req.session,
            req.sessionID,
            Date().toString());
        next();
    })
    /// ................................................................
    /// 						ROUTer - ROUTing
    /// ................................................................
    /*--- Home ---*/
var homeControl = require('./controllers/homeController');
app.get('/', homeControl);

/*--- Admin ---*/
var adminControl = require('./controllers/adminController');
app.use('/admin', adminControl);

/*--- User ---*/
var userControl = require('./controllers/userController');
app.use('/user', userControl);

/*--- Product ---*/
var productControl = require('./controllers/productController');
app.use('/product', productControl);

/*--- Order ---*/
var orderControl = require('./controllers/orderController');
app.use('/order', orderControl);

/*--- Report ---*/
var reportControl = require('./controllers/reportController');
app.use('/report', reportControl);


/*--- WEB QR Code ---*/
var qrcodeControl = require('./controllers/qrcodeController');
app.use('/qr', qrcodeControl);

var paymentControl = require('./controllers/paymentController');
app.use('/payment', paymentControl);

var loginControl = require('./controllers/loginController');
app.use('/login', loginControl);

/*--- Session ---*/
var sessionControl = require('./controllers/sessionController');
app.use('/session', sessionControl);
/// ................................................................
/// 						RUNNING SERVER
/// ................................................................

app.listen(PORT,
    () => {
        console.log("\n\n--------- Server running ! PORT: ", PORT);
    }
);
