





(function(){
    window.box = window.box || {}; 
    box.view = box.view || {};
    box.view.main = box.view.main || {};

    box.view.main.list = {
        render: function(container, boxjsonlist){
            container.html(this.genHtmlListForBoxes(boxjsonlist));
        },
        genHtmlListForBoxes: function(boxjsonlist){
            var htmlString="";

            for( i=0; i < boxjsonlist.length; i++){
                var box   = boxjsonlist[i]; 
                var boxId = box.BOX_ID;
                var boxNm = box.BOX_NM;
                
                var htmlStringLine = '<li data-brackets-id=""><a data-brackets-id="293" href="" onclick="$.afui.clearHistory()">';
                var num = i+1;
                num = "" + num;
                htmlStringLine = htmlStringLine+ num+". "+ boxNm+'</a></li>';
                
                htmlString+=htmlStringLine;
            }
            return htmlString;
        }
    }
})()
    