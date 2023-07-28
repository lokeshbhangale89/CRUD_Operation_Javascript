import React, { useState } from 'react';
import axios from 'axios';

const ProductCard = ({ product }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleDeleteProduct = () => {

    axios.delete(`http://localhost:4000/api/products/deleteproduct/${product._id}`)
      .then(response => {
        console.log('Product deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
      window.location.reload();
    };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdateProduct = () => {
    axios
      .put(`http://localhost:4000/api/products/editproduct/${product._id}`, updatedProduct)
      .then((response) => {
        console.log('Product updated successfully:', response.data);
        setIsEditing(false); 
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
      window.location.reload()
  };

  const handleCancelEdit = () => {
    setIsEditing(false); 
    setUpdatedProduct({ ...product });
  };

  return (
    <div className="col-md-4">
      <div className="card mb-4">
        <div className="card-body">
          {isEditing ? (
            <div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={updatedProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={updatedProduct.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  name="description"
                  value={updatedProduct.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-success" onClick={handleUpdateProduct}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">Price: ${product.price}</p>
              <p className="card-text">{product.description}</p>
              <div className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={handleEditButtonClick}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={handleDeleteProduct}>
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
