import dbConnect from "../../../db/connect";
import Card from "../../../db/models/Card";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  console.log("BACKEND", id);

  if (request.method === "DELETE") {
    const card = await Card.findByIdAndDelete(id);
    return response.status(200).json(card);
  }

  if (request.method === "PUT") {
    const card = await Card.findByIdAndUpdate(id);
    console.log(card);
    return response.status(200).json(card);
  }
}
