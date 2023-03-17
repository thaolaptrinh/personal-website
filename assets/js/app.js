const header = () => {
  const header = document.createElement("header");

  header.innerHTML = `
  <nav class="navbar bg-primary fixed-top">
  <div class="container">
    <a class="navbar-brand" href="#"
      ><img src="./public/logo.png" alt="logo"
    /></a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasDarkNavbar"
      aria-controls="offcanvasDarkNavbar"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="offcanvas bg-primary offcanvas-end text-bg-dark"
      tabindex="-1"
      id="offcanvasDarkNavbar"
      aria-labelledby="offcanvasDarkNavbarLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">
          Dark offcanvas
        </h5>
        <button
          type="button"
          class="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#"
              >Home</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li>
                <a class="dropdown-item" href="#">Another action</a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a class="dropdown-item" href="#"
                  >Something else here</a
                >
              </li>
            </ul>
          </li>
        </ul>
        <form class="d-flex mt-3" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </div>
</nav>
  `;
  return header;
};

const footer = () => {
  const footer = document.createElement("footer");
  footer.classList.add("footer");
  footer.innerHTML = `
  <div class="container">
    <div
      class="footer__container d-md-flex pt-3 pt-md-0 justify-content-between align-items-center"
    >
      <div class="footer__copyright text-center text-md-start">
        © Copyright 2022 by Thao’s blog. Built with
        <span>&#128151;</span> by CreativeDesignsGuru
      </div>
      <div
        class="footer__socials d-flex gap-3 justify-content-center mt-2 mt-md-0"
      >
        <div class="icon">
          <i class="fa fa-github" aria-hidden="true"></i>
        </div>
        <div class="icon">
          <i class="fa fa-facebook" aria-hidden="true"></i>
        </div>
        <div class="icon">
          <i class="fa fa-twitter" aria-hidden="true"></i>
        </div>
        <div class="icon">
          <i class="fa fa-linkedin" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  </div>
  `;

  return footer;
};

const app = () => {
  const app = document.getElementById("app");
  app.appendChild(header());
  app.appendChild(footer());
  return app;
};

app();
