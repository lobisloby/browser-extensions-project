// LIGHT AND DARK MODE 
console.log("Script loaded successfully!");

document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM fully loaded");

  const html = document.getElementById("htmlPage");
  const checkbox4El = document.getElementById("btn-check-4");
  const imgEl = document.querySelector('label[for="btn-check-4"] img');

  if (!html || !checkbox4El || !imgEl) {
    console.error("One or more required elements not found:", {
      html: !!html,
      checkbox: !!checkbox4El,
      image: !!imgEl
    });
    return;
  }

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    checkbox4El.checked = true;
  }

  function updateTheme() {
    if (checkbox4El.checked) {
      html.setAttribute("data-bs-theme", "dark");
      imgEl.src = 'assets/images/icon-sun.svg';
      localStorage.setItem('theme', 'dark');
      console.log("Theme set to dark");
    } else {
      html.setAttribute("data-bs-theme", "light");
      imgEl.src = 'assets/images/icon-moon.svg';
      localStorage.setItem('theme', 'light');
      console.log("Theme set to light");
    }
  }


  checkbox4El.addEventListener("change", updateTheme);

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      checkbox4El.checked = e.matches;
      updateTheme();
    }
  });


  updateTheme();
  loadExtensions();

  // DNMYC CARDS
  function loadExtensions() {
    fetch("data.json")
      .then(res => res.json())
      .then(data => {
        const container = document.querySelector(".container__cards");
        container.innerHTML = "";

        data.forEach(extension => {
          const col = document.createElement("div");
          col.className = "col-md-6 col-lg-4 col-sm-12 mb-3";

          col.innerHTML = `
                    <div class="card container-extensions-card shadow m-2 text-center h-100">
          <div class="card-body">
            <div class="row d-flex flex-row mb-4">
              <div class="col-3">
                <img src="${extension.logo}" alt="${extension.name} Logo" />
              </div>
              <div class="col-9 text-start mt-1">
                <h5 class="card-title">${extension.name}</h5>
                <p class="card-text">${extension.description}</p>
              </div>
            </div>

            <div class="row">
              <div class="col-8 d-flex justify-content-start">
                <a href="#" class="btn btn-outline-dark rounded-pill btn-remove">Remove</a>
              </div>
              <div class="col-4 d-flex justify-content-end">
                <div class="form-check form-switch">
                  <input
                    class="toggle form-check-input fs-3 text-end"
                    type="checkbox"
                    role="switch"
                    ${extension.isActive ? "checked" : ""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
                `;
          container.appendChild(col);
        });
      })
      .catch(err => console.error("Error loading extensions:", err))
  }

  // MAKE FUNCTION FOR SORT ACTIVE EXTENSIONS

  function loadActiveExtensions() {
    fetch("data.json")
      .then(res => res.json())
      .then(data => {
        const container = document.querySelector(".container__cards");
        container.innerHTML = "";

        data.forEach(extension => {
          if (extension.isActive) {
            const col = document.createElement("div");
            col.className = "col-md-6 col-lg-4 col-sm-12 mb-3";

            col.innerHTML = `
                    <div class="card container-extensions-card shadow m-2 text-center h-100">
          <div class="card-body">
            <div class="row d-flex flex-row mb-4">
              <div class="col-3">
                <img src="${extension.logo}" alt="${extension.name} Logo" />
              </div>
              <div class="col-9 text-start mt-1">
                <h5 class="card-title">${extension.name}</h5>
                <p class="card-text">${extension.description}</p>
              </div>
            </div>

            <div class="row">
              <div class="col-8 d-flex justify-content-start">
                <a href="#" class="btn btn-outline-dark rounded-pill btn-remove">Remove</a>
              </div>
              <div class="col-4 d-flex justify-content-end">
                <div class="form-check form-switch">
                  <input
                    class="toggle form-check-input fs-3 text-end"
                    type="checkbox"
                    role="switch"
                    ${extension.isActive ? "checked" : ""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
                `;
            container.appendChild(col);
          }

        });
      })
      .catch(err => console.error("Error loading extensions:", err))
  }

  // MAKE FUNCTION FOR SORT INACTIVE EXTENSIONS
  function loadInactiveExtensions() {
    fetch("data.json")
      .then(res => res.json())
      .then(data => {
        const container = document.querySelector(".container__cards");
        container.innerHTML = "";

        data.forEach(extension => {
          if (!extension.isActive) {
            const col = document.createElement("div");
            col.className = "col-md-6 col-lg-4 col-sm-12 mb-3";

            col.innerHTML = `
                    <div class="card container-extensions-card shadow m-2 text-center h-100">
          <div class="card-body">
            <div class="row d-flex flex-row mb-4">
              <div class="col-3">
                <img src="${extension.logo}" alt="${extension.name} Logo" />
              </div>
              <div class="col-9 text-start mt-1">
                <h5 class="card-title">${extension.name}</h5>
                <p class="card-text">${extension.description}</p>
              </div>
            </div>

            <div class="row">
              <div class="col-8 d-flex justify-content-start">
                <a href="#" class="btn btn-outline-dark rounded-pill btn-remove">Remove</a>
              </div>
              <div class="col-4 d-flex justify-content-end">
                <div class="form-check form-switch">
                  <input
                    class="toggle form-check-input fs-3 text-end"
                    type="checkbox"
                    role="switch"
                    ${extension.isActive ? "checked" : ""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
                `;
            container.appendChild(col);
          }

        });
      })
      .catch(err => console.error("Error loading extensions:", err))
  }



  //LOGIC CARDS
  const BtnAllEl = document.querySelector("#all");
  const BtnActiveEl = document.querySelector("#active");
  const BtnInactive = document.querySelector("#inactive");

  BtnAllEl.addEventListener("click", loadExtensions);
  BtnActiveEl.addEventListener("click", loadActiveExtensions);
  BtnInactive.addEventListener("click", loadInactiveExtensions);


});
