console.log("connector.js loaded");

class Connector {
    constructor() {
        this.listeners = []; // Array to store registered listeners
        this.timer = null;   // Reference to the polling timer
        this.div = null;
    }

    // Starts polling every 500ms
    start() {

        if (this.timer) return; // Timer already running

        this.timer = setInterval(async () => {

            // Create an AbortController
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 1000); // 1000 ms = 1 second

            try {
                const response = await fetch('services/currentstate.json', {
                    signal: controller.signal
                });
                clearTimeout(timeout); // clear the timeout if fetch succeeds
                if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
                const data = await response.json();
                //console.log('Fetched JSON data:', data);
                this._notifyListeners(data); // Notify all registered listeners
                this._chageStatusColor("green");
            } catch (error) {
                console.error('Error during polling:', error);
                this._chageStatusColor("red");
            }
        }, 500); // Poll every 500ms
    }

    // Stops the polling timer
    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this._chageStatusColor("darkgray");
    }

    // Registers a listener callback
    addEventListener(callback) {
        if (typeof callback === 'function') {
            this.listeners.push(callback);
        } else {
            throw new Error('Listener must be a function');
        }
    }

    // Private method to notify all listeners with new data
    _notifyListeners(data) {
        this.listeners.forEach(listener => {
            try {
                listener(data);
            } catch (error) {
                console.error('Error in listener:', error);
            }
        });
    }
    //change color
    _chageStatusColor(color) {
        document.getElementById("connector-top-line").style.backgroundColor = color;
    }
}


const connector = new Connector();

connector.start();

window.connector = connector; // Make globally accessible if needed 

// Example usage:
/*connector.addEventListener((data) => {
    console.log('New JSON data:', data);
});
*/