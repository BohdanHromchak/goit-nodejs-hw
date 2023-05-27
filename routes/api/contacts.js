const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const schemas = require("../../schemas/schemas");
const router = express.Router();

router.get("/", ctrl.listContacts);
router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.contactsAddSchema), ctrl.addContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.contactsAddSchema),
  ctrl.updateContactById
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", isValidId, ctrl.removeContact);

module.exports = router;
