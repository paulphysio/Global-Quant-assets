const nav = document.getElementById("nav");
const navList = document.getElementById("nav-list");
const navUL = document.getElementById("nav-ul");
let isNavOpen = false;
const openButton = document.getElementById("open-button");
const closeButton = document.getElementById("close-button");

function toggleNav() {
  nav.classList.toggle("flex-col");
  navList.classList.toggle("hidden");
  navList.classList.toggle("flex");
  navList.classList.toggle("animate-slide");
  navUL.classList.toggle("flex-col");
  isNavOpen = !isNavOpen;

  openButton.classList.toggle("hidden");
  openButton.classList.toggle("animate-opacity");
  closeButton.classList.toggle("hidden");
  closeButton.classList.toggle("animate-opacity");
}
