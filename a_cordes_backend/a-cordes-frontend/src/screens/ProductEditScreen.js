import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

function ProductEditScreen({ match, history }) {

    const productId = match.params.id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);  // 0 by default
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { error, loading, product } = productDetails;

    const productUpdate = useSelector(state => state.productUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate;

    useEffect(() => {

        if (successUpdate) {

            dispatch({
                type: PRODUCT_UPDATE_RESET,
            })
            history.push('/admin/productList')

        } else {

            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }

        }

    }, [dispatch, product, productId, history, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            category,
            countInStock,
            description,
        }))
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try {
            const config = {
                headers : {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('/api/products/upload/', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>

            <Link to='/admin/productList'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>

                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

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

                            <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                            >
                            </Form.File>
                            {uploading && <Loader/>}

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
