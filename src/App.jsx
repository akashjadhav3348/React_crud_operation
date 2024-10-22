import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Use Routes instead of Router
import Home from './componts/Home';
import Form from './componts/Form';
import Table from './componts/Table';
import Nav from './componts/Nav';

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addRecord" element={<Form />} />
          <Route path="/showRecords" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
