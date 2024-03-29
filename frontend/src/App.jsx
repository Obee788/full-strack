import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router >
      <Navbar id="bgcolor" >
        <Container id="nav" >
          <Link to={"/"} className="navbar-brand text-white ">
        <div >   ລະບົບ ເພີ່ມ ລົບ ແກ້ໄຂຂໍ້ມູນ ໂດນຳໄຊ້ React & Laravel  
        </div>
          </Link>
        </Container>
      </Navbar>

      <Container className='mt-5'>
        <Row>
          <Col md={12}>
            <Routes>
              <Route exact path="/" element={<ProductList />} />
              <Route path="/product/create" element={<CreateProduct />} />
              <Route path="/product/edit/:id" element={<EditProduct />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  )
}

export default App
