import "../style.css"

const Header = ({appTitle, openForm, showForm}) => {
    

  return (

    <header className='header'>
          <div className="logo">
            <img src="logo.png" height='68' width='68' alt="Trending Jobs" />
            <h1>{appTitle}</h1>
          </div>

          <button onClick={openForm}
           className="btn btn-large form-btn">
            {showForm ? 'Close' : 'Add A Job'}

           </button>
    </header>
  )
}

export default Header