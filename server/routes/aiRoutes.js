const express = require("express");
const router = express.Router();

const {
  bulkImport,
  chatAssistant,
} = require("../controllers/aiController");

router.post("/bulk-import", bulkImport);

router.post("/chat", chatAssistant);

module.exports = router;