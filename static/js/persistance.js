
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

// Determine if a log line should be displayed
function shouldDisplayLine(line, selectedFilters) {
    if (selectedFilters.length === 0) return true; // Show all if no filters selected
    return selectedFilters.some(filter => line.includes(filter));
}
