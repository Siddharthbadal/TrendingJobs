import "../style.css"
import {initialPosts} from '../data.js'
import Post from "./Post.jsx";
import { useState } from "react";

;

const PostsList = ({posts, setPosts}) => {

    // const posts = initialPosts;  
    if (posts.length ===0){
      return (
        <p className='message'>There are no jobs in this category!</p>
      )
    }
    

  return (
    <section>

        <ul className="posts-list">
            {posts.map((post)=>(
                <Post post={post} setPosts={setPosts} key={post.id}/>
            ))}

            <p>There are {posts.length} jobs on this page.</p>

        </ul>
    </section>
  )
}

export default PostsList