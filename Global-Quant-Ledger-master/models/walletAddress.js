const mongoose = require("mongoose");

const walletAddressSchema = new mongoose.Schema({
  wallets: [
    {
      name: {
        type: String,
        required: true,
        default: "btc",
        enum: [
          "btc",
          "eth",
          "xrp",
          "xlm",
          "xdc",
          "algo",
          "miota",
          "ada",
          "hbar",
          "qtum",
        ],
      },
      network: {
        type: String,
        required: true,
        default: "none",
        enum: ["none", "ERC20", "TRC20", "BEP20"],
      },
      address: { type: String, required: true },
    },
  ],
});

const WalletAddresses = mongoose.model("WalletAddresses", walletAddressSchema);
module.exports = WalletAddresses;
