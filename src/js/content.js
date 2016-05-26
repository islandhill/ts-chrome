/**
 * Content scripts have some limitations. They cannot use chrome.* APIs, with the exception of extension, i18n, runtime, and storage.
 */

'use strict';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'ACTION_CLICK') {
            let firstHref = $("a[href^='http']").eq(0).attr("href");
            console.log(firstHref);

            $("p").css('color', 'red');

            $("#outer-wrapper").before("<div id='extension-div'>hahaha</div>");

            setTimeout(function () {
                $("#extension-div").html("<p> changed </p>");
            }, 3000);

            chrome.runtime.sendMessage({"action": "ACTION_OPEN_NEW_TAB", "url": firstHref});
            let token = getCookie('AuthToken');
            alert('found a cookie: ' + token);
            getInvoiceSummary(token,
                (data) => {
                    console.log(data);
                    alert("number of invoices:" + data.count);
                });
        }
    }
);

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

