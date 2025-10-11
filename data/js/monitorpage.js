console.log("load monitorpage.js");

// Define namespace
const MonitorPage = {
    init: function () {
        console.log("MonitorPage initialized");
        this.pages = {};
        this.currentPage = null;
        this.setupEventListeners();

        this.startTimer();

    },

    pages: {},
    currentPage: null,

    setupEventListeners: function () {
        console.log("Setting up event listeners");
        // Add event listeners here
    },

    // Add other methods
    startTimer: function () {
        return;//disable timer for better debugging

        let translate = 0;
        setInterval(() => {
            if (!this.spinnerElement) {
                this.spinnerElement = document.getElementById('monitorpage-spinner');
            }
            if (this.spinnerElement) {

                translate = (translate + 10) % 200;
                this.spinnerElement.style.transform = `translateX(${translate}px)`;

            } else {
                console.warn("Spinner element not found, trying to get it.");
            }
        }
            , 1000);
        console.log("Starting timer");
    },
    callbackData: function (data) {
        const elementId = "currentstate";
        try {
            data = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        } catch (e) {
            console.error("Failed to parse JSON:", e);
            document.getElementById(elementId).innerHTML = "<p style='color:red;'>Failed to parse JSON.</p>";
            return;
        }
        document.getElementById(elementId).innerHTML = data;
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    MonitorPage.init();
    connector.addEventListener(MonitorPage.callbackData);
});


// Load the page content dynamically
dynamicLoadPage("pages/monitorpage");
