import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Inicio from "../../Pages/Inicio/Inicio";
import LivrosDoados from "../../Pages/LivrosDoados/LivrosDoados";
import QueroDoar from "../../Pages/QueroDoar/QueroDoar";
import logoLivro from "../../assets/Logo Livro.png";
import s from "./header.module.scss";
import SearchForm from "../SearchForm/SearchForm";
import Pesquisa from "../../Pages/Pesquisa/Pesquisa";

export default function Header() {
  return (
    <BrowserRouter>
      <header>
        <section className={s.logoHeader}>
          <Link to="/">
            <img src={logoLivro} alt="Imagem ilustrativa de um livro aberto" />
            <h1>Livros Vai na Web</h1>
          </Link>
        </section>

        <nav className={s.navbar}>
          <ul>
            <li>
              <Link to="/">Início</Link>
            </li>
            <li>
              <Link to="/livrosdoados">Livros Doados</Link>
            </li>
            <li>
              <Link to="/querodoar">Quero Doar</Link>
            </li>
          </ul>
        </nav>

        <SearchForm />
      </header>

      <Routes>
        <Route index element={<Inicio />} />
        <Route path="/livrosdoados" element={<LivrosDoados />} />
        <Route path="/querodoar" element={<QueroDoar />} />
        <Route path="/pesquisa" element={<Pesquisa />} />
      </Routes>
    </BrowserRouter>
  );
}
