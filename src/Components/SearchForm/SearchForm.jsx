import { useRef, useState } from "react";
import LupaPesquisa from "../../assets/search.png";
import { useNavigate } from "react-router";
import s from "./searchForm.module.scss";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleFocus = () => {
    if (formRef.current) {
      formRef.current.style.border = "1px solid white"
    }
  };

  const handleBlur = () => {
    if (formRef.current) {
      formRef.current.style.border = "1px solid #005695"
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setQuery("");
    navigate("/pesquisa", { state: { texto: query } });
  };

  return (
    <form ref={formRef} className={s.formSearch} onSubmit={handleSearch}>
      <input
        type="search"
        placeholder="O que você procura?"
        value={query}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Pesquisa ao pressionar "Enter"
      />

      <button onClick={handleSearch} type="submit">
        <img src={LupaPesquisa} alt="Imagem Lupa" />
      </button>
    </form>
  );
}
