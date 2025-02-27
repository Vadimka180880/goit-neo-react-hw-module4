import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./SearchBar.module.css"; 

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Please enter a search term.");
      return;
    }
    onSubmit(query);
  };

  return (
    <header className={styles.searchContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
