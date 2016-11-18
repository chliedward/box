var USE_FAKE_SERVER=true;
var FAKE_SERVER_USERNAME="chli";
var FAKE_SERVER_PASSWORD="edward";
var FAKE_SERVER_TOKEN="hahaha";
var FAKE_SERVER_CACHED_USERNAME;
var FAKE_SERVER_CACHED_PASSWORD;
// BOX_ID, BOX_NM, BOX_SETTING, BOX_STATUS, RENT_TO_ID, RENT_TO_NM
var FAKE_BOX_LIST = JSON.parse('[{"BOX_ID":"BOX_ID1","BOX_NM":"Box at home","BOX_SETTING":"00","BOX_STATIS":"00","RENT_TU_ID":"","RENT_TO_NM":""},{"BOX_ID":"BOX_ID2","BOX_NM":"Box at office","BOX_SETTING":"00","BOX_STATIS":"00", "RENT_TU_ID":"","RENT_TO_NM":"" }]');


var USERNAME = "username";
var PASSWORD = "password";
var TOKEN = "token";
var PREV_USER  = "PREV_USER";
var PREV_TOKEN = "PREV_TOKEN";

var MAIN_PAGE = "main.html";
var LOGIN_PAGE= "index.html";
// API to get login token from serverside
// rely on jQuery

//*----------------
//* 
//* Function Name: getLoginToken 
//* Category: Server API
//* Purpose:  get a login token from server based on given username and password
//* return token
//*
//*-----------------
function getLoginToken(username, password){
    var deferred = $.Deferred();
    
    var token=null;
    
    if(USE_FAKE_SERVER){
        if(username==FAKE_SERVER_USERNAME && password==FAKE_SERVER_PASSWORD){
            FAKE_SERVER_CACHED_USERNAME = username;
            token=FAKE_SERVER_TOKEN;
            
        }
        deferred.resolve(token);
    }
    return deferred.promise();
    
}


//*----------------
//*
//* Function Name tryVerifyUserAndTokenOnServer
//* Category: Server API
//* return a $.Deferred
//* -- .done
//* ---- return true if the verification pass
//* ---- return false if the verification fail. should stay/redirect to the login page 
//* -- .fail if the verification is terminated due to some exception cases...
//* 
//*----------------
function tryVerifyUserAndTokenOnServer( username, token){
    var deferred = $.Deferred();
    // for test. return true to indicate that pass the serverside username/token check
    
    // fake server 
    if(USE_FAKE_SERVER){
        if(username == FAKE_SERVER_USERNAME && token == FAKE_SERVER_TOKEN)
            deferred.resolve(true);
        else deferred.resolve(false);
    }
    return deferred.promise();
}

//
function invalidateServerToken(){
    var deferred = $.Deferred();
    
    if(USE_FAKE_SERVER){
        FAKE_SERVER_CACHED_USERNAME=undefined;
        FAKE_SERVER_CACHED_PASSWORD=undefined;
    }
    return deferred.promise();
}

////////

function queryAllBoxStatus(token){
    var deferred = $.Deferred();
    if(USE_FAKE_SERVER){
        if(token == FAKE_SERVER_TOKEN){
            deferred.resolve(FAKE_BOX_LIST);
        }else{
            deferred.resolve();
        }
    }
    return deferred.promise();
}

