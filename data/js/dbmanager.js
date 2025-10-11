class DbManager {
  constructor() {
    this.data = {
      machines: [],
      frames: []
    };

    window.getMachines = this.getMachines.bind(this);
    window.getFrames = this.getFrames.bind(this);

  }

  async init() {
    try {
      const response = await fetch('services/getdatabase');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.data = await response.json();
      console.log('Database loaded successfully:', this.data);
    } catch (error) {
      console.error('Failed to fetch database:', error);
    }
  }

  // Optional helper methods
  getMachines() {
    return this.data.machines;
  }

  getFrames() {
    return this.data.frames;
  }
}

// Example usage
const dbManager = new DbManager();
dbManager.init().then(() => {
  console.log(dbManager.getMachines());
  console.log(dbManager.getFrames());
});
