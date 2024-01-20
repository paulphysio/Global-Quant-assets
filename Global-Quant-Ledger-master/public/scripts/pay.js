// Get Payment Methods
let payment_method = document.querySelectorAll(".payment-method");
let copiedText = document.querySelector("#copied-text");
let payment_method_input = document.querySelector("#method");
let payment_address_input = document.querySelector("#address");
let submit_btn = document.querySelector("#submit-btn");
let payment_method_container = document.querySelector(
  "#payment-method-container"
);
let qrcode_container = document.querySelector("#qrcode-container");
let qrcode_image = document.querySelector("#qrcode-image");
// convert payment method nodelist to an array
payment_method = Array.from(payment_method);

payment_method.map((pm) => {
  // onclick of payment method element
  pm.onclick = async (e) => {
    // loop through payment menthod and hide wallet addresses
    payment_method.map((pm2) => {
      let children = Array.from(pm2.children);
      children[0].classList.add("hidden");
    });

    // Get target children
    let target_children = Array.from(e.target.children);

    // Get first target children and toggle the hidden class
    target_children[0].classList.toggle("hidden");

    // Get wallet address from first child innerText
    let wallet_address = target_children[0].innerText;

    // Get payment method from second child innerText
    let method = target_children[1].innerText;

    // Copy address to clipboard
    await navigator.clipboard.writeText(wallet_address);

    // Set payment method input value
    payment_method_input.value = method;

    // Set payment address input value
    payment_address_input.value = wallet_address;

    // Display alert
    displayAlert(`Copied ${method} address ✔️`, "text-green-600");

    if (e.target.classList.contains("col-span-8")) {
      e.target.classList.remove("col-span-8");
      e.target.classList.add("col-span-12");
    }

    if (e.target.classList.contains("col-span-4")) {
      e.target.classList.remove("col-span-4");
      e.target.classList.add("col-span-12");
    }
  };
});

// Submit button click event listener
submit_btn.onclick = async () => {
  payment_method_input.value === "" || payment_address_input.value === ""
    ? displayAlert("Please select a payment method below", "text-red-600", 2500)
    : null;
};

// Display alert function
function displayAlert(message, newclass = "", duration = 1000) {
  copiedText.innerText = message;
  copiedText.classList.remove(`opacity-0`);
  copiedText.classList.add(`opacity-100`, `${newclass !== "" ? newclass : ""}`);

  setTimeout(() => {
    copiedText.classList.remove(
      `opacity-100`,
      `${newclass !== "" ? newclass : ""}`
    );
    copiedText.classList.add(`opacity-0`);
  }, duration);
}

function displayWalletAddress(el) {
  let selectedWallet = el.value;
  if (selectedWallet === "") {
    // displayAlert("Please select one of your wallets", "text-red-600", 2500);
    payment_method.map((pm) => {
      pm.classList.add("hidden");
    });
    payment_method_container.classList.add("hidden");
    qrcode_container.classList.add("hidden");
    return;
  }

  payment_method.map((pm) => {
    if (pm.classList.contains(selectedWallet)) {
      payment_method_container.classList.remove("hidden");
      qrcode_container.classList.remove("hidden");
      qrcode_image.src = `/images/qrcode/${selectedWallet}.jpg`;
      pm.classList.remove("hidden");
    } else {
      pm.classList.add("hidden");
    }
  });
}
