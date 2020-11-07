import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PokeListPage from './routes/PokeListPage';
import NotFoundPage from './routes/NotFoundPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={PokeListPage}/>
        <Route path='*' component={NotFoundPage}/>
      </Switch>
    </Router>
  );
}

export default App;
