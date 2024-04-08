import "../style.css"
import {CATEGORIES} from "../data.js"

const Category = ({setCurrentCategory}) => {
  return (    
            <aside>
                <ul>
                <li className="category">
                        <button 
                            onClick={()=>setCurrentCategory("all")} 
                            className="btn btn-all-categories">
                                All
                        </button>
                    </li>
                    {
                        CATEGORIES.map((cat)=>

                        <li key={cat.name} className="category">
                        <button 
                            onClick={()=>setCurrentCategory(cat.name)}
                            className="btn btn-all-categories"
                            style={{backgroundColor:cat.color}}
                        >
                            {cat.name}
                        </button>
                    </li>

                        )
                    }                                                            
                    
                </ul>        
            </aside>
    
    
    
  )
}

export default Category