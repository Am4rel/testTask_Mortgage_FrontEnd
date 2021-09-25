import React, {Component, lazy, Suspense} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './Components/Navigation';

import "./index.css"

const BankList = lazy(() => import("./Pages/bankList" /* webpackChunkName: "banks" */));
const AddBank = lazy(() => import("./Pages/addBank" /* webpackChunkName: "add-bank" */));
const EditBank = lazy(() => import("./Pages/editBank" /* webpackChunkName: "edit-bank" */));
const Calculator = lazy(() => import("./Pages/calculator" /* webpackChunkName: "calculator" */));
const Home = lazy(() => import("./Pages/Home" /* webpackChunkName: "home" */));
const BankPage = lazy(() => import("./Pages/bankPage" /* webpackChunkName: "bank-page" */));

class App extends Component {
  render() {
    return (
      <>
        <Navigation />

        <Suspense fallback="Loading...">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/banks" component={BankList} />
            <Route exact path="/banks/add" component={AddBank} />
            <Route exact path="/banks/:bankId/edit" component={EditBank} />
            <Route exact path="/banks/:bankId" component={BankPage} />
            <Route path="/calculator" component={Calculator} />
            <Redirect to="/" />
          </Switch> 
        </Suspense>
        
        
      </>
    );
  }
}

export default App;