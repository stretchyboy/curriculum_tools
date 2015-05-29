    var clone = require('clone');
    var util = require('util');
    var Handlebars = require("handlebars");
    var fs = require('fs');
    
    var sSpec = fs.readFileSync("specs/OCR GCSE 2012.html", "utf8");
    
    var cheerio = require('cheerio');
    var $ = cheerio.load(sSpec);
    
    var aDivs = $("div");
    //console.log("aDivs =", aDivs);
    
    
    
    var aSections = aDivs.map(function(i, el){
        var oSection = $(this);
        
        var aDDs = oSection.find("dd");
        //console.log("aDDs =", aDDs);
        var aItems = aDDs.map(function(ind, eDT){
            var oThis = $(this);
            var sLine = oThis.text();
            //console.log("sLine =", sLine);
            var sLetter = oThis.prev().text();
            //console.log("sLetter =", sLetter);
            var sID = oSection.attr('id')+"-"+sLetter;
            //console.log("sID =", sID);
            
            var sCode = oSection.attr('id').replace(/-/g,".")+"."+sLetter;
            //console.log("sCode =", sCode);
            return {"sID":sID, "sCode":sCode, "sLine":sLine, "sLetter":sLetter, "sParent":oSection.attr('id') };
            
        });
        
        return aItems.toArray();
    });
    
    
    
    console.log("aSections =", aSections);
    
    
