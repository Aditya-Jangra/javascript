function populateTabList() {
    chrome.tabs.query({}, function (tabs) {
      const tabListEl = document.getElementById('tabList');
      tabListEl.innerHTML = '';
      tabs.forEach(function (tab) {
        const tabLabelEl = document.createElement('label');
        tabLabelEl.innerHTML = `<input type="checkbox" name="tab" value="${tab.id}">${tab.title}`;
        tabListEl.appendChild(tabLabelEl);
      });
    });
  }
  
  function closeSelectedTabs() {
    const selectedTabs = Array.from(document.querySelectorAll('input[name=tab]:checked')).map(function (checkbox) {
      return parseInt(checkbox.value);
    });
  
    chrome.tabs.remove(selectedTabs, function () {
      console.log('Selected tabs closed');
    });
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    populateTabList();
  
    const closeTabsBtn = document.getElementById('closeTabsBtn');
    closeTabsBtn.addEventListener('click', function () {
      closeSelectedTabs();
    });
  });

  