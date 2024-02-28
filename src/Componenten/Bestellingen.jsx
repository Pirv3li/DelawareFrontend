import { useNavigate } from 'react-router';

function HomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/catalogus')
  }


  return (
    <div >
      <h1>bestellingen</h1>
   </div>
  );
}

export default HomePage;
