import {React, useEffect, useState} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/home';
import Admin from './components/admin';
import Sidebar from './components/sidebar'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './components/product';
import Api from './Api';

function App() {

  const [categories, setCategories] = useState([]);
  const [updateList, setUpdateList] = useState(false);

  useEffect(()=>{Api.CategoryRepository.all(0,25).then((x) => setCategories(x))},[updateList]);

  return (
    <BrowserRouter>
    <Container fluid>
      <Row>
        <Col lg={2}>
          <Sidebar attr1={1} attr2={2} categories={categories}/>
        </Col>
        <Col xs={12} lg={10}>
          <Switch>
            <Route
            exact
            path="/"
            render={(props) => <Home {...props} />}
            />
            <Route
            exact
            path="/admin"
            render={(props) => <Admin categories={categories} updateList={(z)=>{setUpdateList(z)}} {...props} />}
            />
            <Route
            exact
            path="/product/:id"
            render={(props) => <Product {...props} />}
            />
          </Switch>
        </Col>
      </Row>
    </Container>
    </BrowserRouter>
  );
}

export default App;
