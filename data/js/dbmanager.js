class DbManager {
  constructor() {
    this.data = {
      machines: [],
      frames: []
    };
    this.listeners = []; // Array to store registered listeners

  }

  async init() {
    try {
      const response = await fetch('services/getdatabase');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.data = await response.json();
      console.log('Database loaded successfully:', this.data);
      this._notifyListeners(this.data); // Notify all registered listeners
    } catch (error) {
      console.error('Failed to fetch database:', error);
    }
  }

    // Registers a listener callback
    addEventListener(callback) {
        if (typeof callback === 'function') {
            this.listeners.push(callback);
        } else {
            throw new Error('Listener must be a function');
        }
        console.log("add event listener dbmanager", this.listeners)

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

  // Optional helper methods
  getMachines() {
    return this.data.machines;
  }

  getFrames() {
    return this.data.frames;
  }
}

const dbManager = new DbManager();


window.dbManager = dbManager; // Make globally accessible if needed 

// Example usage:
/*dbManager.addEventListener((data) => {
    console.log('New JSON data:', data);
});
*/