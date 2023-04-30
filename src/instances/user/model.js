const mongoose = require("mongoose");

const user = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
});

export const User = mongoose.model(USER_COLLECTION_NAME, user);
