import { useCallback} from 'react'
import { NavLink } from "react-router-dom";
import { useToken } from './Componenten/context/tokenHook';
import './header.css'

function App() {
  const [token, setAuthToken] = useToken();

const handleLogout = useCallback(() => {
  setAuthToken("Null");
}, [setAuthToken]);

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
              <li><button onClick={handleLogout}>Logout</button></li>
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
