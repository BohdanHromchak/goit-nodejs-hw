const express = require("express");
const schemas = require("../../schemas/schemas");
const { validateBody } = require("../../middlewares/middlewares");
const { HttpError } = require("../../helpers");
const contactsService = require("../../models/contact");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw new HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  validateBody(schemas.contactsAddSchema),
  async (req, res, next) => {
    try {
      const result = await contactsService.addContact(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw new HttpError(404, "Not found");
    }
    res.status(200).json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:contactId",
  validateBody(schemas.contactsAddSchema),
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await contactsService.updateContact(contactId, req.body);
      if (!result) {
        throw new HttpError(404, "Not found");
      }

      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
