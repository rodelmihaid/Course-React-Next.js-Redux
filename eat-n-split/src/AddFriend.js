import { useState } from "react";

export default function AddFriend({ setFriendsList }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(
    `https://i.pravatar.cc/48?u=${Date.now()}`
  );

  function handleSubmitNewFriend(e) {
    e.preventDefault();
    const newFriend = {
      id: Date.now(), // Generăm un ID unic
      name: name,
      image: image || `https://i.pravatar.cc/48?u=${Date.now()}`, // URL implicit dacă nu este introdus
      balance: 0, // Balans inițial
    };

    setFriendsList((list) => [...list, newFriend]);
    setName("");
    setImage(`https://i.pravatar.cc/48?u=${Date.now()}`);
    setIsOpen(false);
  }

  return (
    <div>
      <button className="button" onClick={() => setIsOpen(!isOpen)}>
        Add Friend
      </button>
      {isOpen && (
        <>
          <form
            className="form-add-friend"
            onSubmit={(e) => handleSubmitNewFriend(e)}
          >
            <label>👫 Friend name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>🌄 Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <button className="button">Add</button>
          </form>
        </>
      )}
    </div>
  );
}
