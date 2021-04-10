"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContactSchema = new Schema({
    FullName: String,
    EmailAddress: String,
    ContactNumber: String,
}, {
    collection: "contacts",
});
const Model = mongoose.model("Contact", ContactSchema);
exports.default = Model;
//# sourceMappingURL=contact.js.map