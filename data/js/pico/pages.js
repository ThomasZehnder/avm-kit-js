class PageManager {
  constructor() {
    this.pages = {};
    this.currentPage = null;

    // Init after DOM loaded
    window.addEventListener("DOMContentLoaded", () => {
      this.refreshPageList();
    });

    // expose global functions (bound to this instance)
    window.changePage = this.changePage.bind(this);
    window.dynamicLoadPage = this.dynamicLoadPage.bind(this);
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
      if (this.pages[name].accessLevel > 0) {
        const password = prompt("Enter password to access this page:"); // Simple password prompt
        if (password !== "admin") { // Replace "admin" with your desired password
          alert("Incorrect password!");
          return;
        } // else correct password, continue
      }
      this.pages[name].div.classList.add("active");
      this.currentPage = name;
      console.log(`Change to page "${name}"`);
    } else {
      console.warn(`Page "${name}" not found!`);
    }
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
}

// instantiate
new PageManager();
