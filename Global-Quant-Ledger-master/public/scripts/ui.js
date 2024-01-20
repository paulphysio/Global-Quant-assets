let successAlert = document.querySelector("#successAlert");
let errorAlert = document.querySelector("#errorAlert");

function displayAlert(message, status) {
  if (status === "success") {
    successAlert.innerHTML = message;

    setTimeout(() => {
      successAlert.innerHTML = "";
    }, 4500);
    return;
  }
  errorAlert.innerHTML = message;
  setTimeout(() => {
    errorAlert.innerHTML = "";
  }, 4500);
}
