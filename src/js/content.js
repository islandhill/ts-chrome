/**
 * Content scripts have some limitations. They cannot use chrome.* APIs, with the exception of extension, i18n, runtime, and storage.
 */

'use strict';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'ACTION_CLICK') {
            $("p").css('color', 'red');
            $("#outer-wrapper").before("<div id='extension-div'></div>");
            updateInvoiceSummary();
            console.log(ts.templates.statsContainer);
            setInterval(updateInvoiceSummary, 3000);
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
    $.get(getApiUrl('1461289', '/home/openInvoicesSummary'),
        {'Authtoken': authToken},
        handler);
};

function _getBaseUrl() {
    return "https://loki.dev.essentials.myob.com/LA";
}

function getApiUrl(businessId, context) {
    return _getBaseUrl() + `/api/businesses/${businessId}/${context}`;
}

function getWebUrl(businessId, context) {
    return _getBaseUrl() + `/app.htm#businesses/${businessId}/${context}`;
}


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

