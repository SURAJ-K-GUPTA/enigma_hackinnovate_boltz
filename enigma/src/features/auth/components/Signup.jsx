import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createUserAsync, selectLoggedInUser } from "../authSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";

// Validation function
const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Confirm Password Must be Same";
  }

  return errors;
};

const Signup = () => {
  const formValues = {
    name: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <Container className="">
        <div className="signupPage">
          <div className="pagename">Signup</div>
          <div className="form">
            <Formik
              initialValues={formValues}
              validate={validate}
              onSubmit={async (values, { resetForm }) => {
                // Handle form submission here
                // Modify the values object before dispatching
                const modifiedValues = {
                  ...values,
                  role: "user",
                  addresses: [], // You can set default values or modify as needed
                };
                dispatch(createUserAsync(modifiedValues));
                console.log("Form submitted with values:", modifiedValues);
                resetForm();
              }}
            >
              <div className="form-container">
                <Form className="">
                  <div>
                    <label htmlFor="name">Name</label>
                    <Field
                    id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                    />
                    <ErrorMessage name="name" component="div" />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber">Mobile Number</label>
                    <Field
                    id="phoneNumber"
                      name="phoneNumber"
                      type="number"
                      placeholder="Enter your mobile number"
                    />
                    <ErrorMessage name="phoneNumber" component="div" />
                  </div>
                  <div>
                    <label htmlFor="password">Set Password</label>
                    <Field
                    id="password"
                      name="password"
                      type="password"
                      placeholder="Enter password"
                    />
                    <ErrorMessage name="password" component="div" />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field
                    id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Re enter same password"
                    />
                    <ErrorMessage name="confirmPassword" component="div" />
                  </div>
                  <div className="div-btn">
                    <button type="submit" className="btn">
                      Submit
                    </button>
                  </div>
                </Form>
              </div>
            </Formik>
          </div>
          <div className="link">
            <p className="">
              Already a Member?{" "}
              <Link to="/login" className="">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;

  .signupPage {
    border: 1px solid #000000;
    background-color: #f2e3e3;
    padding: 30px;
    margin: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 15px;

    .pagename {
      font-size: x-large;
      margin: 30px 0;
      color: #000000;
    }

    h4 {
      color: #555555;
    }

    .form {
      margin: 10px 0;

      .form-container {
        width: 100%;
        min-width: 30vw;

        div {
          margin: 10px 0;
          label {
            display: block;
            color: #000000;
            font-weight: bold;
          }

          input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-sizing: border-box;
            outline: none;

            &:focus {
              border-color: #000000;
            }
          }
        }

        .div-btn {
          display: flex;
          width: 100%;
          justify-content: center;
          margin-top: 20px;
        }

        .btn {
          cursor: pointer;
          user-select: none;
          background-color: #000000;
          color: #f2e3e3;
          padding: 10px 20px;
          border-radius: 10px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: #4a1f8c;
          }
        }
      }
    }

    .link {
      margin-top: 20px;

      p {
        color: #555555;
        font-size: 16px;

        a {
          color: #000000;
          text-decoration: none;
          font-weight: bold;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
`;

export default Signup;
