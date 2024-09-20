import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const fetchBlogs = async () => {
        const response = await fetch('http://localhost:8000/api/blogs');
        const result = await response.json();
        setBlogs(result.blogs);
        // console.log(result.blogs);
    }
    const searchBlogs = async (e) => {
        const search = e.target.value;
        const response = await fetch('http://localhost:8000/api/blogs?search='+search,{
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        const result = await response.json();
        setBlogs(result.blogs);
        console.log(blogs);
    }
    useEffect(() => {
        fetchBlogs();
    },[]);
   
    return (
        <>
            <div className="bg-dark py-2 text-center shadow-lg">
                <h2 className='text-white'>
                    React Laravel Blog App
                </h2>
            </div>
            <div className="container justify-content-end my-2">
                <div>
                <input type="search" className='form-control w-25' placeholder='Search Blog' onChange={searchBlogs}/>
                </div>
            </div>
            <div className="container mt-5">
                <div className="d-flex justify-content-between mb-4">
                    <h4>Blogs</h4>
                    <a href="/create-blog" className='btn btn-dark'>Create</a>
                </div>
                <div className="row">
                    {
                        (blogs) && blogs.map((blog) => {
                            return (<BlogCard blog={blog} key={blog.id} blogs={blogs} setBlogs={setBlogs}/>)
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Home