
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Container} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import {Home,ProductDetail,Cart} from "./pages/";

function App() {
  return (
    <Router>
      <Header/>
      <main className="py-4">
        <Container>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/product/:id' element={<ProductDetail/>}></Route>
            <Route path='/cart/:id' element={<Cart/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
          </Routes>
        </Container>
        
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
