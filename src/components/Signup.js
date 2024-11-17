import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
// imports for Firestore
import { getFirestore, collection, addDoc } from 'firebase/firestore';
//import app from firebase.js' export app
//The app variable is usually the instance of Firebase application, created by calling initializeApp with Firebase configuration object.
import app from "../firebase";

// Initialize Firestore
const db = getFirestore(app);

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  // additional attributes
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      //This line calls the signUp function (useUserAuth) 
      //that wraps around Firebase Authentication's method 
      //to create a new user account with an email and password.
      const userCredential = await signUp(email, password);
      //extracts the user object from userCredential.
      // The user object includes several properties about the 
      //user who has just signed up, such as uid (a unique identifier for the user), email, and other details.
      const user = userCredential.user;

      // Add user details to Firestore
      await addDoc(collection(db, "users"), {
        userID: user.uid,
        email: user.email,
        fullName,
        userName,
        phoneNumber,
        gender,
        address,
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Auth Signup</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3" controlId="formBasicFullName">
          <Form.Control
            type="text"
            placeholder="Full Name"
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUserName">
          <Form.Control
            type="text"
            placeholder="User Name"
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Control
            type="number"
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicGender">
          <Form.Control
            type="text"
            placeholder="Gender"
            onChange={(e) => setGender(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Control
            type="text"
            placeholder="Delivery Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Sign up
            </Button>
          </div>
        </Form>
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </>
  );
};

export default Signup;
