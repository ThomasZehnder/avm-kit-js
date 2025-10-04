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
    }


};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    MonitorPage.init();
});

// Export namespace to window object if needed
window.MonitorPage = MonitorPage;

dynamicLoadPage("pages/monitorpage");