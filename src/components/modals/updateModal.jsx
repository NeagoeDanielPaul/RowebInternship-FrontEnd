import  Modal  from 'react-bootstrap/Modal';
import React, {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Api from '../../Api';
import Button from 'react-bootstrap/Button'

const UpdateModal = (props) =>{
    const [categories, setCategory] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const id = props.idUpdated;

    useEffect(() => { 
        setCategory(props.categories); 
    }, [props]);

    let selectedCategory  = categories.filter((x)=>x.categoryId === id);
    props.updateList(true);



    const category = {
        name: name,
        description: description
    }
    function updateCategory(){
        Api.AdminRepository.updateCategory(id,category);
        props.closeModalHandler();
        props.updateList(false);
        console.log(props.categories);
    }
    
    function currentName(){
        if(id === undefined){
            return {
                name:'',
                description: ''
            };
        }
        return {
            name : selectedCategory[0] === undefined ? '' : selectedCategory[0].name,
            description : selectedCategory[0] === undefined ? '' : selectedCategory[0].description,
            id: id
        }
    }



    return (
        
        <Modal show={props.show === 3 ? true : false}>
            <Modal.Header>
                <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <label>Cateogry Name:</label>
            <input type="text" defaultValue={currentName().name} onChange={(event)=>{
                setName(event.target.value);
            }}/>
            <label>Cateogry Description:</label>
            <input type="text" defaultValue={currentName().description} onChange={(event)=>{
                setDescription(event.target.value);
            }}/>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={updateCategory} variant="secondary">Update Category</Button>
            <Button onClick={()=>{props.closeModalHandler()}} variant="danger">Close</Button>
            </Modal.Footer>
        </Modal>
        
    );
}

export default UpdateModal;