import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { listProductDetails } from '../actions/productActions';

function ProductEditScreen({ match, history }) {

    const productId = match.params.id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);  // 0 by default
    const [image, setImage] = useState('');
    const [seller, setSeller] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { error, loading, product } = productDetails;

    useEffect(() => {

        if (!product.name || product._id !== Number(productId)) {
            dispatch(listProductDetails(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setSeller(product.seller)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }

    }, [dispatch, product, productId, history]);

    const submitHandler = (e) => {
        e.preventDefault();
        // Update product
    };

    return (
        <div>

            <Link to='/admin/productList'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>

                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='name' className='py-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price' className='py-3'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='price'
                                placeholder='Enter Price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image' className='py-3'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='image'
                                placeholder='Enter Image'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock' className='py-3'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='countInStock'
                                placeholder='Enter Stock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category' className='py-3'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='category'
                                placeholder='Enter Category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description' className='py-3'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='description'
                                placeholder='Enter Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <div className='py-3'>
                            <Button type='submit' variant='primary'>Update</Button>
                        </div>

                    </Form>
                )}

            </FormContainer>
        </div>
    )
}

export default ProductEditScreen;
