class PageManager {
  constructor() {
    this.pages = {};
    this.currentPage = null;
    this.accessLevel = 0; // default access level 0 = no password
    this.password = "admin"; // default password, change as needed
    this.logOutDiv = null;

    // Init after DOM loaded
    window.addEventListener("DOMContentLoaded", () => {
      this.refreshPageList();
      // Add logout button
      this.logOutDiv = this.appendLogoutButton();
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

  async changePage(name) {
    if (this.currentPage && this.pages[this.currentPage]) {
      this.pages[this.currentPage].div.classList.remove("active");
    }
    if (this.pages[name]) {
      if (this.pages[name].accessLevel > this.accessLevel) {
        const password = await getPasswordDialog();
        if (password !== this.password) { // Check password
          alert("Incorrect password!");
          this.changePage("main"); // go back to main page
          return;
        } // else correct password, continue
        this.accessLevel = 1;// store access level
        this.logOutDiv.style.display = "block";
      }
      this.pages[name].div.classList.add("active");
      this.currentPage = name;
      console.log(`Change to page "${name}"`);
    } else {
      console.warn(`Page "${name}" not found!`);
    }

    async function getPasswordDialog() {
      const modalHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
        background: white; padding: 20px; border: 1px solid #ccc; box-shadow: 0 0 10px rgba(0,0,0,0.2);">
          <h3 style="margin-bottom: 10px;">Enter Password</h3>
          <input type="password" style="width: 200px; padding: 5px;">
          <div>
        <button style="margin-right: 10px;">OK</button>
        <button data-i18n="global.home">Cancel</button>
          </div>
        </div>`;

      const container = document.createElement('div');
      container.innerHTML = modalHTML;
      const modalDiv = container.querySelector('div');
      const buttonsDiv = modalDiv.querySelector('div');
      const okButton = buttonsDiv.querySelector('button:first-child');
      const cancelButton = buttonsDiv.querySelector('button:last-child');
      
      buttonsDiv.appendChild(okButton);
      buttonsDiv.appendChild(cancelButton);
      modalDiv.appendChild(buttonsDiv);
      
      const tmpInput = container.querySelector('input');
      document.body.appendChild(container);
    
      
      tmpInput.focus();
      const password = await new Promise(resolve => {
        okButton.onclick = () => resolve(tmpInput.value);
        cancelButton.onclick = () => resolve(null);
        tmpInput.onkeyup = (e) => {
          if (e.key === 'Enter') resolve(tmpInput.value);
        };
      });
      document.body.removeChild(container);
      return password;
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

  appendLogoutButton() {
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
      logoutButton.style.display = "none";
      logoutButton.addEventListener('click', this.logOut.bind(this));
      return logoutButton;
    } else {
      console.warn("Logout button container not found.");
    }
  }

  logOut() {
    this.accessLevel = 0; // reset access level
    this.changePage("main"); // go back to main page
    this.logOutDiv.style.display = "none";
  }
}
// instantiate
new PageManager();

