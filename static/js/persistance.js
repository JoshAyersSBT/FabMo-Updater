
// Load saved checkbox states from localStorage
function loadCheckboxStates() {
    let savedStates = JSON.parse(localStorage.getItem("logFilterStates")) || {};
    document.querySelectorAll('.log-filter').forEach(checkbox => {
        checkbox.checked = savedStates[checkbox.value] !== undefined ? savedStates[checkbox.value] : true;
    });
}

// Save checkbox states to localStorage
function saveCheckboxStates() {
    let states = {};
    document.querySelectorAll('.log-filter').forEach(checkbox => {
        states[checkbox.value] = checkbox.checked;
    });
    localStorage.setItem("logFilterStates", JSON.stringify(states));
}

// Attach event listeners to save state when checkboxes change
document.addEventListener("DOMContentLoaded", function() {
    loadCheckboxStates();
    document.querySelectorAll('.log-filter').forEach(checkbox => {
        checkbox.addEventListener('change', saveCheckboxStates);
    });
});

// Print function with filtering based on selected checkboxes
function printf(s) {
    var log = document.querySelector('#console .content');
    log.innerHTML = "";  // Clear previous logs

    var selectedFilters = getSelectedFilters();
    let lines = s.split('\n');

    lines.forEach(function(line) {
        if (shouldDisplayLine(line, selectedFilters)) {
            let div = document.createElement("div");
            div.innerHTML = prettify(line);
            log.appendChild(div);
        }
    });

    var scrollpane = document.querySelector('#console');
    scrollpane.scrollTop = scrollpane.scrollHeight;
}

// Get the selected filters from checkboxes
function getSelectedFilters() {
    let filters = [];
    document.querySelectorAll('.log-filter:checked').forEach(checkbox => {
        filters.push(checkbox.value);
    });
    return filters;
}

function setOnline(status) {
    var onlineIndicator = document.getElementById('updater-status');
    if (status) {
        onlineIndicator.classList.remove('status-disconnected');
        onlineIndicator.classList.add('status-idle');
        onlineIndicator.innerText = ' Online';
    } else {
        onlineIndicator.classList.remove('status-idle');
        onlineIndicator.classList.add('status-disconnected');
        onlineIndicator.innerText = ' Offline';
    }
  }
    

// Determine if a log line should be displayed
function shouldDisplayLine(line, selectedFilters) {
    return selectedFilters.some(filter => line.startsWith(filter));
}
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(loadCheckboxStates, 100); // Delay to ensure DOM is ready
    document.querySelectorAll('.log-filter').forEach(checkbox => {
        checkbox.addEventListener('change', saveCheckboxStates);
    });
});
