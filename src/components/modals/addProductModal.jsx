import  Modal  from 'react-bootstrap/Modal';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Api from '../../Api';
import { Card, FormFile } from 'react-bootstrap';
import Button from "react-bootstrap/Button";

const AddProductModal = (props) =>{
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [image, setImage] = useState('');
    const [ctId, setCtId] = useState('');
    const [products, setProducts] = useState([]);
    let lastId;

    useEffect(() => {setProducts(props.products); },[props]);
    props.updateList(true);
    const product = {
        name: name,
        description: description,
        price: price,
        basePrice: basePrice,
        ctId: ctId
    }
    const formData = new FormData();

    function addProduct(){
        Api.ProductRepository.addProduct(product).then((res)=>{
            lastId = res.productId;
            formData.append('body',image);
            Api.ProductRepository.uploadImage(lastId,formData);
            console.log(lastId);
        })
        printProducts();
        props.closeModalHandler();
        props.updateList(false);
    }
   

    function setFile(e){
        setImage(e.target.files[0]);
    }
    
    
    function printProducts(){
        console.log(image);
    }
    




    return (
        
        <Modal show={props.show === 4 ? true : false}>
            <Modal.Header>
                <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <label>Product Name:</label>
            <input type="text" onChange={(event)=>{
                setName(event.target.value);
            }}/>
            <label>Product Description:</label>
            <input type="text" onChange={(event)=>{
                setDescription(event.target.value);
            }}/>
            <label>Product Price:</label>
            <input type="text" onChange={(event)=>{
                setPrice(event.target.value);
            }}/>
            <label>Product Base Price:</label>
            <input type="text" onChange={(event)=>{
                setBasePrice(event.target.value);
            }}/>
            <label>Product Image:</label>
            <input type="file" onChange={(event)=>{
                setFile(event);
                console.log(image);
            }}/>
            <label>Category:</label>
            {/* <input type="text" onChange={(event)=>{
                setCtId(event.target.value);
            }}/> */}
            <select onChange={(event)=>{setCtId(event.target.value)}}>
            <option disabled selected value> -- select an option -- </option>
                {props.categories.map((x)=>(
                    <option value={x.categoryId}>{x.name}</option>
                ))}
            </select>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>{addProduct()}} >Add Product</Button>
            <Button variant="danger" onClick={()=>{props.closeModalHandler()}}>Close</Button>
            </Modal.Footer>
        </Modal>
        
    );
}

export default AddProductModal;