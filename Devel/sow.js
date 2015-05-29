$( document ).ready(function(){
    var bShowLearningOutcomes = false;      
    
    $(".learning_outcomes div").each(function(idx,item){
        if(bShowLearningOutcomes)
        {
            $(item).load("OCR_GCSE_2012_Learning_Outcomes.html #"+item.innerHTML.trim());
        }
        else
        {
            var sLO = item.innerHTML.trim();
            $(item).replaceWith('<a target="_blank" href="OCR_GCSE_2012_Learning_Outcomes.html#'+sLO+'">'+sLO+'</a>');
        }
    });
    
    $("#save").click(function(){
        var html    = $("html").html();
        var sURL =  "data:text/html;base64," + btoa(html);
        window.open(sURL,'_blank');
    });

    var aTermDates = [
        {"start":"Monday 1 September 2014", "end":"Friday 24 October 2014", "year":2014},
        {"start":"Monday 3 November 2014",  "end":"Friday 19 December 2014","year":2014},
        {"start":"Monday 5 January 2015",   "end":"Friday 13 February 2015","year":2014},
        {"start":"Monday 23 February 2015", "end":"Friday 27 March 2015",   "year":2014},
        {"start":"Monday 13 April 2015",    "end":"Friday 22 May 2015",     "year":2014},
        {"start":"Monday 1 June 2015",      "end":"Wednesday 22 July 2015", "year":2014},
        
        {"start":"Thursday 3 September 2015",   "end":"Friday 23 October 2015", "year":2015},
        {"start":"2 November 2015",             "end":"Friday 18 December 2015","year":2015},
        {"start":"Monday 4 January 2016",       "end":"Friday 5 February 2016", "year":2015},
        {"start":"Monday 15 February 2016",     "end":"Friday 18 March 2016",   "year":2015},
        {"start":"Monday 4 April 2016",         "end":"Friday 27 May 2016",     "year":2015},
        {"start":"Monday 6 June 2016",          "end":"Tuesday 19 July 2016",   "year":2015}
    ];
    
    var aTermExceptions = [
        {"name":"May Day Bank Holiday", "date":"Monday 4 May 2015"},
        {"name":"Spring Bank Holiday",  "date":"Monday 25 May 2015"},
        
        {"name":"May Day Bank Holiday", "date":"Monday 2 May 2016"},
        {"name":"Spring Bank Holiday",  "date":"Monday 30 May 2016"}
    ];
    
    var aTermExceptionObjects = aTermExceptions.map(function(item, idx){
        item.oDate = Date.parse(item.date);
        return item;
    });
    
    var aValidDates = [];
    var iCurrent = aValidDates.length;
        
    /*
    
    var aTermDateObjects = aTermDates.map(function(item, idx){
        item.oStart = Date.parse(item.start);
        item.oEnd = Date.parse(item.end);
        aValidDates[iCurrent] = item.oStart.clone();
        
        
    //the other way would be start the day before term (run through  clone of periods for this year)
    
    //use the next dat(forward  .moveToDayOfWeek(0))
    //is next period on same day ?
    //Date.getDayNumberFromName ( String dayName )
    // is that less than oEnd.add(1))
    
        while(aValidDates[iCurrent].between( item.oStart, item.oEnd) )
        {
            oNewDate = aValidDates[iCurrent].clone().add(1).day();
            //console.log("aValidDates[iCurrent] =", aValidDates[iCurrent]);
            //console.log("aValidDates[iCurrent =", aValidDates[iCurrent]);
            oNewDate.daynum = oNewDate.getDay();//toString("dddd");
            //console.log("oNewDate.daynum =", oNewDate.daynum);
            
            if(oNewDate.daynum > 0 && oNewDate.daynum <  6) 
            {
                // TODO check against aTermExceptionObjects
                aValidDates[iCurrent + 1] = oNewDate.clone();
                iCurrent ++;
                
            }
            
            
        }
        
        
            
        return item;
    });
    
    console.log("aTermDateObjects =", aTermDateObjects);
    console.log("aValidDates =", aValidDates);
    
    var aPeriods = {
        "10 CDM":[    
            {"day":"Tuesday", "period":"3", "year":2014},
            {"day":"Tuesday", "period":"4", "year":2014},
            {"day":"Tuesday", "period":"5b","year":2015},
            {"day":"Tuesday", "period":"6", "year":2015},
            {"day":"Tuesday", "period":"7", "year":2015}
        ],
        "11 CDM":[    
            {"day":"Tuesday", "period":"5b", "year":2015},
            {"day":"Tuesday", "period":"6", "year":2015},
            {"day":"Tuesday", "period":"7", "year":2015}
        ],
        "10 ENG":[    
            {"day":"Wednesday", "period":"3", "year":2014},
            {"day":"Wednesday", "period":"4", "year":2014},
            {"day":"Wednesday", "period":"5b", "year":2015},
            {"day":"Wednesday", "period":"6", "year":2015},
            {"day":"Wednesday", "period":"7", "year":2015}
        ]
    };
    
    var sGroup = "10 ENG";
    
    
    
    // convert to dates
    // get first / nextdate
    // get clone of periods
    $("lesson_outline h2").each(function(ind, item){
        //around clone 
          //if day from clone is next
            //
          //else increment day
    });
    */
    
    
});

