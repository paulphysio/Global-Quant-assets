const nav = document.getElementById("nav");
const navHeader = document.getElementById("nav-header");

window.addEventListener("scroll", function (event) {
  // To listen for event
  event.preventDefault();
  if (window.scrollY >= 50) {
    // Just an example
    nav.classList.add("bg-white");
    nav.classList.remove("bg-black");

    navHeader.classList.remove("text-white");
    navHeader.classList.add("text-black");
  } else {
    nav.classList.remove("bg-white");
    nav.classList.add("bg-black");

    navHeader.classList.add("text-white");
    navHeader.classList.remove("text-black");
  }
});
