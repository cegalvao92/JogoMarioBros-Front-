import React from "react";
import { Link } from 'react-router-dom';
import "../../App.css"

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      objetos: [],
      nomeObjeto: "",
      imagemUrlObjeto: "",
      editando: false,
      indexEditando: null,
    };
  }

  async buscarObjetos() {
    this.setState({ loading: true });

    const res = await fetch("http://localhost:5000/objetos");

    const json = await res.json();

    this.setState({ objetos
      : json, loading: false });
  }

  componentDidMount() {
    this.buscarObjetos()
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const {
      objetos,
      editando,
      indexEditando,
      nomeObjeto,
      imagemUrlObjeto,
      idEditando,      
    } = this.state;

    if (editando) {
      await fetch(`http://localhost:5000/objetos/${idEditando}`,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nomeObjeto,
          imagemUrl: imagemUrlObjeto,
        }),
      });
      this.buscarObjetos();

      this.setState({
        indexEditando: null,
        editando: false
      });
    } else {
      await fetch(`http://localhost:5000/objetos`, {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nomeObjeto,
          imagemUrl: imagemUrlObjeto,
        }),
      });
      this.buscarObjetos();

    }

    this.setState({
      nomeObjeto: "",
      imagemUrlObjeto: "",
    });
  };

  deletar = async (idDeletar) => {
    await fetch(`http://localhost:5000/objetos/${idDeletar}`, {
      method: "DELETE",
    });
    this.buscarObjetos();
  };

  render() {
    const { objetos, nomeObjeto, imagemUrlObjeto, editando, indexEditando } =
    this.state;

    return (
      <div className="container">
        <main className="main">
          <h1>Objetos</h1>
          <hr />
          <h2>
            {editando
              ? `Editando:${objetos[indexEditando].nome}`
              : "Cadastre um novo objeto"}
          </h2>
          <form onSubmit={this.onSubmit}>
            <input
            placeholder="Nome"
            value={nomeObjeto}
            onChange={(e) => {
              this.setState({
                nomeObjeto: e.target.value,
              });
            }}
            />
            <br />

            <input
              placeholder="Url da Imagem"
              value={imagemUrlObjeto}
              onChange={(e) => {
                this.setState({
                  imagemUrlObjeto: e.target.value,
                });
              }}
            />
            <br />

            <button type="submit">Salvar</button>
          </form>
          <hr />
          <h2>Objetos Adicionados</h2>
          <ul>
              {objetos.map((f, index) => (
                <li key={index}>
                  <h3>{f.nome}</h3>
                  <img src={f.imagemUrl} alt={f.nome} />
                  <br />
                  <button onClick={() => this.deletar(index)}>Deletar</button>
                  <br />
                  <button
                    onClick={() => {
                      this.setState({
                        idEditando: f._id,
                        editando: true,
                        indexEditando: index,
                        nomeObjeto: f.nome,
                        imagemUrlObjeto: f.imagemUrl,
                      });
                    }}
                  >
                    Editar
                  </button>
                </li>
              ))}
          </ul>
          <Link to ="/" className="voltar">Voltar</Link>
        </main>
      </div>
    );
  }
}







  