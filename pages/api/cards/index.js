import dbConnect from "../../../db/connect";
import Card from "../../../db/models/Card";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const cards = await Card.find();
      console.log(cards);

      return response.status(200).json(cards);
    } catch (error) {
      return response.status(404).json("Error");
    }
  }
}
