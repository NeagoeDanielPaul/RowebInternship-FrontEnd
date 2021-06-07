import  Modal  from 'react-bootstrap/Modal';
import React, {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Api from '../../Api';
import Button from 'react-bootstrap/Button';

const EditProductModal = (props) => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [image, setImage] = useState('');
    const [ctId , setCtId] = useState('');
    const id = props.updatedId;
    let selectedProduct = products.filter((x) => x.productId === id);
    props.updateList(true);

    useEffect(() => {setProducts(props.products)},[props]);


    const product = {
        name : name,
        description: description,
        price : price,
        basePrice : basePrice,
        ctId : ctId
    };

    function updateProduct(){
        Api.ProductRepository.updateProduct(props.updatedId,product);
        props.closeModal();
        updateImage();
        props.updateList(false);
    }

    function updateImage(){
        const formData = new FormData();
        formData.append('body',image);
        Api.ProductRepository.uploadImage(props.updatedId,formData);
    }

    function setValue(){
        if(id===undefined){
            // console.log('ID ' + id);
            return '';
        }
        // console.log('ID: ' + id);
        const formData = new FormData();
        formData.append('body', selectedProduct[0].image);
        return {
            name : selectedProduct[0].name,
            description : selectedProduct[0].description,
            price: selectedProduct[0].price,
            basePrice: selectedProduct[0].basePrice,
            image: formData,
            ctId: selectedProduct[0].ctId
        }
    }

    function currentName(){
        if(id === undefined){
            return {
                name:'',
                description: '',
                price: '',
                base:'',
                image: '',
                ctId:'',
            };
        }

        return {
            name : selectedProduct[0] === undefined ? '' : selectedProduct[0].name,
            description : selectedProduct[0] === undefined ? '' : selectedProduct[0].description,
            price: selectedProduct[0] === undefined ? '' : selectedProduct[0].price,
            basePrice: selectedProduct[0] === undefined ? '' : selectedProduct[0].basePrice,
            image: selectedProduct[0] === undefined ? '' : selectedProduct[0].image,
            ctId: selectedProduct[0] === undefined ? '' : selectedProduct[0].ctId,
            id: id
        }
    }

    return (
        <Modal show={props.show === 6 ? true : false}>
            <Modal.Header>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <label>Product Name:</label>
            <input type="text" defaultValue={currentName().name}  onChange={(event)=>{
                setName(event.target.value);
            }}/>
            <label>Product Description:</label>
            <input type="text" defaultValue={currentName().description}  onChange={(event)=>{
                setDescription(event.target.value);
            }}/>
            <label>Product Price:</label>
            <input type="text" defaultValue={currentName().price} onChange={(event)=>{
                setPrice(event.target.value);
            }}/>
            <label>Product Base Price:</label>
            <input type="text" defaultValue={currentName().basePrice} onChange={(event)=>{
                setBasePrice(event.target.value);
            }}/>
            <label>Product Image:</label>
            <input type="file" onChange={(event)=>{
                setImage(event.target.files[0]);
                console.log(image);
            }}/>
            <label>Product Category:</label>
            <input type="text" defaultValue={currentName().ctId} onChange={(event)=>{
                setCtId(event.target.value);
            }}/>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={updateProduct} variant="primary">Update Category</Button>
            <Button onClick={()=>{props.closeModal();}} variant="secondary">Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditProductModal;