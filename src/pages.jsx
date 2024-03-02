import Log from "./Componenten/Login";
import { useLocation } from "react-router-dom";
import BestellingList from "./Componenten/pages/bestellingen/bestellinglist";
import BestellingInfoPagina from "./Componenten/pages/bestellingen/bestellingInfo";
import Producten from "./Componenten/pages/home/producten";
import { KlantProfiel } from "./Componenten/KlantProfiel";
import { LeverancierProfiel } from "./Componenten/LeverancierProfiel";
import ProductInfo from "./Componenten/pages/home/productInfo";
export const Home = () => (
  <div>
    <Producten />
  </div>
);

export const Bestelling = () => {
  return (
    <div>
      <BestellingList />
    </div>
  );
};

export const BestellingInfo = () => {
  return (
    <div>
      <BestellingInfoPagina />
    </div>
  );
};

export const ProductInfoMeer = () => {
  return (
    <div>
      <ProductInfo />
    </div>
  );
};


export const Profiel = () => {
  const isKlant = localStorage.getItem("idKlant") !== null;

  return <div>{isKlant ? <KlantProfiel /> : <LeverancierProfiel />}</div>;
};

export const Login = () => {
  return (
    <div>
      <Log />
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
