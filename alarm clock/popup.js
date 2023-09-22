document.addEventListener('DOMContentLoaded', function() {
    var saveAlarmBtn = document.getElementById('save-alarm-btn');
    saveAlarmBtn.addEventListener('click', function() {
      var alarmTime = parseInt(document.getElementById('alarm-time').value);
      chrome.runtime.sendMessage({action: "set_alarm", time: alarmTime});
    });
  });
  