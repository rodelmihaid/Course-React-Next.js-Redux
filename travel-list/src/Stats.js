export default function Stats({ numberOfItems }) {
  return (
    <footer className="stats">
      <em>
        You have {numberOfItems.totalNumber} items on your list, and{" "}
        {numberOfItems.packedNumber} are packed.
      </em>
    </footer>
  );
}
