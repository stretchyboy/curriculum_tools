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
        var aItems = aDDs.map(function(ind, eDT){
            var oThis = $(this);
            var sLine = oThis.text();
            //console.log("sLine =", sLine);
            var sLetter = oThis.prev().text().toUpperCase();
            //console.log("sLetter =", sLetter);
            var sID = oSection.attr('id')+"-"+sLetter;
            //console.log("sID =", sID);
            
            var sCode = oSection.attr('id').replace(/-/g,".")+"."+sLetter;
            
            var sNew = '<div id="'+sID+'" class="spec_item"><a name="'+sID+'" />' + "\n" +
                '<h4 class="item_def">' + '<span class="item_label">'+sID+'</span> : ' +
                '<span class="item_def">'+sLine+'</span></h4>' +  "\n" +
                '<div class="leveled_lo" id="'+sID+'_A" data-level="A" ><span class="level_label">Level A:</span> '+sLine+'</div>' + "\n" +
                '<div class="leveled_lo" id="'+sID+'_B" data-level="B" ><span class="level_label">Level B:</span> '+sLine+'</div>' + "\n" +
                '<div class="leveled_lo" id="'+sID+'_C" data-level="C" ><span class="level_label">Level C:</span> '+sLine+'</div>' + "\n" +
                '</div>';
                
            oThis.replaceWith(sNew);    
            //var oNew = $(sNew);
            /*oNew.attr("id", sID);
            oThis.attr("data-parent", oSection.attr('id'));
            oThis.attr("data-leafid", sLetter);
            */
            //return oNew;
            
            return oThis;
            
        });
        
        oSection.find("dt").remove();
        
        oSection.find("dl").replaceWith(oSection.find("dl").html());
        //return oSection; 
    });
    
    
    var sHTML = $.html();
    console.log(sHTML);
    
    fs.writeFileSync("learning_outcomes/OCR_GCSE_2012.html", sHTML, "utf8");
    
