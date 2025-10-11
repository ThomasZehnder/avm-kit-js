console.log("connector.js loaded");

class Connector {
    constructor() {
        this.listeners = []; // Array to store registered listeners
        this.timer = null;   // Reference to the polling timer
    }

    // Starts polling every 500ms
    init() {
        return;//disable timer for better debugging
        if (this.timer) return; // Timer already running
        this.timer = setInterval(async () => {
            try {
                const response = await fetch('services/currentstate');
                if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
                const data = await response.json();
                //console.log('Fetched JSON data:', data);
                this._notifyListeners(data); // Notify all registered listeners
            } catch (error) {
                console.error('Error during polling:', error);
            }
        }, 500); // Poll every 500ms
    }

    // Stops the polling timer
    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
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
}


const connector = new Connector();

connector.init();

window.connector = connector; // Make globally accessible if needed 

// Example usage:
/*connector.addEventListener((data) => {
    console.log('New JSON data:', data);
});
*/