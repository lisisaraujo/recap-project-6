import Product from "../components/product";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";
export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const { push } = useRouter();
  const { trigger, isMutating } = useSWRMutation(
    `/api/cards/${id}`,
    updateCards
  );
  async function updateCards(url, { arg }) {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(arg),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      await response.json();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }
  async function handleEditCards(event) {
    event.preventDefault();
    const product = new FormData(event.target);
    const productData = Object.fromEntries(product);
    await trigger(productData);
    push("/");
  }
  async function handleDeleteProduct() {
    const response = await fetch(`/api/cards/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      await response.json();
      console.log(data);
      push("/");
    } else {
      console.error(`Error: ${response.status}`);
    }
  }
  if (isMutating) return <p>Submitting your changes</p>;
  return (
    <>
      <Product onSubmit={handleEditProduct} onDelete={handleDeleteProduct} />
    </>
  );
}
