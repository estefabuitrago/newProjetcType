import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { navigate } from './navigate';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {navigate.map((item,index)=>(
            <Route path={item.path} element={item.component} />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
