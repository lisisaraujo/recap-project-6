import { useState, useEffect } from "react";
import useSWR from "swr";
import styled from "styled-components";
import Card from "../components/Card";
import Form from "../components/Form";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

export default function Home() {
  const [cardList, setCardList] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  // const { trigger, isMutating } = useSWRMutation(
  //   `/api/cards/${id}`,
  //   updateProduct
  // );
  console.log("idididiididid", id);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api/cards");
      const cards = await data.json();
      setCardList(cards);
    };
    fetchData().catch(console.error);
  }, []);
  if (!cardList) {
    return <h1>Loading...</h1>;
  }

  function addCard(newCard) {
    setCardList([newCard, ...cardList]);
  }

  async function handleRemoveCard(id) {
    const response = await fetch(`/api/cards/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      await response.json();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  function handleUpdateCard(updatedCard) {
    const updatedCardList = cardList.map((card) => {
      if (card.id === updatedCard.id) {
        return updatedCard;
      }
      return card;
    });
    setCardList(updatedCardList);
  }

  return (
    <BoardWrapper>
      <CardGrid>
        {cardList.map((card) => {
          return (
            <Card
              key={card._id}
              name={card.name}
              text={card.text}
              onRemoveCard={handleRemoveCard}
              onUpdateCard={handleUpdateCard}
              id={card._id}
            />
          );
        })}
      </CardGrid>
      <Form onAddCard={addCard} />
    </BoardWrapper>
  );
}
const BoardWrapper = styled.section`
  display: grid;
  grid-template-rows: min-content auto 48px;
  height: inherit;
`;
const CardGrid = styled.ul`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  align-content: start;
  margin: 0;
  padding: 20px;
  overflow-y: auto;
`;
