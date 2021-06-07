import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Api from "../../Api";
import Button from "react-bootstrap/Button";

const DeleteProductModal = (props) => {
    const closeModal = props.closeModal;

    function deleteProduct(){
        Api.ProductRepository.deleteProduct(props.productId);
        closeModal();
        props.updateList(false);
    }
  return (
    <Modal show={props.show === 5 ? true : false}>
      <Modal.Header >
        <Modal.Title>Delete Product</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to delete this product?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.closeModal}>Close</Button>
        <Button variant="danger" onClick={deleteProduct}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteProductModal;