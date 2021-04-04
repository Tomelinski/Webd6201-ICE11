"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContactSchema = new Schema({
    FullName: String,
    EmailAddress: String,
    ContactNumber: String,
});
//# sourceMappingURL=contact.js.map