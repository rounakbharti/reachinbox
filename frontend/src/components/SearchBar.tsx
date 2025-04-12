export default function SearchBar({
    query,
    setQuery,
  }: {
    query: string;
    setQuery: (q: string) => void;
  }) {
    return (
      <input
        type="text"
        placeholder="🔍 Search emails..."
        className="w-full p-2 border border-gray-300 rounded shadow-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    );
  }
  