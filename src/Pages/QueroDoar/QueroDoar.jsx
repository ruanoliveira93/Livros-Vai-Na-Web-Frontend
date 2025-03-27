import { useState } from "react";
import iconeLivro from "../../assets/IconeLivro.png";
import axios from "axios";
import s from "./querodoar.module.scss";

export default function QueroDoar() {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [autor, setAutor] = useState("");
  const [imagem_url, setImagemUrl] = useState("");

  const EnviarDados = async (e) => {
    e.preventDefault();

    if (!titulo || !categoria || !autor || !imagem_url) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    try {
      const response = await axios.post("https://livros-api-vainaweb.onrender.com/doar", {
        titulo,
        categoria,
        autor,
        imagem_url,
      });

      console.log("Dados enviados com sucesso!", response.data);
      alert("Livro cadastrado com sucesso!");
      
      setTitulo("");
      setCategoria("");
      setAutor("");
      setImagemUrl("");

    } catch (err) {
      console.error("Erro ao enviar dados:", err);
      alert(`Erro ao enviar dados: ${err.message}`);
    }
  };

  return (
    <section className={s.queroDoar}>
      <p>
        Por favor, preencha o formulário com suas informações e as informações
        do Livro
      </p>
      <section className={s.formulario}>
        <div>
          <img src={iconeLivro} alt="Imagem ilustrativa de um livro" />
          <p>Informações do Livro</p>
        </div>

        <section className={s.form}>
          <input type="text" name="titulo" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          <input type="text" name="categoria" placeholder="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
          <input type="text" name="autor" placeholder="Autor" value={autor} onChange={(e) => setAutor(e.target.value)} />
          <input type="url" name="imagem_url" placeholder="Link da Imagem" value={imagem_url} onChange={(e) => setImagemUrl(e.target.value)} />
          <button type="button" onClick={EnviarDados}>Enviar</button>
        </section>
      </section>
    </section>
  );
}