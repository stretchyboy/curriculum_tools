    var clone = require('clone');
    var util = require('util');
    var Handlebars = require("handlebars");
    var fs = require('fs');
    
    var sSpec = fs.readFileSync("specs/OCR GCSE 2012.html", "utf8");
    
    var cheerio = require('cheerio');
    var $ = cheerio.load(sSpec);
    
    var aDivs = $("div");
    
    
    var sHTML = "<h1>Scheme of Work</h1>\n\n <button id=\"save\">SAVE</button>";
    
    var aSections = aDivs.each(function(i, el){
        var oSection = $(this);
        
        var aDDs = oSection.find("dd");
        //console.log("aDDs =", aDDs);
        var aItems = aDDs.each(function(ind, eDT){
            var oThis = $(this);
            var sLine = oThis.text();
            //console.log("sLine =", sLine);
            var sLetter = oThis.prev().text().toUpperCase();
            //console.log("sLetter =", sLetter);
            var sID = oSection.attr('id')+"-"+sLetter;
            //console.log("sID =", sID);
            
            var sCode = oSection.attr('id').replace(/-/g,".")+"."+sLetter;
            
            var sNew = '<div id="SOW_'+sID+'" class="lesson_outline">'+
                '<h2>Lesson Outline</h2>'+ "\n" +
                '<div class="lesson_dt">Date Unknown</div>'+ "\n" +
                '<h3>Learning Outcomes</h3>'+ "\n" +
                '<div class="learning_outcomes">'+ "\n" +
                '<div>'+sID+'</div>'+ "\n" +
                '</div>' + "\n" +
                '<div class="ideas">'+ "\n" +
                
                '<h3>Ideas</h3><ul><li></li>'+ "\n" +
                '</ul></div>' + "\n" +
                
                '<h3>Activities</h3>'+ "\n" +            
                '<table class="activities">' + "\n" +
                '<tr><th>Section</th><th>Time</th><th>Activities /  Assessment</th><th>Resources</th></tr>'+ "\n" +
                '<tr><td class="section">Starter</td><td class="time">5</td><td class="activity"></td><td class="resource"></td></tr>'+ "\n" +
                '<tr><td class="section">Part 1</td><td class="time">10</td><td class="activity"></td><td class="resource"></td></tr>'+ "\n" +
                '<tr><td class="section">Mini Plenary</td><td class="time">10</td><td class="activity"></td><td class="resource"></td></tr>'+ "\n" +
                '<tr><td class="section">Part 2</td><td class="time">10</td><td class="activity"></td><td class="resource"></td></tr>'+ "\n" +
                '<tr><td class="section">Main Plenary</td><td class="time">10</td><td class="activity"></td><td class="resource"></td></tr>'+ "\n" +
                '<tr><td class="section">Reflection</td><td class="time">5</td><td class="activity"></td><td class="resource"></td></tr>'+ "\n" +
                '</table>' + "\n" +
                '</div>'+ "\n";
                
            //var oNew = $(sNew);
            
            sHTML = sHTML + sNew + "\n" ;
            
            //return oNew;
              
        });
        
        //console.log("aItems =", aItems);
        //return aItems;
    });
    
    //console.log("aSections =", aSections);
    
    //var sHTML = $.html();
    //console.log(sHTML);
    
    $("body").html(sHTML);
    $("body").attr("contenteditable", true);
    
    
    $("head").html('<title>Scheme of Work</title><script src="js/jquery-1.10.2.js"></script><script src="sow.js"></script><script src="js/date-en-GB.js"></script>');
    
    fs.writeFileSync("SOW_Computing_GCSE_2014.html", $.html(), "utf8");
    
