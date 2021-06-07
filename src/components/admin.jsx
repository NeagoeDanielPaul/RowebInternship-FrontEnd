import React, {useState, useEffect} from 'react';
import Api from '../Api'
import Table from "react-bootstrap/Table";
import FormModal from './modals/formModal';
import DeleteModal from './modals/deleteModal';
import Button from 'react-bootstrap/Button';
import UpdateModal from './modals/updateModal';
import AddProductModal from './modals/addProductModal';
import DeleteProductModal from './modals/deleteProductModal';
import EditProductModal from './modals/editProductModal';
import TablePagination from '@material-ui/core/TablePagination';

const Admin = (props) => {
    const [categories, setCategory] = useState([]);
    const [show, setShow] = React.useState(false);
    const [updateList, setUpdateList] = useState(false); 
    useEffect(() => { setCategory(props.categories)}, [props]);

    props.updateList(updateList);


    const [products, setProduct] = useState([]);
    const [currentCategoryId, setCurrentCategoryId] = useState();
    const [currentProductId, setCurrentProductId] = useState();

    useEffect(() => {Api.ProductRepository.allProducts().then((x) => setProduct(x));}, [updateList]);

    function openModal(id) {
        setShow(id);
    }

    function closeModal(){
        setShow(0);
    }

  


  return (
    <div>
        <h1>Categories</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th style={{textAlign: "right"}}><Button variant="outline-secondary" onClick={()=>{openModal(1)}}>Add New</Button></th>
            <FormModal show={show} closeModalHandler={closeModal} updateList={(x)=>{setUpdateList(x)}} shouldUpdateList={updateList} />
          </tr>
        </thead>
        <tbody>
            {categories.map((x)=>(
                <tr>
                <td>{x.categoryId}</td>
                <td>{x.name}</td>
                <td>{x.description}</td>
                <td style={{textAlign: "right"}}>
                    <Button variant="outline-secondary" onClick={()=>{setCurrentCategoryId(x.categoryId); openModal(3);}}>Edit</Button> 
                    <Button variant="outline-danger" onClick={()=>{setCurrentCategoryId(x.categoryId); openModal(2)}}>Delete</Button>
                </td>
              </tr>
            ))}
            
            <DeleteModal show={show} closeModal={closeModal} idDeleted={currentCategoryId} categories={categories} updateList={(x)=>{setUpdateList(x)}}></DeleteModal>
            <UpdateModal show={show} closeModalHandler={closeModal} idUpdated={currentCategoryId} categories={categories} updateList={(z)=>{setUpdateList(z)}}></UpdateModal>
        </tbody>
      </Table>

      <h1>Products</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category Id</th>
            <th style={{textAlign: "right"}}><Button variant="outline-secondary" onClick={()=>openModal(4)}>Add New</Button></th>
            <AddProductModal show={show} products={products} categories={categories} updateList={(x)=>{setUpdateList(x)}} closeModalHandler={closeModal}></AddProductModal>
          </tr>
        </thead>
        <tbody>
          {products.map((x)=>(
            <tr>
            <td>{x.productId}</td>
            <td>{x.name}</td>
            <td>{x.description}</td>
            <td>{x.price}</td>
            <td>{x.ctId}</td>
            <td style={{textAlign: "right"}}>
              <Button variant="outline-secondary" onClick={()=>{setCurrentProductId(x.productId); openModal(6)}}>Edit</Button>
              <Button variant="outline-danger" onClick={()=>{setCurrentProductId(x.productId); openModal(5)}}>Delete</Button>
            </td>
          </tr>
          ))}
          <DeleteProductModal show={show} closeModal={closeModal} productId={currentProductId} updateList={(x)=>{setUpdateList(x)}}></DeleteProductModal>
          <EditProductModal show={show} closeModal={closeModal} products={products} updatedId={currentProductId} updateList={(x)=>{setUpdateList(x)}}></EditProductModal>
        </tbody>
      </Table>
      {/* <TablePagination component="div" page={3} count={products.length} rowsPerPage={3} rowsPerPageOptions={[2,4,6]}>
      </TablePagination> */}
    </div>
  );
};

export default Admin;
