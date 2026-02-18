import { Link, useNavigate } from "react-router-dom";
import "../../Styles/auth.css";
import { useState } from "react";
import { registerUser } from "../../apiServices/authService";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Register() {

    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(""); 
    const [form, setForm] = useState({ email: "", password: "", name: "" });
    const [error, setError] = useState({ email: "", name: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
  
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

     // validation functions for name 
  const ValidateName = (value) => {
    if (!value.trim()) {
      setError({ ...error, name: "Name is required" });
    } else if (!/^[A-Za-z ]+$/.test(value)) {
      setError({ ...error, name: "Name must contain only letters" });
    } else if (value.length < 3) {
      setError({ ...error, name: "Name must be at least 3 characters" });
    } else {
      setError({ ...error, name: "" });
    }
  }

    const hasError = error.email !== "" || error.name !== "" || error.password !== "" || email === "" || password === "" || name === "";


    const handleSubmit = async(e) => {

      console.log(form);
      
        e.preventDefault();
        try{
          await registerUser(form);
          toast.success("Registration successful. Please login.");
          navigate("/login");
        }catch(error){
          toast.error(error.response.data.message);
        }
    }
  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => {setName(e.target.value); ValidateName(e.target.value); setForm({...form, name: e.target.value});}} required />
        {error.name && (
            <span className="error-text">{error.name}</span>
        )}

        <input type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value); ValidateEmail(e.target.value); setForm({...form, email: e.target.value});}} required />
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
                      e.target.value.length >= 6 ? setError({...error, password: ''}) : setError({...error, password: 'Password must be at least 6 characters long'});
                    }}
                    required
                  />
        
                  <span
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>
        {error.password && (
            <span className="error-text">{error.password}</span>
        )}

        <button type="submit" disabled={hasError}>Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
