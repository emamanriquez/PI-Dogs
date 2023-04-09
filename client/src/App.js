import './App.css';
import Sidebar from './components/sidebar/sidebar';
import Home from './pages/home/home';
import landingPage from './pages/landingPage/landingPage'
import dogDetail from './pages/dogDetail/dogDetail';
import { BrowserRouter, Switch, Route, } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Sidebar />
      <Switch>
      <Route path="/" component= { landingPage } />
      <Route path="/home" component= { Home } />
      <Route path="/dog/:id" component={ dogDetail } />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
