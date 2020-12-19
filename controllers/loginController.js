var express = require('express');
var router = express.Router();

/// --- Code CONTROLLERs
router.use(function timeLog(req, res, next) {
    console.log('\n\t LOGIN controller - Time: ', Date().toString());
    next();
})

/////..................................................
router.get('/', loginPage);

function loginPage(req, res) {
    res.render("login");
}


/// --- EXports
module.exports = router;