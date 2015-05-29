
$( document ).ready(function(){
    
        
    var aSpecs = {};    
    var aLOs = {};  
    
        
    var XFooProto = Object.create(HTMLElement.prototype);
    XFooProto.createdCallback = function() {
        this.innerHTML = "<b>I'm an x-foo-with-markup!"+this.innerHTML+"</b>";
    };
    
    
    var xLearningOutcomesProto = Object.create(HTMLDivElement.prototype);
    xLearningOutcomesProto.createdCallback = function() {
        var eThis = this;
        var sAddr = this.getAttribute("spec");
        if(!sAddr)
        {
           sAddr = this.parentNode.getAttribute("spec");
        }
        
        if(sAddr)
        {
            //console.log("xLearningOutcomesProto sAddr =", sAddr);
        
            var uURL = new URL(sAddr);
            var sHREF = uURL.href.replace(uURL.hash, "");
            
            if(aSpecs[sHREF])
            {
                //console.log("aSpecs[sHREF =", aSpecs[sHREF]);
            
                var eItem = aSpecs[sHREF].find(uURL.hash);
                console.log("xLearningOutcomesProto eItem =", eItem);
                
                var sHTML = "<div title=\""+eItem.attr("id")+" : "+ (eItem.html())+"\">";
                var sTitle = eThis.getAttribute("title");
                console.log("sTitle =", sTitle);
                if(!sTitle)
                {
                    sTitle = eItem.html();
                }
                sHTML = sHTML + "<h3>"+eItem.attr("id")+" : "+ sTitle +"</h3><div>";
                sHTML = sHTML + (eThis.innerHTML)+"</div></div>";          
                eThis.innerHTML = sHTML;
         
            }
        }
    };
    
    
    var xLearningOutcomeProto = Object.create(HTMLDivElement.prototype);
    xLearningOutcomeProto.createdCallback = function() {
        var eThis = this;
        var sAddr = this.getAttribute("spec");
        if(!sAddr && this.parentNode)
        {
           sAddr = this.parentNode.getAttribute("spec");
        }
        
        if(sAddr)
        {
            //console.log("xLearningOutcomeProto sAddr =", sAddr);

            var uURL = new URL(sAddr);
            var sHREF = uURL.href.replace(uURL.hash, "");
            
            if(aSpecs[sHREF])
            {
                var eItem = aSpecs[sHREF].find(uURL.hash);
                console.log("xLearningOutcomesProto eItem =", eItem);
                var sLevel = eThis.getAttribute("level");
                var sHTML = "<div title=\""+eItem.attr("id")+" : ";
                sHTML = sHTML + (eItem.html())+"\">";
                sHTML = sHTML + sLevel.toUpperCase()+") ";
                sHTML = sHTML + (eThis.innerHTML)+"</div>";          
                eThis.innerHTML = sHTML;
            }
        }
    };
    
     /*
     <!--Document of Course Plan which groups Leveled learning outcomes into lessons (not dated) -->
<course-plan learning_outcomes_base="http://localhost/~martyn/planning2014/learning_outcomes/">
    <lesson-outline>
        <lesson-section loid="OCR_Computing_2014:2-1-4-c:binary2denary">
            <activity type="kagan?">Big Paper version</activity>
            <activity>Worked examples on paper</activity>
            <activity duration="5 mins">Quiz on own devices (Taster to get them going for project time)</activity>
            <activity type="project time" href="">Quiz on own devices/Surfaces</activity>
            <activity type="project time" href="" todo="IT:Get printing from BYOD/Surfaces">Paper Quiz printed from own devices</activity>
        </lesson-section>
    </lesson-outline>
</course-plan>
    */
    
    
    var xLessonOutlineProto = Object.create(HTMLDivElement.prototype);
    xLessonOutlineProto.createdCallback = function() {
        var eThis = this;
        var sHTML = "<div class=\"lesson-outline\">";
        sHTML = sHTML + (eThis.innerHTML)+"</div>";          
        eThis.outerHTML = sHTML;
    };
    
    var xSectionActivityProto = Object.create(HTMLDivElement.prototype);
    xSectionActivityProto.createdCallback = function() {
        var eThis = this;        
        var sHTML = "<div class=\"section-activity\"><div class=\"activity-duration\">" ;
        var sDuration = eThis.getAttribute("activity-duration");
        sHTML = sHTML + (sDuration?sDuration:"&nbsp;")+"</div>";
        var sType = eThis.getAttribute("type");
        sHTML = sHTML + "<div class=\"activity-type\">"+ (sType?sType:"&nbsp;")+"</div>";
        sHTML = sHTML + "<div class=\"activity-text\">"+(eThis.innerHTML)+"</div></div>";          
        eThis.outerHTML = sHTML;

    };
    /*
    var xSectionActivityProto = Object.create(HTMLTableRowElement.prototype);
    xSectionActivityProto.createdCallback = function() {
        var eThis = this;
        console.log("eThis =", eThis);
        
        var sHTML = "<tr><td>";
        var sDuration = eThis.getAttribute("duration");
        sHTML = sHTML + (sDuration?sDuration:"&nbsp;")+"</td><td>";
        var sType = eThis.getAttribute("type");
        sHTML = sHTML + (sType?sType:"&nbsp;")+"</td><td>"
        sHTML = sHTML + (eThis.innerHTML)+"</td></tr>";          
        eThis.innerHTML = sHTML;
        console.log("sHTML =", sHTML);

    };
    */
    
    var xLessonSectionProto = Object.create(HTMLDivElement.prototype);
    xLessonSectionProto.createdCallback = function() {
        var eThis = this;
        console.log("xLessonSectionProto eThis =", eThis);
        var sLOID = this.getAttribute("loid");
        console.log("xLessonSectionProto sLOID =", sLOID);
        if(sLOID)
        {
            var aParts = sLOID.split("__");
            console.log("xLessonSectionProto aParts =", aParts);
            var sHREF = sBase+aParts[0]+".html";
            console.log("xLessonSectionProto sHREF =", sHREF);
            
            if(aLOs[sHREF])
            {
                var test = aLOs[sHREF];
                console.log("xLessonSectionProto test =", test);
                //var rReg = new RegExp("__","g");
                //var eItem = aLOs[sHREF].find("#"+sLOID.replace(rReg, "\\:")+"");
                var eItem = aLOs[sHREF].find("learning-outcomes#"+sLOID);
                console.log("xLessonSectionProto eItem =", eItem);
                var sLevel = eThis.getAttribute("level");
                var sHTML = "<div class=\"lesson-section\" title=\""+eItem.attr("id")+" : ";
                sHTML = sHTML + (eItem.html())+"\">";
                if(sLevel)
                {
                    sHTML = sHTML + sLevel.toUpperCase()+" ";
                }
                sHTML = sHTML + eItem.attr("id")+(eThis.innerHTML)+"</div>";          
                eThis.outerHTML = sHTML;
            }
        }
    
    };
    
    
    
    //LOOKUP AND FETCH ALL THE SPECS
    var aAddrs = $('[spec]').map(function(idx,item){
        var uURL = new URL( item.getAttribute("spec"));
        var sHREF = uURL.href.replace(uURL.hash, "");
        return sHREF; 
    });
    //console.log("aAddrs =", aAddrs);

    var iCompleted = 0; 
    var aUAddrs = jQuery.unique(aAddrs);
    //console.log("aUAddrs =", aUAddrs);
    aUAddrs.each(function(index, sHREF){  
        
        if(!aSpecs[sHREF])
        {
            var sLO_Spec_ID = "datastore_Spec_"+iLOCompleted+1;
            $( "#datastore" ).append("<div id=\""+sLO_Spec_ID+"\">Loading</div>");
            
            $("#"+sLO_Spec_ID).load(sHREF, [], function(responseText){
            //console.log("loading");
            //jQuery.get( sHREF, [], function(responseText){
                    
                iCompleted ++;
                //console.log("iCompleted =", iCompleted);
                aSpecs[sHREF] = $(responseText);                
                
                //pNCE ALL THE SPECS HAVE ARRIVED REGISTER THE ELEMENTS
                if(iCompleted === aUAddrs.length)
                {
                    var XFoo = document.registerElement('x-foo-with-markup', {prototype: XFooProto});
                    var xLearningOutcome = document.registerElement('learning-outcome', {prototype: xLearningOutcomeProto});
                    var xLearningOutcomes = document.registerElement('learning-outcomes', {prototype: xLearningOutcomesProto});
                    
                }
            }, "html");
        }
    }); 
    

//LOOKUP AND FETCH ALL THE SPECS
    var aBases = $('[learning_outcomes_base]').map(function(idx,item){
        return item.getAttribute("learning_outcomes_base");
    });
    
    var sBase = aBases[0];
    console.log("sBase =", sBase);
    
    var aLOAddrs = $('[loid]').map(function(idx,item){
        var aParts = item.getAttribute("loid").split("__");
        //var aParts = item.getAttribute("loid").split("*");
        console.log("aParts =", aParts);
        var sHREF = sBase+aParts[0]+".html";
        return sHREF; 
    });
    
    console.log("aLOAddrs =", aLOAddrs);
    
    aLOs = {};
    
    var iLOCompleted = 0; 
    var aULOAddrs = jQuery.unique(aLOAddrs);
    //console.log("aUAddrs =", aUAddrs);
    aULOAddrs.each(function(index, sHREF){  
        
        if(!aLOs[sHREF])
        {
            var sLO_store_ID = "datastore_LO_"+iLOCompleted+1;
            $( "#datastore" ).append("<div id=\""+sLO_store_ID+"\">Loading</div>");
            
            $("#"+sLO_store_ID).load(sHREF, [], function(responseText){
            //console.log("loading");
            //jQuery.get( sHREF, [], function(responseText){
                    
                iLOCompleted ++;
                //console.log("iCompleted =", iCompleted);
                
                
                
                
                aLOs[sHREF] = $(responseText);                
                
                //pNCE ALL THE SPECS HAVE ARRIVED REGISTER THE ELEMENTS
                if(iLOCompleted === aULOAddrs.length)
                {
                   var xSectionActivity = document.registerElement('section-activity', {prototype: xSectionActivityProto});
                    
                    var xLessonSection = document.registerElement('lesson-section', {prototype: xLessonSectionProto});
                    var xLessonOutline = document.registerElement('lesson-outline', {prototype: xLessonOutlineProto});
                    
                }
            }, "html");
        }
    }); 
    
    
});

