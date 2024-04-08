import React, { useEffect, useState } from 'react'
import "./style.css"
import Category from './components/Category'
import Header from './components/Header'
import PostForm from './components/PostForm'
import PostsList from './components/PostsList'
import { initialPosts } from './data'
import supabase from './supabase'
import Loader from "./components/Loader"
import Pagination from './components/Pagination'


const App = () => {
 const [showForm, setShowForm] = useState(false);
 const [posts, setPosts] = useState([]);
 const [isLoading, setIsLoading] =  useState(false)
 const [currentPage, setCurrentPage] = useState(1)
 const [postsPerPage, setPostsPerPage] = useState(5)
 const[currentCategory, setCurrentCategory] = useState("all")
  
// supabase data fetching 
 useEffect(function(){
  async function getJobs(){
    setIsLoading(true);    

    let query = supabase.from('posts').select('*');
    if(currentCategory != 'all'){
      query=query.eq("category", currentCategory);
    }

    const { data: posts, error } = await query
    .order('votesLiked', {ascending: false})
    .limit(15);

    if(!error){
      setPosts(posts);
    } else{
      alert("There is a connectivity problem getting data!");
    }
    
    setIsLoading(false);

  }
    getJobs();
  
  }, [currentCategory]);

//  open close form function
 const openForm = ()=>{
  setShowForm((show)=>!show)
 }
 
//  pagination
 const lastPostIndex = currentPage * postsPerPage;
 const firstPostIndex = lastPostIndex - postsPerPage;
 const currentPost = posts.slice(firstPostIndex, lastPostIndex);



  return (
    <>
      <div className="container">

        
        <Header appTitle = 'Trending Jobs' showForm={showForm} 
          openForm={openForm}/>

        {showForm ? <PostForm  setPosts={setPosts} setShowForm={setShowForm} /> : null }
        
        <main className="main">
          
        <Category setCurrentCategory={setCurrentCategory}/>

        {isLoading ? <Loader/> : <PostsList posts={currentPost} setPosts={setPosts}  /> }
          
          {/* <PostsList posts={posts}  /> */}
          

        </main>
        <Pagination 
            totalPosts={posts.length} 
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            />



      </div>
    </>
  )
}






export default App

