import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Api from "../../Api";
import Button from "react-bootstrap/Button";
import '../../App.css'

const FormModal = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  props.updateList(true);

  const category = {
    name: name,
    description: description,
  };
  function addCategory() {
    Api.AdminRepository.addCategory(category);
    props.closeModalHandler();
    props.updateList(false);
  }

  return (
    
    <Modal className="modal" show={props.show === 1 ? true : false}>
      <Modal.Header>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>

      <Modal.Body class="modal-body">
      <label>Cateogry Name:</label>
      <input
        type="text"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <br></br>
      <label>Cateogry Description:</label>
      <input
        type="text"
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={addCategory}>
          Add Category
        </Button>
        <Button variant="danger" onClick={props.closeModalHandler}>
          Close
        </Button>
      </Modal.Footer>

      {/* <label>Cateogry Name:</label>
      <input
        type="text"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <label>Cateogry Description:</label>
      <input
        type="text"
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      <button onClick={addCategory} variant="primary">
        Add Category
      </button>
      <button onClick={closeModalHandler} variant="secondary">
        Close
      </button> */}
    </Modal>
  );
};

export default FormModal;
