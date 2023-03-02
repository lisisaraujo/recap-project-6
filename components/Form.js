import styled from "styled-components";
import { BsPlusCircleFill } from "react-icons/bs";
import useSWR from "swr";

export default function Form({ onAddCard, onRefreshPage }) {
  const cards = useSWR("/api/cards/create");

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newCard = Object.fromEntries(formData);
    console.log(newCard);

    const response = await fetch("/api/cards/create", {
      method: "POST",
      body: JSON.stringify(newCard),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
      cards.mutate();

      event.target.reset();
    } else {
      console.error(`Error: ${response.status}`);
    }

    onAddCard(newCard);

    event.target.reset();
  }

  return (
    <EntryForm onSubmit={handleSubmit}>
      <InputWrapper>
        <input
          placeholder={`Type your thoughts...`}
          name="text"
          autoComplete="off"
          aria-label="Enter text"
        />
        <input
          placeholder={`your name..`}
          name="name"
          aria-label="Enter your name"
        />
      </InputWrapper>
      <Button>
        <BsPlusCircleFill aria-label="Create new entry" />
      </Button>
    </EntryForm>
  );
}

const EntryForm = styled.form`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 70px;
  position: fixed;
  bottom: 0;
`;

const InputWrapper = styled.div`
  width: calc(100% - 100px);
  display: flex;
  justify-content: space-around;

  input {
    border: none;
    padding: 10px;
    border-top: 2px solid #252629;
    height: 100%;
    width: 100%;
  }
  input:focus {
    outline: none;
  }
`;

const Button = styled.button`
  background-color: white;
  color: #fe4b13;
  border: none;
  border-radius: 7px;

  svg {
    height: 48px;
    width: 48px;
  }
`;
