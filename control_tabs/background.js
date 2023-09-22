chrome.alarms.create("cleanTabs", { periodInMinutes: 1440 });

chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === "cleanTabs") {
    chrome.tabs.query({}, function (tabs) {
      const currentTabId = chrome.tabs.getCurrent().id;
      tabs.forEach(function (tab) {
        if (tab.id !== currentTabId) {
          chrome.tabs.remove(tab.id);
        }
      });
    });
  }
});
