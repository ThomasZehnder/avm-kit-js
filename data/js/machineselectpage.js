console.log("load machineselectpage.js");

// Define namespace
class MachineSelectPage  {
    constructor() {
    }

    init () {
        console.log("Machineselect initialized");

        dbManager.addEventListener(this.updatePage.bind(this));

        dbManager.init();

    }

    // manage callback
    updatePage(data) {
        console.log('New JSON from dbmanager data:', data);

        this.populateMachineSelect(data.machines);
        this.populateFrameSelect(data.frames);
    }

    //update page elements
    // Function to populate the select element
    populateMachineSelect(machineArray) {
        const select = document.getElementById('machine-select');

        // Remove existing options except the first placeholder
        select.innerHTML = '<p-option disabled data-i18n="maschineselectpage.machineselect" value="">Select Machine</p-option>';

        // Add machines dynamically
        machineArray.forEach((machine, index) => {
            const option = document.createElement('p-option');
            option.value = machine;
            option.textContent = machine;

            // Optional: make the first machine selected
            if (index === 0) option.selected = true;

            select.appendChild(option);
        });
    }

        populateFrameSelect(frameArray) {
        const select = document.getElementById('frame-select');

        // Remove existing options except the first placeholder
        select.innerHTML = '<p-option disabled data-i18n="maschineselectpage.frameselect" value="">Select Frame</p-option>';

        // Add machines dynamically
        frameArray.forEach((frame, index) => {
            const option = document.createElement('p-option');
            option.value = frame;
            option.textContent = frame;

            // Optional: make the first frame selected
            if (index === 0) option.selected = true;

            select.appendChild(option);
        });
    }

};

const machineSelectPage = new MachineSelectPage();

//callback, when html was laoded
dynamicLoadPage("pages/machineselectpage", 0, () => {
    machineSelectPage.init()
});
console.log("end machine selectpage ....");
