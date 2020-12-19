var express = require('express');
var router = express.Router();

/// --- LIBs
var os = require('os');
var QRCode = require("qrcode-svg");


/// --- Code CONTROLLERs
router.use(function timeLog (req, res, next) {
    console.log('\n\t WEB QR Code controller - Time: ', Date().toString());
    next();
})

/////..................................................
router.get( '/', qrPage );
function qrPage(req, res) {
	var inter = os.networkInterfaces();
    var xcontent = "";

    console.log('\n\t\t ... get QR INF ! ');
    for(var key in inter) {
        if (key.indexOf("Wi-Fi") >= 0) {             
            var str = "http://" + 
                inter[key][1]["address"] + ":8080";
            var sv = new QRCode({
                content: str,
                padding: 4,
                width: 512,
                height: 512,
                color: "#000000",
                background: "#ffffff",
                ecl: "M",
            }).svg();
            
            xcontent += "<br>" + sv;

            console.log("\n\t", inter[key][1]["address"] );
        }
    }

            str = "https://www.facebook.com/Tu.NN79/";
            sv = new QRCode({
                content: str,
                padding: 4,
                width: 512,
                height: 512,
                color: "#000000",
                background: "#ffffff",
                ecl: "M",
            }).svg();
            xcontent += "<br>" + sv;

            res.render("qr", 
                {title: "ATN-Shop QR-Code page"
                , content: xcontent 
                , configHeader: ""  
                , currpage: "QR code - link"  
            });
}

/// --- EXports
module.exports = router;

