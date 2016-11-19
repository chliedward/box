

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
                    //$.afui.loadContent("#main", null, null, "fade");
                }
                else
                {
                    //Example use of the error toast api
                    clearCachedUserInfo();
                    var opts={
                        message:"Invalid Login Combination",
                        position:"tc",
                        delay:2000,
                        autoClose:true,
                        type:"error"
                    };
                    $.afui.toast(opts);
                }    
            });
            
        },
        signUp: function(){
            //TODO
            //example client side validation
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
                }) 
                box.view.main.list.render($('#mainlist'), arr);
            })
        }
    }
    //"online": true,
    //"udid": <device UDID>,
    //"name": "<device name>",
    //"is_owner": true/false,
    //"is_user": true/false,
    //"locked": true/false,
    //"opened": true/false
    
    box.view.main.list.render =  function(bomObj, boxjsonlist){
        var htmlString="";
        for(var i=0; i < boxjsonlist.length; i++){
            var box   = boxjsonlist[i];   
            
            var boxId = box.udid;
            var boxNm = box.name;

            var htmlStringLine = 
                '<li data-brackets-id=""><div class="lock" style="display:inline-block"></div><div class="unlock" style="display:inline-block"></div><a data-brackets-id="293" href="" onclick="$.afui.clearHistory()" style="display:inline-block">';
            
            htmlStringLine = htmlStringLine+ boxNm+'</a></li>';

            htmlString+=htmlStringLine;
        }
        bomObj.html(htmlString);
    };
})()
    