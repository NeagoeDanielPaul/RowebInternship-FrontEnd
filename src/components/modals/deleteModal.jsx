import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Api from "../../Api";
import Button from "react-bootstrap/Button";

const DeleteModal = (props) => {
  
  function deleteCategory(){
    Api.AdminRepository.deleteCategory(props.idDeleted);
    props.updateList(false);
    props.closeModal();
  }
  return (
    <Modal show={props.show === 2 ? true : false}>
      <Modal.Header >
        <Modal.Title>Delete Category</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to delete this category?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.closeModal}>Close</Button>
        <Button variant="danger" onClick={deleteCategory}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
