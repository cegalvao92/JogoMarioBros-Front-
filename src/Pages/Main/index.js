import React from "react";
import { Link } from 'react-router-dom';













const Main = () =>{

    return (
      <div className="conteiner">
        
        <main className="main">
          <div className="header">  
            
              <h1>Jogo do Mario Kart</h1>
           
           
            
          </div>
         
        </main>
        
          <h2>Seja bem vindo ao Jogo do Mario Kart </h2>
        
        <div className="bloco_redireciona">
          <Personagens/>
          <Objetos/>
        </div>
      </div>
    );
}


const Personagens = () =>{
  return(

    <div className="img_personagem">
      <h2>Personagens</h2>
      <Link to="/personagens">
        <img src="https://i1.wp.com/www.multarte.com.br/wp-content/uploads/2019/03/super-mario-png19.png?fit=696%2C696&ssl=1" alt="personagens"/>
      </Link>
      
    </div>

  )
}

const Objetos = () =>{
  return(

    <div className="img_objeto">
      <h2>Objetos</h2>
      <Link to="/objetos" >
        <img src="https://www.pngkey.com/png/full/515-5153831_items-red-shell-mario-kart.png" alt="objetos"/>
      </Link>
      
    </div>

  )
}





export default Main;