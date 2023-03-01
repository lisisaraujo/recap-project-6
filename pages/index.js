import { useState } from "react";
import useSWR from "swr";
import styled from "styled-components";
import Card from "../components/Card";
import Form from "../components/Form";

export default function Home() {
  const [cardList, setCardList] = useState([]);
  const { data :cards } = useSWR("/api/cards");
  console.log(cards);
  if (!cards) {
    return <h1>Loading...</h1>;
  }

  // async function handleGetCoffee() {
  //   const response = await fetch("/api/hello", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(productData),
  //   });

  //   if (response.ok) {
  //     await response.json();
  //     coffees.mutate();
  //   } else {
  //     console.error(response.status);
  //   }
  // }

  // function getServerSideProps() {}

  function addCard(newCard) {
    setCardList([newCard, ...cardList]);
  }

  function handleRemoveCard(id) {
    setCardList(cardList.filter((card) => card.id !== id));
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
        {cards.map((card) => {
          return (
            <Card
              key={card.id}
              name={card.name}
              text={card.text}
              onRemoveCard={handleRemoveCard}
              onUpdateCard={handleUpdateCard}
              id={card.id}
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
