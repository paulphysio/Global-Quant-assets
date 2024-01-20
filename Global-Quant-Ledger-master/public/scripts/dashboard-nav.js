const nav = document.getElementById("nav");
let isNavOpen = false;
const openButton = document.getElementById("open-button");
const closeButton = document.getElementById("close-button");

function toggleNav() {
  //   nav.classList.toggle("animate-slide");
  nav.classList.toggle("hidden");
  isNavOpen = !isNavOpen;

  openButton.classList.toggle("hidden");
  openButton.classList.toggle("animate-rotate");
  closeButton.classList.toggle("hidden");
  closeButton.classList.toggle("animate-rotate");
}
