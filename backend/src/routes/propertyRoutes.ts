const { Router } = require("express")
const {
  createProperty,
  listProperties,
  getProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController")

const router = Router();

router.post("/", createProperty);
router.get("/", listProperties);
router.get("/:id", getProperty);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);

export = router;
