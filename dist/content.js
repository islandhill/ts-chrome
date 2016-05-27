/**
 * Content scripts have some limitations. They cannot use chrome.* APIs, with the exception of extension, i18n, runtime, and storage.
 */

'use strict';

var intervalId = void 0;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'ACTION_ACTIVATE') {
        //$("p").css('color', 'red');
        $("#outer-wrapper").before("<div id='extension-div'></div>");
        updateInvoiceSummary();
        intervalId = setInterval(updateInvoiceSummary, 3000);
    }

    if (request.action === 'ACTION_DEACTIVATE') {
        clearInterval(intervalId);
        $("#extension-div").remove();
    }
});

var updateInvoiceSummary = function updateInvoiceSummary() {
    var token = getCookie('AuthToken');
    getInvoiceSummary(token, function (data) {
        var result = ts.templates.statsContainer(data);
        $("#extension-div").html(result);
    });
};

var getInvoiceSummary = function getInvoiceSummary(authToken, handler) {
    $.get(getApiUrl('1461289', '/home/openInvoicesSummary'), { 'Authtoken': authToken }, handler);
};

function _getBaseUrl() {
    return "https://loki.dev.essentials.myob.com/LA";
}

function getApiUrl(businessId, context) {
    return _getBaseUrl() + ('/api/businesses/' + businessId + '/' + context);
}

function getWebUrl(businessId, context) {
    return _getBaseUrl() + ('/app.htm#businesses/' + businessId + '/' + context);
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
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