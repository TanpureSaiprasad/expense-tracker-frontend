import { Link, useNavigate } from "react-router-dom";
import "../../Styles/auth.css";
import { useState } from "react";
import { loginUser } from "../../apiServices/authService";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import Loder from "../../Components/Loder";


function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "" });
  const [form, setForm] = useState({ email: "", password: "" });

   // validation functions for email
  const ValidateEmail = (value) => {
     if (!value) {
      setError({ ...error, email: "Email is required" });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError({ ...error, email: "Please enter a valid email address" });
    } else {
      setError({ ...error, email: "" });
    }
  }

  const hasError = error.email !== "" || email === "" || password === "";

  const handleLogin = async(e) => {
    e.preventDefault();
    // const user = { email, password };
    // console.log(user);
    
    try {
      setLoading(true); // start loader
      const data = await loginUser(form);
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message || "Login failed");
    }finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <>
      {loading && <Loder />}
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value); ValidateEmail(e.target.value); setForm({...form, email: e.target.value})}}required />
          {error.email && (
              <span className="error-text">{error.email}</span>
            )}
        
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
                setForm({ ...form, password: e.target.value });
              }}
              required
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" disabled={hasError}>Login</button>
        </form>
        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
