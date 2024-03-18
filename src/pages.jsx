import Log from "./Componenten/Login";
import { useLocation } from "react-router-dom";
import BestellingList from "./Componenten/pages/bestellingen/bestellinglist";
import BestellingInfoPagina from "./Componenten/pages/bestellingen/bestellingInfo";
import Producten from "./Componenten/pages/home/producten";
import { ProfielInfo } from "./Componenten/Profiel.jsx";
import ProductInfo from "./Componenten/pages/home/productInfo";
import NotificatieList from "./Componenten/pages/notificaties/notificatielist";
import NotificatieInfoPagina from "./Componenten/pages/notificaties/notificatieInfo";
import PrintPdf from "./Componenten/printpdf.jsx";

export const Home = () => {
  if (sessionStorage.getItem("roles") === "leverancier") {
    return (
      <div>
        <BestellingList />
      </div>
    );
  } else {
    return (
      <div>
        <Producten />
      </div>
    );
  }
};
export const ProductenList = () => (
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

export const Notificaties = () => {
  return (
    <div>
      <NotificatieList />
    </div>
  );
};

export const NotificatieInfoMeer = () => {
  return (
    <div>
      <NotificatieInfoPagina />
    </div>
  );
};

export const Profiel = () => {
  return (
    <div>
      <ProfielInfo />
    </div>
  );
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
