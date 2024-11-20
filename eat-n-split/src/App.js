import { useState } from "react";
import "./index.css";
import AddFriend from "./AddFriend";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friendsList, setFriendsList] = useState(initialFriends);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedName, setSelectedName] = useState("");

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          isSelected={isSelected}
          setIsSelected={setIsSelected}
          friendsList={friendsList}
          setSelectedName={setSelectedName}
        />
        <AddFriend setFriendsList={setFriendsList} />
      </div>
      {isSelected && (
        <SplitABill
          friendsList={friendsList}
          setFriendsList={setFriendsList}
          name={selectedName}
          setIsSelected={setIsSelected}
        />
      )}
    </div>
  );
}

function FriendsList({
  friendsList,
  isSelected,
  setIsSelected,
  setSelectedName,
}) {
  return (
    <ul>
      {friendsList.map((item) => (
        <Friend
          isSelected={isSelected}
          setIsSelected={setIsSelected}
          key={item.id}
          name={item.name}
          image={item.image}
          balance={item.balance}
          setSelectedName={setSelectedName}
        />
      ))}
    </ul>
  );
}

function Friend({
  name,
  image,
  balance,
  isSelected,
  setIsSelected,
  setSelectedName,
}) {
  return (
    <li>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {balance < 0 && (
        <p className="green">
          {name} owes you {balance * -1}$
        </p>
      )}
      {balance === 0 && <p>You and {name} are even</p>}
      {balance > 0 && (
        <p className="red">
          You owe {name} {balance}$
        </p>
      )}

      <button
        className="button"
        onClick={() => {
          setIsSelected(!isSelected);
          setSelectedName(name);
        }}
      >
        Select
      </button>
    </li>
  );
}

function SplitABill({ name, setFriendsList, friendsList, setIsSelected }) {
  const [billValue, setBillValue] = useState(0);
  const [myExpense, setMyExpense] = useState(0);
  const [friendExpense, setFriendExpense] = useState(0);
  const [whoIsPaying, setWhoIsPaying] = useState("me");

  function handleSubmit(e) {
    e.preventDefault();

    let value = 0;
    whoIsPaying === "me" && (value = friendExpense * -1);
    whoIsPaying === "friend" && (value = myExpense);

    setFriendsList((prevList) =>
      prevList.map((friend) =>
        friend.name === name
          ? { ...friend, balance: friend.balance + Number(value) }
          : friend
      )
    );
    setIsSelected(false);
  }

  return (
    <form className="form-split-bill" onSubmit={(e) => handleSubmit(e)}>
      <h2>Split a bill with {name}</h2>
      <label>👫 Bill value</label>
      <input
        type="text"
        value={billValue}
        onChange={(e) => {
          const newBillValue = e.target.value; // Obține valoarea curentă din input
          setBillValue(newBillValue); // Actualizează billValue
          setFriendExpense(Number(newBillValue) - Number(myExpense)); // Calculează friendExpense
        }}
        // onChange={(e) => setName(e.target.value)}
      />
      <label>🌄 Your expense </label>
      <input
        type="number"
        value={myExpense}
        onChange={(e) => {
          const myNewExpense = e.target.value; // Obține valoarea curentă din input
          if (myNewExpense <= billValue) {
            setMyExpense(myNewExpense);
            setFriendExpense(Number(billValue) - Number(myNewExpense));
          } else alert("Nu este bine");
        }}

        // onChange={(e) => setImage(e.target.value)}
      />
      <label>👫 {name}'s expense: </label>
      <input
        type="number"
        value={friendExpense}
        disabled
        // onChange={(e) => setName(e.target.value)}
      />
      <label>🌄 Who is paying the bill?</label>
      <select
        type="text"
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{name}</option>
      </select>
      <button className="button">Split bill</button>
    </form>
  );
}
