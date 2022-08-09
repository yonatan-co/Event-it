import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbars/AuthNavbar";

function LoginPage() {
  return (
    <div className="login-page">
      <Navbar />
      <LoginForm />
    </div>
  );
}

export default LoginPage;
