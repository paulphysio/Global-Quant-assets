const notifButton = document.querySelector("#notifications-button");
const notifications = document.querySelector("#notifications");

notifButton.onclick = (e) => {
  e.preventDefault();
  // toggle hidden class
  notifications.classList.toggle("hidden");
};
