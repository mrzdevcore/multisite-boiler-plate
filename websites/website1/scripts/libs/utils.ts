
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


export function setActiveMenuFromSubMenu() {
    const currentActiveMenu = document.querySelectorAll('.js-sub-menu-container');
    for (let i = 0; i < currentActiveMenu.length; i++) {
        const menu = currentActiveMenu[i];
        if (menu.querySelector('[data-active-menu="True"]')) {
            const menufor = menu.getAttribute('data-submenu-for');
            const mainMenu = document.querySelector(`[data-menu-for="${menufor}"]`);
            if (mainMenu) {
                mainMenu.setAttribute('data-active-menu', 'True');
                return mainMenu;
            }
        }
    }
}

export function setUnderlignedMenu() {
    const menus = document.querySelectorAll('.main-menu');
    const currentActiveMenu = document.querySelector('.main-menu [data-active-menu="True"]')
    for(let i=0; i<menus.length; i++) {
        menus[i].addEventListener('mouseover', (e:Event) => {
            if (currentActiveMenu) {
                currentActiveMenu.removeAttribute('data-active-menu');
            }
            if (e.target.nodeName === 'A') {
                e.target.setAttribute('data-active-menu', 'True');
            }
            else if (e.target.querySelector('a')) {
                e.target.querySelector('a').setAttribute('data-active-menu', 'True');
            }

        });
        menus[i].addEventListener('mouseleave', (e:Event) => {
            if (e.target.nodeName === 'A') {
                e.target.removeAttribute('data-active-menu');
            }
            else if (e.target.querySelector('a')) {
                e.target.querySelector('a').removeAttribute('data-active-menu');
            }
            if (currentActiveMenu) {
                currentActiveMenu.setAttribute('data-active-menu', 'True');
            }
        });
    }
}
