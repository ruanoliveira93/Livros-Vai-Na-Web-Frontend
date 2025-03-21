import { useState } from "react";
import LupaPesquisa from "../../assets/search.png";
import s from "./searchForm.module.scss";

export default function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return; // Evita pesquisa vazia
    onSearch(query); // Envia a pesquisa para o componente pai
    setQuery(""); // Limpa o campo após a busca
  };

  return (
    <section className={s.formSearch}>
      <input
        type="search"
        placeholder="O que você procura?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Pesquisa ao pressionar "Enter"
      />

      <button onClick={handleSearch} type="button">
        <img src={LupaPesquisa} alt="Imagem Lupa" />
      </button>
    </section>
  );
}
