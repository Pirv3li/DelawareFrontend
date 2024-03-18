import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './footer';



export default function Layout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: '1', padding: "15px 150px"}}>
        <Outlet />
      </div >
      <Footer />
    </div>
  );
}
