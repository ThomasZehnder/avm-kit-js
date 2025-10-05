(function () {
  let pages = {};
  let currentPage = null;

  // Initialisierung nach DOM-Load
  window.addEventListener("DOMContentLoaded", () => {
    this.refreshPageList();

  });

  refreshPageList = function () {
    pages = {}; // Reset pages object
    document.querySelectorAll("[page]").forEach(div => {
      const name = div.getAttribute("page");    
      pages[name] = div;
      div.classList.remove("active");
    });
    console.log("Pages found:", Object.keys(pages));
    // start on main page if exists
    changePage("main");
  }

  // global Funktion
  window.changePage = function (name) {
    if (currentPage && pages[currentPage]) {
      pages[currentPage].classList.remove("active");
    }
    if (pages[name]) {
      pages[name].classList.add("active");
      currentPage = name;
      console.log(`Change to page "${name}"`);
    } else {
      console.warn(`Page "${name}" not found!`);
    }
  };


  //content loader
  window.dynamicLoadPage = async function (pageName) {
    try {
      // Fetch the HTML fragment, e.g. "servicePage.html"
      const response = await fetch(`${pageName}.html`);
      if (!response.ok) {
        throw new Error(`Failed to load: ${response.statusText}`);
      }

      const html = await response.text();

      // Create a new div to hold the loaded content
      const pageDiv = document.createElement("div");
      pageDiv.classList.add("pageContainer");  // optional CSS class
      pageDiv.setAttribute("page", pageName); // <div page="main"> etc.
      pageDiv.innerHTML = html;

      // Append it to the container
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


})();