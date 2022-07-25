export function Filter({ filter, setFilter }) {
  return (
    <input
      className="p-1 border rounded"
      placeholder="Search"
      value={filter}
      onChange={(e) => {
        setFilter(e.target.value);
      }}
    />
  );
}
