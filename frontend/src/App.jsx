import { BrowserRouter, Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./assets/components/Home";
import CreateBlog from "./assets/components/CreateBlog";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogDetail from "./assets/components/BlogDetail";
import BlogUpdate from "./assets/components/BlogUpdate";
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create-blog" element={<CreateBlog/>}/>
        <Route path="/blog-detail/:id" element={<BlogDetail/>}/>
        <Route path="/blog-update/:id" element={<BlogUpdate/>}/>
      </Routes>
      <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
