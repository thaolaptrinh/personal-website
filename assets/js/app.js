const header = document.querySelector("header");

header.innerHTML = `<nav class="navbar bg-body fixed-top">
<div class="container">
  <a class="navbar-brand" href="./"
    ><img src="./public/logo.png" class="header__logo" alt="logo"
  /></a>
  <button
    class="navbar-toggler bg-primary"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasDarkNavbar"
    aria-controls="offcanvasDarkNavbar"
  >
    <span class="navbar-toggler-icon"></span>
  </button>
  <div
    class="offcanvas bg-body offcanvas-end text-bg-dark"
    tabindex="-1"
    id="offcanvasDarkNavbar"
    aria-labelledby="offcanvasDarkNavbarLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">
        <img
          src="./public/logo.png"
          class="header__logo"
          alt="logo"
        />
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
          <a
            class="nav-link"
            aria-current="page"
            href="./about.html"
            >About</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" href="./blog.html">Blog</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="./newsletter.html"
            >Newsletter</a
          >
        </li>
      </ul>
      <div class="search__form">
        <form action="">
          <div class="form-group position-relative">
            <input
              type="text"
              placeholder="Keywords"
              class="form-control"
            />

            <button class="button button-primary">Search</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</nav>`;

const footer = document.querySelector("footer");

footer.innerHTML = `
<div class="container">
<div
  class="footer__container d-md-flex pt-3 pt-md-0 justify-content-between align-items-center"
>
  <div class="footer__copyright text-center text-md-start">
    © Copyright 2023 by Thao’s blog. Built with
    <span>&#128151;</span> by ThaoLapTrinh
  </div>
  <div
    class="footer__socials d-flex gap-3 justify-content-center mt-2 mt-md-0"
  >
    <div class="icon">
      <a
        rel="noopener"
        href="https://github.com/thaolaptrinh"
        target="_blank"
      >
        <i class="fa fa-github" aria-hidden="true"></i
      ></a>
    </div>
    <div class="icon">
      <a
        rel="noopener"
        href="https://www.facebook.com/thaotoiday"
        target="_blank"
        ><i class="fa fa-facebook" aria-hidden="true"></i
      ></a>
    </div>
    <div class="icon">
      <a rel="noopener" href="#" target="_blank">
        <i class="fa fa-twitter" aria-hidden="true"></i>
      </a>
    </div>
    <div class="icon">
      <a rel="noopener" href="#" target="_blank">
        <i class="fa fa-linkedin" aria-hidden="true"></i>
      </a>
    </div>
  </div>
</div>
</div>
  `;
