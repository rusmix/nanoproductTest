const mongoose = require("mongoose");
export const mongoConnect = async () => {
  mongoose.connect(process.env.MONGO_URL);
};
