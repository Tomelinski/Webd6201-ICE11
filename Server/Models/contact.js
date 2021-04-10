"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContactSchema = new Schema({
    FullName: String,
    EmailAddress: String,
    ContactNumber: String,
}, {
    collection: "contacts",
});
exports.Model = mongoose.model("Contact", ContactSchema);
//# sourceMappingURL=contact.js.map