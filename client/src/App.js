import './App.css';
import Home from './pages/home/home';
import landingPage from './pages/landingPage/landingPage';
import DogDetail from './pages/dogDetail/dogDetail';
import { Route, Routes  } from "react-router-dom";
import About from './pages/About/about';
import createBreed from './pages/createBreed/createBreed';




function App() {
  
  

  return (
    <div className="App">
   
      
      <Routes>
      <Route path="/" Component= { landingPage } />
      <Route path="/home" Component= { Home } />
      <Route path="/dogs/:id" Component={ DogDetail } />
      <Route path="/create" Component= { createBreed } />
      <Route path="/About" Component= { About } />
      </Routes>
      
    
    </div>
  );
}

export default App;
