console.log("load diagnosispagepage.js");

// Define namespace
const DiagnosisPage = {
    init: function () {
        console.log("DiagnosisPage initialized");

        this.startTimer();

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
    },

    fetchContent: function (serviceName, elementId) {
        fetch(serviceName)
            .then(response => {
                //console.log("Fetch response:", response);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
            })
            .catch(error => {
                console.error("Failed to load HTML:", error);
                document.getElementById(elementId).innerHTML = "<p style='color:red;'>Failed to load content.</p>";
            });
    },

    refresh: function () {
        this.fetchContent("services/filedirectory.html", "filedirectory");
        this.fetchContent("services/messagelog.html", "messagelog");
    }
};



// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    DiagnosisPage.refresh()

});

// Export namespace to window object if needed
window.DiagnosisPage = DiagnosisPage;

dynamicLoadPage("pages/diagnosispage");