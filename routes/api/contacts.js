const express = require("express");
const Joi = require("joi");

const contactsService = require("../../models/contacts");
const router = express.Router();

const contactsAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ message: "Missing required name field" }),
  email: Joi.string()
    .required()
    .messages({ message: "Missing required email field" }),
  phone: Joi.string()
    .required()
    .messages({ message: "Missing required phone field" }),
});

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
        throw new HttpError(404, `Contact with ${contactId} not found`);
    }
    res.json(result);
}
catch (error) {
    next(error);
}
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
