import { useState } from "react";
import Form from "./Form";
import Logo from "./Logo";
import Stats from "./Stats";
import "./index.css";

function App() {
  const [numberOfItems, setNumberOfItems] = useState({
    totalNumber: 0,
    packedNumber: 0,
  });

  return (
    <div className="app">
      <Logo />
      <Form setNumberOfItems={setNumberOfItems} />
      <Stats numberOfItems={numberOfItems} />
    </div>
  );
}

export default App;
