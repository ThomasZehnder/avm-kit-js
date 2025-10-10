class PageManager {
  constructor() {
    this.pages = {};
    this.currentPage = null;
    this.accessLevel = 0; // default access level 0 = no password
    this.password = "admin"; // default password, change as needed

    // Init after DOM loaded
    window.addEventListener("DOMContentLoaded", () => {
      this.refreshPageList();
    });

    // expose global functions (bound to this instance)
    window.changePage = this.changePage.bind(this);
    window.dynamicLoadPage = this.dynamicLoadPage.bind(this);
    window.logOut = this.logOut.bind(this); 
    
    // Fetch password from server
    this.fetchPassword();
  }

  refreshPageList() {
    this.pages = {}; // Reset pages object
    document.querySelectorAll("[page]").forEach(div => {
      const name = div.getAttribute("page");
      const accessLevel = div.getAttribute("accesslevel") || 0;
      this.pages[name] = { "div": div, "accessLevel": accessLevel };
      console.log(`Found page: "${name}" with access level ${accessLevel}`);
      div.classList.remove("active");
    });
    console.log("Pages found:", Object.keys(this.pages));
    // start on main page if exists
    this.changePage("main");
  }

  changePage(name) {
    if (this.currentPage && this.pages[this.currentPage]) {
      this.pages[this.currentPage].div.classList.remove("active");
    }
    if (this.pages[name]) {
      if (this.pages[name].accessLevel > this.accessLevel) {
        const password = prompt("Enter password to access this page:"); // Simple password prompt
        if (password !== this.password) { // Check password
          alert("Incorrect password!");
          this.changePage("main"); // go back to main page
          return;
        } // else correct password, continue
        this.accessLevel = 1;// store access level
      }
      this.pages[name].div.classList.add("active");
      this.currentPage = name;
      console.log(`Change to page "${name}"`);
    } else {
      console.warn(`Page "${name}" not found!`);
    }
  }

  logOut() {
    this.accessLevel = 0; // reset access level
    this.changePage("main"); // go back to main page
  }

  async dynamicLoadPage(pageName, accessLevel = 0) {
    try {
      const response = await fetch(`${pageName}.html`);
      if (!response.ok) throw new Error(`Failed to load: ${response.statusText}`);
      const html = await response.text();

      const pageDiv = document.createElement("div");
      pageDiv.classList.add("pageContainer");
      pageDiv.setAttribute("page", pageName);
      pageDiv.setAttribute("accesslevel", accessLevel);
      pageDiv.innerHTML = html;

      const container = document.getElementById("pagesContainer");
      container.appendChild(pageDiv);

      this.refreshPageList();
      console.log(`Page '${pageName}' loaded successfully.`);
    } catch (err) {
      console.error(err);
      const errorDiv = document.createElement("div");
      errorDiv.style.color = "red";
      errorDiv.textContent = `Page '${pageName}' could not be loaded.`;
      document.getElementById("pagesContainer").appendChild(errorDiv);
    }
  }

  async fetchPassword() {
    try {
      const response = await fetch("services/getpassword");
      if (!response.ok) throw new Error(`Failed to fetch password: ${response.statusText}`);
      const data = await response.json();
      this.password = data.password || "admin"; // default if not provided
      console.log("Password fetched successfully.");
    } catch (err) {
      console.error(err);
      this.password = "admin"; // fallback password
    }

  }
}

// instantiate
new PageManager();

