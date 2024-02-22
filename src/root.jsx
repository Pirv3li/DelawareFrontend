import { useState } from 'react'
import './index.css'

function App() {
  

  return (
    <>
      <div>
        <nav>
          <p>Delaware</p>
          <ul className='nav-links'>
            <li><NavLink to="/bestellingen">Bestellingen</NavLink></li>
            {token !== "null" ? (
              <>
              <li><NavLink to="/profiel">Profiel</NavLink></li>
              <li><button onClick={handeLogout}>Logout</button></li>
              </>
            ) : (
              <li><NavLink to="/login">Login</NavLink></li>
            )}
            <li></li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default App
