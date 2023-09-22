chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "set_alarm") {
      var alarmTime = request.time * 1000;
      chrome.alarms.create("myAlarm", {when: Date.now() + alarmTime});
      chrome.notifications.create({
        type: "basic",
        title: "Alarm",
        message: "Time's up!",
        iconUrl: "alarm-clock.png"
      });
      sendResponse({});
    }
  });
  