import { useNavigate } from "react-router-dom";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useStore from "@/context/store";

const Home = () => {
  const signout = useSignOut();
  const logout = useStore((state) => state.logout); 
  const navigate = useNavigate();

  const handleLogout = () => {
    signout(); 
    logout();  
    navigate("/auth/sign-in");
  };

  return (
    <div>
      Home
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
