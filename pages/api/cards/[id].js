import dbConnect from "../../../db/connect";
import Card from "../../../db/models/Card";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "DELETE") {
    const card = await Card.findByIdAndDelete(id);
    return response.status(200).json(card);
  }
}
