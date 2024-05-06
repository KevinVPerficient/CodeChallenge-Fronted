import './App.css';
import { Index } from './components/Index';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './main.css';
import Clients from './components/Clients';
import Branches from './components/Branches';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Index}></Route>
        <Route path="/clients" Component={Clients}></Route>
        <Route path="/branches" Component={Branches}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
