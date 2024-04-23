import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loginUserAsync,
  selectLoggedInUser,
  selectLoginError,
} from "../authSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";

// Validation function
const validate = (values) => {
  const errors = {};
  if (!values.phoneNumber) {
    errors.phoneNumber = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

const Login = () => {
  const formValues = {
    phoneNumber: "",
    password: "",
  };
  const dispatch = useDispatch();
  const loginError = useSelector(selectLoginError);
  const user = useSelector(selectLoggedInUser);
  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <Container className="">
        <div className="loginPage">
          <div className="pagename">Login</div>
          <div className="form">
            {loginError && <div className="error">{loginError.error}</div>}
            <Formik
              initialValues={formValues}
              validate={validate}
              onSubmit={async (values, { resetForm }) => {
                // Handle form submission here
                // Modify the values object before dispatching
                const modifiedValues = {
                  ...values,
                };
                dispatch(loginUserAsync(modifiedValues));
                console.log("Form submitted with values:", modifiedValues);
                resetForm();
              }}
            >
              <div className="form-container">
                <Form className="">
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
                    <label htmlFor="password">Password</label>
                    <Field
                    id="password"
                      name="password"
                      type="password"
                      placeholder="Enter password"
                    />
                    <ErrorMessage name="password" component="div" />
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
              Not a Member?{" "}
              <Link to="/signup" className="">
                Sign Up
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

  .loginPage {
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
export default Login;
