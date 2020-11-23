// import './App.css';
import { Fragment } from 'react';
import { Redirect, Switch, Route } from "react-router-dom";
import { Header } from './partials/Header';
import { MyCards } from './pages/MyCards';
import { EditCard } from './pages/EditCard';



function App() {
  return (
    <Fragment>
        <Header />
        <main className='container'>
          {
			<Switch>
				<Route exact path='/cards/add' component={EditCard} />
				<Route exact path='/cards' component={MyCards} />
				<Route 
					exact 
					path='/cards/:id/edit' 
					render={(props) => (
						<EditCard {...props} updateMode={true} />
					)} 
				/>
				<Redirect path="/" to="/cards" />
			</Switch>
          }
        </main>
      </Fragment>
  );
}

export default App;
