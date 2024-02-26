import HomePage from './Componenten/HomePage';
import Log from './Componenten/Login';
import Bestel from './Componenten/Bestellingen';
import Account from './Componenten/Profiel';
import Producten from './Componenten/pages/home/producten';
import { useLocation } from 'react-router-dom';

export const Home = () => (
  <div>
    <Producten/>
  </div>
);

// export const Product = () => (
//   <div>
//     <Producten/>
//   </div>
// )

export const Bestellingen = () => (
  <div>
    <Bestel/>
  </div>
);

export const Profiel = () => (
    <div>
      <Account/>
    </div>
)


export const Login = () => {
  return (
    <div>
      <Log/>
    </div>
  );
};

export const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <h1>Pagina niet gevonden</h1>
      <p>Er is geen pagina met als url {pathname}, probeer iets anders.</p>
    </div>
  );
};
