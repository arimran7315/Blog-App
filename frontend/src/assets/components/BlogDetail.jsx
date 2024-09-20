import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BlogCard from './BlogCard';
const BlogDetail = () => {
    const [blog, setBlog] = useState([]);
    const params = useParams();
    const fetchBlog = async () => {
        const response = await fetch('http://localhost:8000/api/blog/' + params.id);
        const result = await response.json();
        setBlog(result.blog);
        // console.log(result.blog);
    }
    useEffect(() => {
        fetchBlog();
    },[]);
    return (
        <>
            <div className="bg-dark py-2 text-center shadow-lg">
                <h2 className='text-white'>
                    React Laravel Blog App
                </h2>
            </div>
            <div className="container mt-5">
                <div className="d-flex justify-content-between mb-4">
                    <h2> {blog.title} </h2>
                    <div>
                        <a href="/" className='btn btn-dark'>Back to Blogs</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p>by <strong>{blog.author}</strong> by  on {blog.date} </p>
                        {
                            (blog.image) && <img src={`http://localhost:8000/uploads/blogs/${blog.image}`} alt="blog-image" className='w-75' />
                        }
                        <div className='mt-5' dangerouslySetInnerHTML={{__html: blog.description}} >

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogDetail