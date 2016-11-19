



(function (){
    window.box = window.box || {};
    const ajax = (url, method, dataobj) => {
        var baseurl = 'https://api.cheeselabs.org/v1';
        var deferred = $.Deferred();
        var cookieInfo = getCachedUserInfo() || {};
        var dataobj = dataobj || {};
        $.ajax({
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossDomain: "true",
            headers: {"Authorization": "Basic " + btoa(cookieInfo.username + ':' + cookieInfo.token) },
            url: baseurl + url,
            method: method,
            data: JSON.stringify(dataobj)
        })
        .done(function(res, stext, jqxhr) {
            deferred.resolve(res) 
        })
        .fail(function(jqxhr, statusCode, err) {
           
            var res = JSON.parse(jqxhr.responseText);
            deferred.reject(res); 
            if(jqxhr.status == 401){
                setTimeout(function(){
                    location = "index.html";
                },500)
            }
        });

        return deferred.promise();
    }

    box.model = {
        getLoginToken:(username, password) => {
            var data = {
                username:username,
                password:password,
            }
            return ajax('/sessions', 'POST', data);
        },
        queryAllBoxStatus: () => {
            return ajax('/devices', 'GET');
        },
        /*
            udid: device id
        */
        getVerifyCode: (udid) => {
            return ajax('/devices/'+udid, 'put');
        },
        /*
            udid: device id
            vcode: verify id
        */
        bindDevice: (udid, vcode) => {
            const data = {
                vcode:vcode,
            }

            return ajax('/devices/'+udid, 'put', data);
        },
        /*
            udid: device id
            data: no
        */
        unbindDevice: (udid) => {
            return ajax('/devices/'+udid, 'delete');
        },
        /*
            udid: device id
            data: no
        */
        lockDevice: (udid) => {
            return ajax('/devices/'+udid, 'lock');
        },
        lockDevice: (udid) => {
            return ajax('/devices/'+udid, 'unlock');
        }
    }
})()

