import dbConnect from "../../../db/connect";
import Card from "../../../db/models/Card";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

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

  if (request.method === "POST") {
    try {
      const productData = request.body;
      const product = new Card(productData);
      await product.save();

      response.status(201).json({ status: "Product created." });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}
