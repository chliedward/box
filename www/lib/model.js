



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
            if(jqxhr.status == 401){
                location = "index.html";
            }
            deferred.reject(err); 
        });

        return deferred.promise();
    }

    box.model = {
        getLoginToken:(username, password) => {
            const data = {
                username:username,
                password:password,
            }

            return ajax('/sessions', 'POST', data);
        },
        queryAllBoxStatus: () => {
            return ajax('/devices', 'GET');
        },
    }
})()
    