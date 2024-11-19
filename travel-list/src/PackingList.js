import { useState } from "react";

export default function PackingList({
  items,
  onHandleDelete,
  onHandleCheck,
  setItems,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(b.packed) - Number(a.packed));

  function handleDeleteList() {
    setItems([]);
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <>
            <li key={item.id}>
              <input
                type="checkbox"
                checked={item.packed}
                onClick={() => onHandleCheck(item.id)}
              />{" "}
              <span
                style={item.packed ? { textDecoration: "line-through" } : {}}
              >
                {" "}
                {item.description} {item.quantity}
              </span>
              <button onClick={() => onHandleDelete(item.id)}>❌</button>
            </li>
          </>
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by the input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={handleDeleteList}>Clear list</button>
      </div>
    </div>
  );
}
