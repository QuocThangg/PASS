var express = require('express');
var router = express.Router();

/// --- Code CONTROLLERs
router.use(function timeLog (req, res, next) {
    console.log('\n\t Admin controller - Time: ', Date().toString());
    next();
})

/// ..................................................
router.get('/', adminPage);
function adminPage(req, res) {
    res.render('admin');
}


/// --- EXports
module.exports = router;
