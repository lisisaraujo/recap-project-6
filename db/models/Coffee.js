import mongoose from "mongoose";
const { Schema } = mongoose;

const coffeeSchema = new Schema({
  name: String,
  text: String,
});
const Coffee = mongoose.models.Cards || mongoose.model("Cards", coffeeSchema);
export default Coffee;
