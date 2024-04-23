import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loginSellerAsync,
  selectLoggedInSeller,
  selectLoginError,
} from "../authSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";

// Validation function
const validate = (values) => {
  const errors = {};
  if (!values.contact) {
    errors.contact = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

const Login = () => {
  const formValues = {
    contact: "",
    password: "",
  };
  const dispatch = useDispatch();
  const loginError = useSelector(selectLoginError);
  const seller = useSelector(selectLoggedInSeller);
  return (
    <>
      {seller && <Navigate to="/Shopkeeper" replace={true}></Navigate>}
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
                dispatch(loginSellerAsync(modifiedValues));
                console.log("Form submitted with values:", modifiedValues);
                resetForm();
              }}
            >
              <div className="form-container">
                <Form className="">
                  <div>
                    <label htmlFor="contact">Mobile Number</label>
                    <Field
                    id="contact"
                      name="contact"
                      type="number"
                      placeholder="Enter your mobile number"
                    />
                    <ErrorMessage name="contact" component="div" />
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
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .loginPage {
    border: 1px solid black;

    padding: 30px;
    margin: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    .pagename {
      font-size: x-large;
      margin: 30px 0;
    }
    .form {
      margin: 10px 0;
      .form-container {
        div {
          margin: 10px 0;

          label {
            display: block;
          }
        }

        .div-btn {
          display: flex;
          width: 100%;
          justify-content: center;
          .btn {
            cursor: pointer;
            seller-select: none;
            background-color: #6933d3;
            color: #f2e3e3;
            padding: 6px;
            border-radius: 10px;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .error {
        color: red;
        text-align: center;
      }
    }
  }
`;
export default Login;
