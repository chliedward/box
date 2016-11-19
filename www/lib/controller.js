

var MAIN_PAGE = "main.html";
var LOGIN_PAGE= "index.html";


(function(){
    window.box = window.box || {};
    box.controller = box.controller || {};
    
    box.controller.login = {
        init: function () {
            $("#main").bind("panelbeforeload", this.startApp);   
            // the login button
            $("#login").on("click", () => {
                this.signIn();
            });
            $('body').on('keypress', 'input', (args) => {
                if (args.keyCode == 13) {
                    $("#login").click();
                    return false;
                }
            });
        },
        signIn: function(){
            // SIGNIN SERVER CALL CODE GOES HERE
            var user=$("#username").val();
            var password = $("#password").val();
            
            box.model.getLoginToken(user, password).then(function(res){
                let token = res.token;
                if(token!=null){ // server answer 
                    setCachedUserInfo(user,token);
                    window.location.href = "main.html";
                }
                else
                {
                    
                }    
            },function(res){
                //Example use of the error toast api
                    clearCachedUserInfo();
                    box.view.message.error("Invalid Login Combination");
            });
            
        },
        signUp: function(){
            if ($("#password").val() === $("#confirmpassword").val())
            {
                // SIGNUP SERVER CALL CODE GOES HERE

                //render main view
                $.afui.loadContent("#main", null, null, "fade");

                //Example use of the success toast
                var opts={
                    message:"Account Created",
                    position:"tc",
                    delay:2000,
                    autoClose:true,
                    type:"success"
                };
                $.afui.toast(opts);

            }
            else
            {
                //Example use of the error toast
                var opts={
                    message:"Passwords Don't Match",
                    position:"tc",
                    delay:2000,
                    autoClose:true,
                    type:"error"
                };
                $.afui.toast(opts);
            }
        },
        startApp: function(){
            // clears all back button history
            $.afui.clearHistory();
            // your app code here
        }
    }



    //main page
    box.controller.main = {
        init: function () {
            $("#logout").on("click", () => {
                clearCachedUserInfo();
                window.location.href = LOGIN_PAGE;
            });
            box.model.queryAllBoxStatus().then((res) => {
                var arr = Object.keys(res).map((key) => {
                    return res[key];
                });
                box.view.main.list.render($('#mainlist'), arr);
            })
            
            box.view.main.map.render('map-panel');
        }
    }
    //"online": true,
    //"udid": <device UDID>,
    //"name": "<device name>",
    //"is_owner": true/false,
    //"is_user": true/false,
    //"locked": true/false,
    //"opened": true/false
    
    
    box.controller.bind = {
        init: function() {
            $('#page2SendVerifyCode').on('click',function() {
                boxId=box.view.bind.getBoxId();
                if(boxId==="") {
                    box.view.message.error("Please input box id");
                } else {
                    box.model.getVerifyCode(boxId)
                        .then(function(res){
                            if(res.success==true && res.info=="Verification code sent") {
                                box.view.bind.gotoPage2VerifyCode();
                            } else {
                                box.view.message.error(res.info);
                            }
                        }, function(res) {
                                box.view.message.error(res.info);
                        })    
                }
            });
            
            $('#page2ConfirmVerify').on('click', function() {
                boxId=box.view.bind.getBoxId();
                verifyCode=box.view.bind.getVerifyCode();
                box.model.bindDevice(boxId, verifyCode)
                    .then(function(res) {
                    if(res.success==true) {
                        box.view.message.info(res.info);
                        box.view.main.goto();
                    }
                }, function(res) {
                    box.view.message.error(res.info);
                })
            });
            
        }
    }
    box.view.message ={
        error :  function(string){
            var opts={
                message:string,
                position:"tc",
                delay:2000,
                autoClose:true,
                type:"error"
            };
            $.afui.toast(opts);
        },
        info : function(string){
            var opts={
                message:string,
                position:"tc",
                delay:2000,
                autoClose:true,
                type:"info"
            };
            $.afui.toast(opts);
        }
    }
    
    
    box.view.main.list.render =  function(bomObj, boxjsonlist){
        var htmlString="";
        for(var i=0; i < boxjsonlist.length; i++){
            var box   = boxjsonlist[i];   
            
            var boxId = box.udid;
            var boxNm = box.name;
            var locked = box.locked;
            var opened = box.opened;
            var htmlStringLine = '<li id="'+boxId+'">';
            htmlStringLine += '<div class="lock"   style="display:inline-block"></div>';
            htmlStringLine += '<div class="unlock" style="display:inline-block"></div>';
            htmlStringLine += '<a data-brackets-id="293" href="" onclick="$.afui.clearHistory()" style="display:inline-block">';
            htmlStringLine += '<div class="opened" style="display:inline-block"></div>';
            htmlStringLine += '<div class="closed" style="display:inline-block"></div>';
            htmlStringLine += boxNm;
            htmlStringLine +='</a></li>';

            htmlString+=htmlStringLine;
        }
        bomObj.html(htmlString);
        
        for(var i=0; i < boxjsonlist.length; i++){
            var box   = boxjsonlist[i];   
            var boxId = box.udid;
            var boxNm = box.name;
            var locked = box.locked;
            var opened = box.opened;
            if(locked){ 
                $('#'+boxId +" .lock").show();
                $('#'+boxId +" .unlock").hide();
            }if(!locked){ 
                $('#'+boxId +" .lock").hide();
                $('#'+boxId +" .unlock").show();
            }
        }
        
    };
})()
    