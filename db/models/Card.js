import mongoose from "mongoose";
const { Schema } = mongoose;

const cardSchema = new Schema({
  name: String,
  text: String,
});

// connecting through mongoose to cards collection in the database.
// it's not case sensitive

const Card = mongoose.models.Cards || mongoose.model("Cards", cardSchema);
export default Card;
