import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import s from "./pesquisa.module.scss";

export default function Pesquisa() {
  const [livros, setLivros] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  //   Função para buscar livros da API
  const getLivros = async () => {
    const response = await axios.get("http://127.0.0.1:5000/livros");
    let itens = response.data;
    itens.sort((a, b) => a.titulo.localeCompare(b.titulo));
    setLivros(itens);
  };

  useEffect(() => {
    getLivros();
  }, []);

  //   Filtro de itens
  let filtrados = livros.filter(
    (item) =>
      item.titulo.toLowerCase().includes(location.state.texto.toLowerCase()) ||
      item.autor.toLowerCase().includes(location.state.texto.toLowerCase()) ||
      item.categoria.toLowerCase().includes(location.state.texto.toLowerCase())
  );

  //   Função para deletar livros por query params
  const deleteLivros = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/livros?id=${id}`);
      alert("Livro deletado com sucesso!");
      navigate("/livrosdoados");
    } catch (err) {
      console.error("Livro não encontrado.", err);
      alert("Erro ao deletar o livro. Veja o console para mais detalhes.");
    }
  };

  return (
    <section className={s.container}>
      <h2>{`Resultado da pesquisa: ${location.state.texto}`}</h2>
      <p>{`Total de livros: (${filtrados.length})`}</p>
      <section className={s.livros}>
        {filtrados.length > 0 ? (
          filtrados.map((item) => (
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
          <p>Nenhum resultado encontrado</p>
        )}
      </section>
    </section>
  );
}
