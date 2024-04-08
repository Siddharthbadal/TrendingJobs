import "../style.css"
import {CATEGORIES, EXPERIENCE} from "../data.js"
import { useState } from "react"
import supabase from "../supabase.js";


// check if url is correct
function isValidSource(str){
  let url;
  try{
    url = new URL(str);
  } catch (_){
    return false;
  }
  console.log('soruce is good.')
  return url.protocol === 'http:' || url.protocol === 'https:'
}


const PostForm = ({setPosts, setShowForm}) => {
  const [text, setText] = useState("")
  const [source, setSource] = useState("https://example.com")
  const [category, setCategory] = useState("")
  const [experience, setExperience] = useState(0)
  const textLength = text.length;
  

  const handleFormSubmit = async (e)=>{
    // prevent browser reload 
    e.preventDefault();
    // console.log(text, source, category, experience)

    // check if data is valid. 
    if(text && isValidSource(source) && category && experience && text.length <= 200){
      console.log("All fields inserted")

    }
    
    // create a new post object
    // const newPost = {
    //   d: Math.round(Math.random()*1000),
    //   text: text,
    //   source: source,
    //   category: category,
    //   experience: experience,
    //   votesInteresting: 0,
    //   votesMindblowing: 0,
    //   votesFalse: 0,
    //   createdIn: new Date().getFullYear(),
    // };



    //  upload post to supabase and receive a new object
    const {data: newPost, error} = await supabase.from("posts")
    .insert([{
      text, source, category, experience
    }]).select();
    console.log(newPost)
    // add the created post to the interface
    if(!error) setPosts((posts) => [newPost[0], ...posts]);

    // reset the input fields value to blank
    setText("")
    setSource("")
    setCategory("")
    setExperience("")

    //  close the form 
    setShowForm(false)






  }



  return (
    
    <form className="job-form" onSubmit={handleFormSubmit}>
    <input 
        type="text" 
        placeholder="Enter Description"
        value={text}
        onChange={(e)=> setText(e.target.value)}
    
    />
    <span className="text-length">
      {200 - textLength}
    </span>

    <input 
      type="text" 
      placeholder="Source Link"
      value={source}
      onChange={(e)=> setSource(e.target.value)}
      />
    
    <select value={category}
        onChange={(e)=> setCategory(e.target.value)}
    >
    <option value="">Tech </option>
        {CATEGORIES.map((cat)=> (
        <option key={cat.name} value={cat.name}>
          {cat.name.toUpperCase()} </option>
      
      ))}
    </select>

    <select value={experience}
        onChange={(e)=> setExperience(e.target.value)}    
    >
        <option value="">Exp </option>
        {
          EXPERIENCE.map((exp)=>(
            <option key={exp.year} value={exp.year}>
                {exp.year}
               </option>
          ))
        }
                              
    </select>

    <button className="btn btn-large post-btn">Post</button>
</form>
  )
}

export default PostForm