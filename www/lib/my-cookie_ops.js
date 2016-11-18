
//*----------------
//*
//* Function Name: getCachedUserInfo
//* Category: Front-end Cookie Access
//* Purpose:  get the previous logged in user info on this device/browser
//* return {"username":USER_NAME,"token":TOKEN}
//*
//*-----------------
//


var USERNAME = "username";
var PASSWORD = "password";
var TOKEN = "token";
var PREV_USER  = "PREV_USER";
var PREV_TOKEN = "PREV_TOKEN";

function getCachedUserInfo(){
    var p_user   = Cookies.get(PREV_USER);
    var p_token = Cookies.get(PREV_TOKEN);
    if(p_user == null) return null;
    else return {username:p_user,token:p_token};
}

//*--------------
//* Function Name: clearCachedUserInfo
//*--------------
function setCachedUserInfo(user,token){
    Cookies.set(PREV_USER,user);
    Cookies.set(PREV_TOKEN,token);
}
function clearCachedUserInfo(){
    Cookies.remove(PREV_USER);
    Cookies.remove(PREV_TOKEN);
}