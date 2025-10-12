console.log("load monitorpage.js");

// Define namespace
const monitorPage = {
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
    },

    callbackData: function (data) {
        this.updateJsonView(data);
        this.updateDivRealValue(data.actX, "actX-value");
        this.updateDivRealValue(data.actY, "actY-value");
        this.updateDivRealValue(data.targetX, "targetX-value");
        this.updateDivRealValue(data.targetY, "targetY-value");
        this.updateTargetView(data);
    },

    updateJsonView: function (data) {
        const elementId = "connectio-data-monitor";
        try {
            data = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        } catch (e) {
            console.error("Failed to parse JSON:", e);
            document.getElementById(elementId).innerHTML = "<p style='color:red;'>Failed to parse JSON.</p>";
            return;
        }
        document.getElementById(elementId).innerHTML = data;
    },

    updateDivRealValue: function (value, divName) {
        try {
            //console.log(value, typeof(value));
            if (typeof (value) != "numeric") {
                value = parseFloat(value);
            }
            // Format with 2 decimal digits and a leading + or -
            const formattedValue = (value >= 0 ? '+' : '') + value.toFixed(2);

            // Update the div
            document.getElementById(divName).textContent = formattedValue;

        } catch (error) {
            console.error('Error updateDivRealValue():', error);
        }
    },

    updateTargetView(data) {
        const svgDoc = document.getElementById('target-view').contentDocument;
        if (svgDoc) {
            const targetElement = svgDoc.getElementById("target-position");
            const actualElement = svgDoc.getElementById("actual-position");

            const zoomFactor = 10.0;

            if (svgDoc && targetElement && actualElement) {


                targetElement.setAttribute('transform', `translate(${data.targetX*zoomFactor},${data.targetY*zoomFactor})`);
                actualElement.setAttribute('transform', `translate(${data.actX*zoomFactor},${data.actY*zoomFactor})`);

            } else {
                console.error("transorm SVG View objcts not found", svgDoc, targetElement, actualElement);
            }
        } else {
            console.log("wait to get svg object...");
        }


    }

};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    monitorPage.init();
    connector.addEventListener(monitorPage.callbackData.bind(monitorPage));
});


// Load the page content dynamically
dynamicLoadPage("pages/monitorpage");
