import dbConnect from "../../../db/connect";
import Coffee from "../../../db/models/Coffee";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const coffees = await Coffee.find();
    console.log(coffees);
    return response.status(200).json(coffees);
  }
  return response.status(404).json("Error");

  // if (request.method === "POST") {
  //   try {
  //     const productData = request.body;
  //     const product = new Product(productData);
  //     await product.save();

  //     response.status(201).json({ status: "Product created." });
  //   } catch (error) {
  //     response.status(400).json({ error: error.message });
  //   }
  // }
}
