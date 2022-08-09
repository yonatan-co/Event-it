import Navbar from "../components/Navbars/AuthNavbar";
import SignupForm from "../components/SignupForm";

function SignupPage() {
  return (
    <div className="signup-page">
      <Navbar />
      <SignupForm />;
    </div>
  );
}

export default SignupPage;
