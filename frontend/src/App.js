import {Routes, Route} from 'react-router-dom';
import Home from './pages/homepage/Home';
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
