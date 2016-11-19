





(function(){
    window.box = window.box || {}; 
    box.view = box.view || {};
    box.view.main = box.view.main || {};
    box.view.bind = box.view.bind || {};

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
        },
        goto: function() {
            $('#gotoMain').trigger('click');
        }
    }
    
    box.view.bind = { 
        bindNewBoxParent: null,
        verifyCodeParent: null,
        
        init: function(bindNewBoxParent, verifyCodeParent, handlers) {
            this.bindNewBoxParent=bindNewBoxParent;
            this.verifyCodeParent=verifyCodeParent;
            this.bindNewBoxParent.find('#page2SendVerifyCode').on('click', handlers.sendVerifyCode);
            this.verifyCodeParent.find('#page2ConfirmVerify').on('click',handlers.confirmVerify);
        },
        
        getBoxId: function() {
            return $('input[name=boxId]').val();
        },
        
        getVerifyCode: function() {
            return $('input[name=verifyCode]').val();
        },
        
        gotoPage2VerifyCode: function() {
            $('#gotoPage2VerifyCode').trigger('click');  
        },
    }
    

    box.view.main.map = {
        render: function(id){
            var map = new BMap.Map(id);
            var point = new BMap.Point(116.331398,39.897445);
            map.centerAndZoom(point,12);

            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    var mk = new BMap.Marker(r.point);
                    map.addOverlay(mk);
                    map.panTo(r.point);
                    alert('您的位置：'+r.point.lng+','+r.point.lat);
                }
                else {
                    alert('failed'+this.getStatus());
                }        
            },{enableHighAccuracy: true})
        },    
    }

})()


    