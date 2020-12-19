var express = require('express');
var router = express.Router();

/// --- Code CONTROLLERs
router.use(function timeLog (req, res, next) {
    console.log('\n\t HOME controller - Time: ', Date().toString());
    next();
})

/////..................................................
router.get( '/', homePage );
function homePage(req, res) {
	res.render("home");
}


/// --- EXports
module.exports = router;

