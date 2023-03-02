import { useState, useEffect } from "react";
import useSWR from "swr";
import styled from "styled-components";
import Card from "../components/Card";
import Form from "../components/Form";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

export default function Home() {
  const [cardList, setCardList] = useState([]);

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
    console.log("ANOTHER ONE", id);
    const response = await fetch(`/api/cards/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      await response.json();
      // push("/");
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  async function handleUpdateCard(updatedCard) {
    const response = await fetch(`/api/cards/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedCard),
    });
  }

  return (
    <BoardWrapper>
      <CardGrid>
        {cardList.map((card) => {
          console.log(card);
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
