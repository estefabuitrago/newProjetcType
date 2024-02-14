import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { navigate } from './navigate';
import { navigate2 } from './navigate/navigate2';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {navigate.map((item,index)=>(
            <Route path={item.path} element={item.component} />
          ))}
          {navigate2.map((item,index)=>(
            <Route path={item.path} element={item.component} />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
