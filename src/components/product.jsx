import React, { useState, useEffect } from "react";
import Api from "../Api";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

const Product = (props) => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    Api.ProductRepository.all(props.match.params.id).then((x) => setProduct(x));
  }, [props]);

  return (
    <CardDeck className="d-flex p-4">
        {products.map((x)=>
        (
        <Card className=".card-info m-4"> 
        <Card.Img className="image" variant="top" src={`https://localhost:44304/Images/${x.image}`}/>
        <Card.Body>
          <Card.Title>{x.name}</Card.Title>
          <Card.Text>
            <p className="price">Price: ${x.price}</p>
            <p className="base-price">${x.basePrice}</p>
          </Card.Text>
        </Card.Body>

      </Card>
        ))}
    </CardDeck>
  );
};

export default Product;
