import { useState, useEffect } from "react";
import axios from "axios";
import SearchForm from "../../Components/SearchForm/SearchForm";
import s from "./livrosdoados.module.scss";

export default function LivrosDoados() {
  const [livros, setLivros] = useState([]);
  const [livrosFiltrados, setLivrosFiltrados] = useState([]); // Estado para os livros filtrados
  const [erro, setErro] = useState(null);

  // Função para buscar livros da API
  const buscarLivros = async () => {
    try {
      const response = await axios.get("https://livros-api-vainaweb.onrender.com/livros");
      console.log("Livros carregados com sucesso!", response.data);

      let itens = response.data;
      itens.sort((a, b) => a.titulo.localeCompare(b.titulo));

      setLivros(itens);
      setLivrosFiltrados(itens); // Inicialmente, os livros filtrados são iguais aos originais
      setErro(null);
    } catch (err) {
      console.error("Erro ao carregar livros:", err);
      setErro("Erro ao carregar livros. Tente novamente.");
    }
  };

  // Buscar livros ao carregar o componente
  useEffect(() => {
    buscarLivros();
  }, []);

  // Função para filtrar livros
  const handleSearch = (query) => {
    if (!query.trim()) {
      setLivrosFiltrados(livros); // Se o campo estiver vazio, exibe todos os livros
      return;
    }

    const resultado = livros.filter(
      (livro) =>
        livro.titulo.toLowerCase().includes(query.toLowerCase()) ||
        livro.autor.toLowerCase().includes(query.toLowerCase())
    );

    setLivrosFiltrados(resultado);
  };

  return (
    <section className={s.containerLivros}>
      <h2>Livros Doados</h2>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <SearchForm onSearch={handleSearch} />

      <button
        onClick={buscarLivros}
        className={s.atualizarBtn}
        type="button"
        aria-label="Atualizar"
      >
        Atualizar
      </button>

      <p>Total de livros: ({livrosFiltrados.length})</p>


      <section className={s.livros}>
        {livrosFiltrados.length > 0 ? (
          livrosFiltrados.map((livro) => (
            <div className={s.livro} key={livro.id}>
              <img
                src={livro.imagem_url || "https://via.placeholder.com/150"}
                alt={`Capa do livro ${livro.titulo}`}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/150")
                }
              />
              <div>
                <h3
                  style={{ fontWeight: 600 }}
                  title={`Título: ${livro.titulo}`}
                >
                  {livro.titulo}
                </h3>
                <p title={`Autor: ${livro.autor}`}>Autor: {livro.autor}</p>
                <p title={`Categoria: ${livro.categoria}`}>
                  Categoria: {livro.categoria}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum livro encontrado.</p>
        )}
      </section>
    </section>
  );
}

