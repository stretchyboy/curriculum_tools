    var clone = require('clone');
    var util = require('util');
    var Handlebars = require("handlebars");
    var fs = require('fs');
    
    var sSpec = fs.readFileSync("specs/OCR GCSE 2012.html", "utf8");
    
    var cheerio = require('cheerio');
    var $ = cheerio.load(sSpec);
    
    var aDivs = $("div");
    
    var aSections = aDivs.each(function(i, el){
        var oSection = $(this);
        
        var aDDs = oSection.find("dd");
        //console.log("aDDs =", aDDs);
        var aItems = aDDs.each(function(ind, eDT){
            var oThis = $(this);
            var sLine = oThis.text();
            //console.log("sLine =", sLine);
            var sLetter = oThis.prev().text();
            //console.log("sLetter =", sLetter);
            var sID = oSection.attr('id')+"-"+sLetter;
            //console.log("sID =", sID);
            
            var sCode = oSection.attr('id').replace(/-/g,".")+"."+sLetter;
            
            oThis.attr("id", sID);
            oThis.attr("data-parent", oSection.attr('id'));
            oThis.attr("data-leafid", sLetter);
            //return oThis;
            
        });
        //return oSection; 
    });
    
    
    var sHTML = $.html();
    console.log(sHTML);
    
    fs.writeFileSync("specs/OCR GCSE 2012.html", sHTML, "utf8");
    
