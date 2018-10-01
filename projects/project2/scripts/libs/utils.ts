
export function triggerEvent(eventName: string, options?: Object) {
    $(document).trigger(eventName, options);
}

export function isDesktop(): boolean {
    return $(window).outerWidth() > 768;
}

export function isIE() {
    return navigator.userAgent.indexOf('MSIE')!==-1 || navigator.appVersion.indexOf('Trident/') > 0;
}

export function requireScript(url, callback){

    var script = document.createElement("script")
    script.type = "text/javascript";
    script.async = true;

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

export function scriptLoader(condition: string,  scriptUrl: string) {
    const element = document.querySelector(condition);
    if (element) {
        requireScript(scriptUrl, () => console.info('script: ', scriptUrl, ' loaded'));
    }
}

export function getUrlVars() {
    var vars = {}, hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        // vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


