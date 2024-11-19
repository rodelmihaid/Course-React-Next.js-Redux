import { useEffect, useState } from "react";
import PackingList from "./PackingList";

export default function Form({ setNumberOfItems }) {
  // const numberOfItems = [
  //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  // ];
  const initialItems = [
    { id: 1, description: "Passaport", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: true },
  ];
  const numberOfItems = Array.from({ length: 20 }, (_, i) => i + 1);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState(initialItems);

  useEffect(
    () =>
      setNumberOfItems({
        totalNumber: items.length,
        packedNumber: items.reduce(
          (acc, cur) => (cur.packed ? acc + 1 : acc),
          0
        ),
      }),
    [items, setNumberOfItems]
  );

  function handleCheck(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) {
      return;
    }
    const newItem = { description, quantity, packed: false, id: Date.now() };
    setItems(() => [...items, newItem]);

    setDescription("");
    setQuantity(1);
  }

  function handleDelete(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your trip?</h3>
        <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
          {numberOfItems.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add</button>
      </form>
      <PackingList
        onHandleCheck={handleCheck}
        onHandleDelete={handleDelete}
        items={items}
        setItems={setItems}
      />
    </>
  );
}
