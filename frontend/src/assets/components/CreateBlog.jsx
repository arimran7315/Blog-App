import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import Editor from 'react-simple-wysiwyg'
import { toast } from 'react-toastify';

const CreateBlog = () => {
    const [description, setDescription] = useState('');
    const [imageId, setImageId] = useState('');
    function onChange(e) {
        setDescription(e.target.value);
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const ImageChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        const response = await fetch('http://localhost:8000/api/temp_image', {
            method: 'POST',
            body: formData
        });
        const result = response.json();
        result.then(data => {
            // Check if the status is true
            if (data.status === true) {
                // Log the image ID
                console.log(data.image.id);

                // Optionally, you can set the image ID somewhere if needed
                setImageId(data.image.id);
            } else {
                // Handle error case and display the error message
                alert(data.errors.image);
                e.target.value = null;  // Clear the input in case of error
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    }

    const formSubmit = async (data) => {
       
        // Capture the description from state
        const values = { ...data, 'description': description, 'imageId': imageId };
        
        const res = await fetch('http://localhost:8000/api/createBlog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        });
        console.log(res.json());
        toast("BLog Added Successfully.");
        navigate('/');
    }

    return (
        <>
            <div className="bg-dark py-2 text-center shadow-lg">
                <h2 className='text-white'>
                    React Laravel Blog App
                </h2>
            </div>
            <div className="container my-5">
                <div className="d-flex justify-content-between mb-4">
                    <h4>Create Blog</h4>
                    <a href="/" className='btn btn-dark'>Back</a>
                </div>
                <div className="row">
                    <div className="card shadow-lg border-0">
                        <form onSubmit={handleSubmit(formSubmit)}>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label htmlFor="" className='form-label'>Title</label>
                                    <input
                                        {...register('title', { required: true })}
                                        type="text"
                                        className={`form-control ${errors.title && 'is-invalid'}`}
                                        placeholder='Enter Title' />
                                    {errors.title && <p className='invalid-feedback'>Title is required</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className='form-label'>Short Description</label>
                                    <textarea
                                        {...register('short_description', { required: true })}
                                        cols="30" rows="3"
                                        className={`form-control ${errors.short_description && 'is-invalid'}`}
                                        placeholder='Enter short description'></textarea>
                                    {errors.short_description && <p className='invalid-feedback'>Short Description is required</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className='form-label'>Description</label>
                                    <Editor
                                        value={description}
                                        containerProps={{ style: { height: '400px' } }}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className='form-label'>Image</label> <br />
                                    <input type="file" onChange={ImageChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className='form-label'>Author</label>
                                    <input
                                        {...register('author', { required: true })}
                                        type="text"
                                        className={`form-control ${errors.author && 'is-invalid'}`}
                                        placeholder='Enter author' />
                                    {errors.author && <p className='invalid-feedback'>Author is required</p>}
                                </div>
                                <button className='btn btn-dark'>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateBlog;
