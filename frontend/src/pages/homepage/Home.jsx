import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../../components/Productscard/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:4000/api/products/getproducts')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handleAddButtonClick = () => {
    setShowAddForm(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:4000/api/products/addnewproduct', newProduct)
      .then(response => {
        console.log('Product added successfully:', response.data);
        fetchProducts(); 
        setShowAddForm(false); 
        setNewProduct({
          name: '',
          price: '',
          description: '',
        });
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <div className="container">

      {showAddForm ? (
        <div className="mt-4">
          <h2>Add New Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      ) : (
        <div className="mt-4 text-center">
          <button className="btn btn-dark" onClick={handleAddButtonClick}>Add Product</button>
        </div>
      )}

      <div className="row mt-4">
      <h3 className='text-center mb-4'>Products</h3>
        {products.map(product => (
          <ProductCard key={product._id} product={product} fetchProducts ={fetchProducts}/>
        ))}
      </div>
    </div>
  );
};

export default Home;
