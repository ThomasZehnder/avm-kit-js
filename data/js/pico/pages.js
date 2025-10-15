class PageManager {
  constructor() {
    this.pages = {};
    this.currentPage = null;
    this.accessLevel = 0; // default access level 0 = no password
    this.password = "admin"; // default password, change as needed
    this.logOutDiv = null;

    this.loadPageQueue = [];
    this.isProcessing = false;

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

    // Fetch password from server after 2s
    setTimeout(() => this.fetchPassword(), 2000);

    // Check the queue every 300ms and process one page if available
    setInterval(() => this.processLoadPage(), 300);
  }

  refreshPageList() {
    this.pages = {}; // Reset pages object
    document.querySelectorAll("[page]").forEach(div => {
      const name = div.getAttribute("page");
      const accessLevel = Number(div.getAttribute("accesslevel")) || 0;
      this.pages[name] = { "div": div, "accessLevel": accessLevel };
      //console.log(`Found page: "${name}" with access level ${accessLevel}`);
      div.classList.remove("active");
    });
    console.log("Pages found:", Object.keys(this.pages));
    // start on main page if exists
    this.changePage("main");
  }

  async changePage(name) {
    console.log(`Navigate to page check accesslevel "${name}"`);

    //hide old page
    if (this.currentPage && this.pages[this.currentPage]) {
      this.pages[this.currentPage].div.classList.remove("active");
    }

    if (this.pages[name]) {
      if ((this.pages[name].accessLevel > this.accessLevel) || (this.pages[name].accessLevel === 255)) {

        //force to show login page
        this.pages["pages/loginpage"].div.classList.add("active");

        const password = await getPasswordDialog();

        //force to hide login page
        this.pages["pages/loginpage"].div.classList.remove("active");

        if (password !== this.password) { // Check password
          alert("Incorrect password!");
          this.changePage("main"); // go back to main page
          return;
        } // else correct password, continue
        this.accessLevel = this.pages[name].accessLevel;// store access level
        this.logOutDiv.style.display = "block";
        if (name === "pages/loginpage") name = "main"; //show main
      }

      this.pages[name].div.classList.add("active");
      this.currentPage = name;
      console.log(`Change to page definitly "${name}"`);
    } else {
      console.warn(`Page "${name}" not found!`);
    }

    async function getPasswordDialog() {

      const okButton = document.getElementById("login-ok-button");
      const cancelButton = document.getElementById("login-cancel-button");
      const tmpInput = document.getElementById("login-input");
      tmpInput.value = ""; //remove old password

      tmpInput.focus();
      const password = await new Promise(resolve => {
        okButton.onclick = () => resolve(tmpInput.value);
        cancelButton.onclick = () => resolve(null);
        tmpInput.onkeyup = (e) => {
          if (e.key === 'Enter') resolve(tmpInput.value);
        };
      });

      return password;
    }
  }

  dynamicLoadPage(pageName, accessLevel = 0, callback=null) {
    console.warn("Move page load to queue: ", pageName);
    this.loadPageQueue.push({ pageName, accessLevel, callback });
  }


  async processLoadPage() {
    // If already processing or queue is empty, do nothing
    if (this.isProcessing || this.loadPageQueue.length === 0) return;

    const { pageName, accessLevel , callback} = this.loadPageQueue.shift(); // Get next page
    this.isProcessing = true;
    console.warn("Load page from queue: ", pageName);

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
    } finally {
      this.isProcessing = false; // Ready to process next page

      if (callback){
        console.warn("callback after page load", callback);
        callback();
      }
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

