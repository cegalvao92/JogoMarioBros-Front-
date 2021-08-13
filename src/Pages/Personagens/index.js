import React from "react";
import { Link } from 'react-router-dom';
import "../../App.css"

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      personagens: [],
      nomePersonagem: "",
      imagemUrlPersonagem: "",
      editando: false,
      indexEditando: null,
    };
  }

  async buscarPersonagens() {
    this.setState({ loading: true });

    const res = await fetch("http://localhost:5000/personagens");

    const json = await res.json();

    this.setState({ personagens: json, loading: false });
  }

  componentDidMount() {
    this.buscarPersonagens()
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const {
      personagens,
      editando,
      indexEditando,
      nomePersonagem,
      imagemUrlPersonagem,
      idEditando,      
    } = this.state;

    if (editando) {
      await fetch(`http://localhost:5000/personagens/${idEditando}`,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nomePersonagem,
          imagemUrl: imagemUrlPersonagem,
        }),
      });
      this.buscarPersonagens();

      this.setState({
        indexEditando: null,
        editando: false
      });
    } else {
      await fetch(`http://localhost:5000/personagens`, {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nomePersonagem,
          imagemUrl: imagemUrlPersonagem,
        }),
      });
      this.buscarPersonagens();

    }

    this.setState({
      nomePersonagem: "",
      imagemUrlPersonagem: "",
    });
  };

  deletar = async (idDeletar) => {
    await fetch(`http://localhost:5000/personagens/${idDeletar}`, {
      method: "DELETE",
    });
    this.buscarPersonagens();
  };

  render() {
    const { personagens, nomePersonagem, imagemUrlPersonagem, editando, indexEditando } =
    this.state;

    return (
      <div className="container">
        <main className="main">
          <h1>Personagens</h1>
          <hr />
          <h2>
            {editando
              ? `Editando:${personagens[indexEditando].nome}`
              : "Cadastre um novo personagem"}
          </h2>
          <form onSubmit={this.onSubmit}>
            <input
            placeholder="Nome"
            value={nomePersonagem}
            onChange={(e) => {
              this.setState({
                nomePersonagem: e.target.value,
              });
            }}
            />
            <br />

            <input
              placeholder="Url da Imagem"
              value={imagemUrlPersonagem}
              onChange={(e) => {
                this.setState({
                  imagemUrlPersonagem: e.target.value,
                });
              }}
            />
            <br />

            <button type="submit">Salvar</button>
          </form>
          <hr />
          <h2>Personagens Adicionados</h2>
          <ul>
              {personagens.map((f, index) => (
                <li key={index}>
                  <h3>{f.nome}</h3>
                  <img src={f.imagemUrl} alt={f.nome} />
                  <br />
                  <button onClick={() => this.deletar(f._id)}>Deletar</button>
                  <button
                    onClick={() => {
                      this.setState({
                        idEditando: f._id,
                        editando: true,
                        indexEditando: index,
                        nomePersonagem: f.nome,
                        imagemUrlPersonagem: f.imagemUrl,
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














/*import React from "react";
import { Link } from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      personagens: [
        {
          name: "Mario",
          imagemUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzu_5rJIJEyz2T0AxmSvV3I4qiioHfyeiecA&usqp=CAU",
        },
        {
          name: "Luigi",
          imagemUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkzd1rx_wMLhljLJYE1ViBPyFUXQhfQbxnlg&usqp=CAU",
        },
        {
          name: "Peach",
          imagemUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6YDLIhSFgE1x5EIU45CplrKqUyCzP3mTkSA&usqp=CAU",
        },
        {
          name: "Daisy",
          imagemUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfWwDntYKB02sZYmzWD5B0LZophkIJlxb_1g&usqp=CAU",
        }
      ],
      
  }}

        

  render() {
      const { personagens } =
        this.state;

      return (
        <div className="container">
          <main className="main">
            <h1>Personagens</h1>
            <hr />
            
            
            <hr />
            
            <ul>
              {personagens.map((f, index) => (
                <li key={index}>
                  <h3>{f.name}</h3>
                  <img src={f.imagemUrl} alt={f.name} />
                  <br />
                  
                </li>
              ))}
            </ul>
            <Link to="/" className="botao">Voltar</Link>
          </main>
        </div>
      );
  }
}*/
  
