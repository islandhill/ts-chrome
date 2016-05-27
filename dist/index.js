'use strict';

//background script

var active = false;
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) {
    // Send a message to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        toggleIcon(activeTab);
        if (active) {
            chrome.tabs.sendMessage(activeTab.id, { 'action': 'ACTION_ACTIVATE' });
        } else {
            chrome.tabs.sendMessage(activeTab.id, { 'action': 'ACTION_DEACTIVATE' });
        }
    });
});

function toggleIcon(activeTab) {
    var nextIconPath = active ? 'myob-off.png' : 'myob-on.png';
    active = !active;
    chrome.browserAction.setIcon({ path: nextIconPath, tabId: activeTab.id });
}