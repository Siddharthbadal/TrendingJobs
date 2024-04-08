import { CATEGORIES, EXPERIENCE } from "../data"
import supabase from "../supabase";


const Post = ({post, setPosts}) => {
    const categories = CATEGORIES
    const experience = EXPERIENCE


   async function handleVote(btnName){
    const {data: updatedLikedPost, error} = await supabase.from('posts')
    .update(
     {[btnName]: post[btnName] +1})
     .eq("id", post.id)
     .select();

     if(!error) setPosts((posts)=> posts.map((p)=>p.id === post.id ? updatedLikedPost[0] : p))
    }
   
  return (
    <>
        <li className="posts" >
                <p >
                    {post.text} 
                    <a className="source" href={post.source} target="_blank">[Source]</a>

                    <span className="tag" 
                        style={{
                            backgroundColor: categories.find((cat) => cat.name === post.category).color
                        }}
                    > 
                        #{post.category}
                                             
                     </span> 
                    <span className="exp"
                    // style={{
                    //     backgroundColor: experience.find((exe) => exe.year === post.experience).color
                    // }}
                    
                    >  {post.experience} Years</span>        
                            
                </p>
                <div className="vote-btns">
                    <button onClick={()=>handleVote('votesLiked')}
                    >👍 {post.votesLiked}
                    </button >
                    
                </div>
            </li>  
    
    </>
  )
}

export default Post