const express = require("express"),
  router = express.Router();

const {
  RenderHomePage,
  RenderComingSoonPage,
} = require("../controllers/Index");

router.get("/", RenderHomePage);

router.get("/coming-soon", RenderComingSoonPage);

module.exports = router;
