import {
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useState, useEffect } from "react";
import { userSchemaValidation } from "../Validations/UserValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../Features/UserSlice"; // Import clearError action
import { useNavigate } from "react-router-dom";
import img from '../Images/6.jpeg';

const Register = () => {
  const { msg, user, isError, error } = useSelector((state) => state.users); // Include error and isError
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError && error) {
      alert(error); // Trigger an alert message if email is already registered
      dispatch(clearError()); // Clear error after displaying the alert
    }
  }, [isError, error, dispatch]);

  const onSubmit = (data) => {
    const userData = {
      name,
      email,
      password,
      confirmPassword,
    };

    dispatch(registerUser(userData))
      .unwrap()
      .then(() => {
        // Navigate to login on successful registration
        navigate('/login');
      })
      .catch((err) => {
        // Error handling for duplicate email or other registration errors
        console.error("Registration error:", err);
      });
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container fluid className="p-6 rounded shadow" style={{ maxWidth: "750px" }}>
        <form className="div-form w-100" onSubmit={handleSubmit(onSubmit)}>
          <h1>Register</h1>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name..."
              {...register("name", {
                onChange: (e) => setName(e.target.value),
              })}
            />
            <p className="error">{errors.name?.message}</p>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter your email..."
              {...register("email", {
                onChange: (e) => setEmail(e.target.value),
              })}
            />
            <p className="error">{errors.email?.message}</p>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password..."
              {...register("password", {
                onChange: (e) => setPassword(e.target.value),
              })}
            />
            <p className="error">{errors.password?.message}</p>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm your password..."
              {...register("confirmPassword", {
                onChange: (e) => setConfirmPassword(e.target.value),
              })}
            />
            <p className="error">{errors.confirmPassword?.message}</p>
          </div>
          <button type="submit" color="primary" className="button">
            Register
          </button>
        </form>

        <Row>
          <h3>{msg}</h3>
          <h3>{user?.name}</h3>
          <h3>{user?.email}</h3>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
