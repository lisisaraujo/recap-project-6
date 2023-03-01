import mongoose from "mongoose";
const { Schema } = mongoose;

const coffeeSchema = new Schema({
  name: String,
  text: String,
});

// connecting through mongoose to cards collection in the database.
// it's not case sensitive

const Coffee = mongoose.models.Cards || mongoose.model("Cards", coffeeSchema);
export default Coffee;
