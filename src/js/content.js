/**
 * Content scripts have some limitations. They cannot use chrome.* APIs, with the exception of extension, i18n, runtime, and storage.
 */

'use strict';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'ACTION_CLICK') {
            $("p").css('color', 'red');
            $("#outer-wrapper").before("<div id='extension-div'><p>Hello extension</p></div>");
            console.log(ts.templates.statsContainer);
            setInterval(updateInvoiceSummary, 5000);
        }
    }
);

let updateInvoiceSummary = () => {
    let token = getCookie('AuthToken');
    getInvoiceSummary(token, (data) => {
        let result = ts.templates.statsContainer(data);
        $("#extension-div").html(result);
    });
};

let getInvoiceSummary = (authToken, handler) => {
    $.get("https://loki.dev.essentials.myob.com/LA/api/businesses/1461289/home/openInvoicesSummary",
        {'Authtoken': authToken},
        handler);
};


let getCookie = (cname) => {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

