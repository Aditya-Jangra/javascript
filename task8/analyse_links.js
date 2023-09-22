chrome.runtime.sendMessage({action: "find_links"}, function(response) {
    console.log(response.links);
  });
  