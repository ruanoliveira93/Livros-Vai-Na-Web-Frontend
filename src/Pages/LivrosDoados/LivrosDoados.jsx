import { useState, useEffect } from "react";
import axios from "axios";
import SearchLivros from "../../Components/SearchLivros/SearchLivros";
import s from "./livrosdoados.module.scss";

export default function LivrosDoados() {
  const [livros, setLivros] = useState([]);
  const [livrosFiltrados, setLivrosFiltrados] = useState([]);
  const [erro, setErro] = useState(null);

  // Função para buscar livros da API
  const buscarLivros = async () => {
    try {
      const response = await axios.get("https://api-livros-vainaweb-vp00.onrender.com/livros");
      console.log(
        `Livros carregados com sucesso! (Status: ${response.status})`
      );

      let itens = response.data;
      itens.sort((a, b) => a.titulo.localeCompare(b.titulo));

      setLivros(itens);
      setLivrosFiltrados(itens);
      setErro(null);
    } catch (err) {
      console.error("Erro ao carregar livros:", err);
      setErro("Erro ao carregar livros. Tente novamente.");
    }
  };

  // Buscar livros ao carregar a função
  useEffect(() => {
    buscarLivros();
  }, []);

  // Filtro de pesquisa
  const handleSearch = (query) => {
    if (!query.trim()) {
      setLivrosFiltrados(livros);
      return;
    }

    const resultado = livros.filter(
      (livro) =>
        livro.titulo.toLowerCase().includes(query.toLowerCase()) ||
        livro.autor.toLowerCase().includes(query.toLowerCase()) ||
        livro.categoria.toLowerCase().includes(query.toLowerCase())
    );

    setLivrosFiltrados(resultado);
  };

  // Função para deletar livro por query params
  const deleteLivros = async (id) => {
    try {
        await axios.delete(`https://api-livros-vainaweb-vp00.onrender.com/livros?id=${id}`)
        alert("Livro deletado com sucesso!")
        buscarLivros()
    } catch (err) {
        console.error("Livro não encontrado.", err)
        alert("Erro ao deletar o livro. Veja o console para mais detalhes.");
    }
  }

  return (
    <section className={s.containerLivros}>
      <h2>Livros Doados</h2>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <SearchLivros onSearch={handleSearch} />

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
          livrosFiltrados.map((item) => (
            <section key={item.id} className={s.livro}>
              <img
                src={
                  item.imagem_url ||
                  "https://placehold.jp/3d4070/ffffff/245x340.png"
                }
                onError={(e) =>
                  (e.target.src =
                    "https://placehold.jp/3d4070/ffffff/245x340.png")
                }
                alt={`Capa do livro ${item.titulo}`}
              />
              <section className={s.texto}>
                <h3 title={`Título: ${item.titulo}`}>{item.titulo}</h3>
                <p title={`Autor: ${item.autor}`}>{`Autor: ${item.autor}`}</p>
                <p
                  title={`Categoria: ${item.categoria}`}
                >{`Categoria: ${item.categoria}`}</p>
              </section>
              <section className={s.modalDelete}>
                <button onClick={() => deleteLivros(item.id)} type="button">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </section>
            </section>
          ))
        ) : (
          <p>Nenhum livro encontrado.</p>
        )}
      </section>
    </section>
  );
}
