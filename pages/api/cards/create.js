import dbConnect from "../../../db/connect";
import Card from "../../../db/models/Card";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    console.log("test");
    try {
      const productData = request.body;
      console.log("PRODUCTDATA", productData);
      const product = new Card(productData);
      await product.save();

      response.status(201).json({ status: "Product created." });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}
