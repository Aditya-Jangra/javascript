chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "find_links") {
      var links = document.getElementsByTagName("a");
      var urls = [];
      for (var i = 0; i < links.length; i++) {
        urls.push(links[i].href);
      }
      Promise.all(urls.map(validateLink))
        .then(function(results) {
          sendResponse({links: results});
        });
      return true;
    }
  });
  