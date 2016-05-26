/**
* Content scripts have some limitations. They cannot use chrome.* APIs, with the exception of extension, i18n, runtime, and storage.
*/

'use strict';

chrome.runtime.onMessage.addListener( () => {
    if( request.message === "clicked_browser_action" ) {
      let firstHref = $("a[href^='http']").eq(0).attr("href");
      console.log(firstHref);

      $("p").css('color', 'red');

      $("#outer-wrapper").before("<div id='extension-div'>hahaha</div>");

      setTimeout(function() {
        $("#extension-div").html("<p> changed </p>");
      }, 3000);

      chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
      alert(getCookie('AuthToken'));

    }
  }
);


let getCookie = (cname) => {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length,c.length);
    }
  }
  return "";
}

