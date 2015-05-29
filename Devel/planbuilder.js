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
            /*
            <h2><a href="#">T-Shirts</a></h2><div><ul>
<li>Lolcat Shirt</li>
<li>Cheezeburger Shirt</li>
<li>Buckit Shirt</li>
</ul></div>
            */
            return '<li title="'+sCode+' : '+sLine+'">'+sCode+'</li>';
            //return '<option value="'+sCode+'">'+sLine+'</option>';
            //return {sID:sID, sCode:sCode, sLine:sLine, sLetter:sLetter };
            
        });
        
        if(aItems.length === 0)
        { 
            return "";
        
        }    
            
        
        var sOut = '<h2><a href="#">'+oSection.children().first().text()+'</a></h2><div><ul>\n';

        //var sOut = '<optgroup label="'+oSection.children().first().text()+'">\n';
        aItems.each(function(index, item){
                //console.log("item =", item);
                sOut = sOut + item +"\n";
        });
        //sOut = sOut + '</optgroup>' +"\n";
        sOut = sOut + '</ul></div>' +"\n";
        //console.log("sOut =", sOut);
        
        return sOut;
    });
    
    
    
    //console.log("aSections =", aSections);
            
    var sSelect = '';//'<select >\n';
    aSections.each(function(index, item){
        //console.log("item =", item);
        sSelect = sSelect + item +"\n";
    });
        
    //+aSections.join("\n")+
    //sSelect =  sSelect+ '\n</select >';
    console.log(sSelect);
    
    
    
