import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';



import Main from './Pages/Main';
import Personagens from './Pages/Personagens';
import Objetos from './Pages/Objetos';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/Personagens" component={Personagens} />
                <Route path="/Objetos" component={Objetos} />
            </Switch>       
        </BrowserRouter>
    );
};

export default Routes;