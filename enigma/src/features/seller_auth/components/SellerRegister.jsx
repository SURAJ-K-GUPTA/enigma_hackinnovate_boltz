import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSellerAsync, selectLoggedInSeller } from "../authSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Validation function
const validate = (values) => {
  const errors = {};

  if (!values.ownerName) {
    errors.ownerName = "Required";
  }

  if (!values.contact) {
    errors.contact = "Required";
  }

  if (!values.ownerEmail) {
    errors.ownerEmail = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Confirm Password Must be Same";
  }
  if (!values.storeName) {
    errors.storeName = "Required";
  }
  if (!values.bankAccount) {
    errors.bankAccount = "Required";
  }
  if (!values.gst) {
    errors.gst = "Required";
  }
  if (!values.storeAddress) {
    errors.storeAddress = "Required";
  }
  if (!values.state) {
    errors.state = "Required";
  }if (!values.city) {
    errors.city = "Required";
  }if (!values.pinCode) {
    errors.pinCode = "Required";
  }if (!values.additionalContact) {
    errors.additionalContact = "Required";
  }if (!values.logo) {
    errors.logo = "Required";
  }
  return errors;
};

const SellerRegister = () => {
  const formValues = {
    ownerName: "",
    contact: "",
    ownerEmail: "",
    password: "",
    confirmPassword: "",
    storeName: "",
    bankAccount: "",
    gst: "",
    storeAddress: "",
    state: "",
    city: "",
    pinCode: "",
    additionalContact: "",
    logo: "",
  };
  const dispatch = useDispatch();
  const seller = useSelector(selectLoggedInSeller);
  const [formPage,setFormPage] = useState(1)
  useEffect(() => {window.scrollTo(0, 0);}, []);
  return (
    <>
      {seller && <Navigate to="/shopkeeper" replace={true}></Navigate>}
      <Container className="">
        <div className="signupPage">
          <div className="pagename">Welcome</div>
          <h4>Create your account and start selling</h4>
          <div className="form">
            <Formik
              initialValues={formValues}
              validate={validate}
              onSubmit={async (values, { resetForm }) => {
                // Handle form submission here
                // Modify the values object before dispatching
                const modifiedValues = {
                  
      "storeName": values.storeName,
      "description": values.description,
      "shopkeeper": {
        "id": 1,
        "role": "seller",
        "ownerName": values.ownerName,
        "email": values.email,
        "contact": values.contact,
        "ownerAddress": "123 Main Street, Cityville",
        "profileImage": "shopkeeper.jpg"
      },
      "location": {
        "country": "India",
        "state": values.state,
        "city": values.city,
        "storeAddress": values.storeAddress
      },
      "minDiscount": 5,
      "products": [
        {
          "id": 101,
          "name": "Rice",
          "description": "Premium Basmati Rice",
          "price": 499.99,
          "discount": 10,
          "stock": 100,
          "productRating": 5,
          "productRatingCount": 14,
          "productImage": "https://media.istockphoto.com/id/1462545505/photo/girl-artist-hand-holds-paint-brush-and-draws-surreal-fairy-tale-portrait-on-white-canvas.jpg?s=2048x2048&w=is&k=20&c=4sy2pvYy81yd4hOXCLCx20M8CpBmrUfkbwOoB7AaRnw=",
          "shopId": 1
        },
        {
          "id": 102,
          "name": "Dal",
          "description": "High-Quality Lentils",
          "price": 899.99,
          "discount": 15,
          "stock": 99,
          "productRating": 5,
          "productRatingCount": 14,
          "productImage": "https://media.istockphoto.com/id/1462545505/photo/girl-artist-hand-holds-paint-brush-and-draws-surreal-fairy-tale-portrait-on-white-canvas.jpg?s=2048x2048&w=is&k=20&c=4sy2pvYy81yd4hOXCLCx20M8CpBmrUfkbwOoB7AaRnw=",
          "shopId": 1
        }
      ],
      "rating": 4.5,
      "ratingCount": 120,
      "images": {
        "logo": "https://media.istockphoto.com/id/1462545505/photo/girl-artist-hand-holds-paint-brush-and-draws-surreal-fairy-tale-portrait-on-white-canvas.jpg?s=2048x2048&w=is&k=20&c=4sy2pvYy81yd4hOXCLCx20M8CpBmrUfkbwOoB7AaRnw=",
        "gallery": [
          "https://media.istockphoto.com/id/1462545505/photo/girl-artist-hand-holds-paint-brush-and-draws-surreal-fairy-tale-portrait-on-white-canvas.jpg?s=2048x2048&w=is&k=20&c=4sy2pvYy81yd4hOXCLCx20M8CpBmrUfkbwOoB7AaRnw=",
          "https://media.istockphoto.com/id/1462545505/photo/girl-artist-hand-holds-paint-brush-and-draws-surreal-fairy-tale-portrait-on-white-canvas.jpg?s=2048x2048&w=is&k=20&c=4sy2pvYy81yd4hOXCLCx20M8CpBmrUfkbwOoB7AaRnw=",
          "https://media.istockphoto.com/id/1462545505/photo/girl-artist-hand-holds-paint-brush-and-draws-surreal-fairy-tale-portrait-on-white-canvas.jpg?s=2048x2048&w=is&k=20&c=4sy2pvYy81yd4hOXCLCx20M8CpBmrUfkbwOoB7AaRnw=",
          "https://media.istockphoto.com/id/1462545505/photo/girl-artist-hand-holds-paint-brush-and-draws-surreal-fairy-tale-portrait-on-white-canvas.jpg?s=2048x2048&w=is&k=20&c=4sy2pvYy81yd4hOXCLCx20M8CpBmrUfkbwOoB7AaRnw="
        ]
      },
    
                  
                };
                dispatch(createSellerAsync(modifiedValues));
                console.log("Form submitted with values:", modifiedValues);
                resetForm();
              }}
            >
              <div className="form-container">
                <Form className="">
                  { formPage===1 &&
                    <>
                      <div>
                        <label htmlFor="ownerName">Name</label>
                        <Field
                          id="ownerName"
                          name="ownerName"
                          type="text"
                          placeholder="Enter your name"
                        />
                        <ErrorMessage name="ownerName" component="div" />
                      </div>
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
                        <label htmlFor="ownerEmail">Email</label>
                        <Field
                          id="ownerEmail"
                          name="ownerEmail"
                          type="email"
                          placeholder="Enter your email"
                        />
                        <ErrorMessage name="ownerEmail" component="div" />
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
                        <label htmlFor="confirmPassword">
                          Confirm Password
                        </label>
                        <Field
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="Re enter same password"
                        />
                        <ErrorMessage name="confirmPassword" component="div" />
                      </div>
                      <div className="icons nav-arrow" onClick={()=>{setFormPage(2);window.scrollTo(0, 0);}}>
                <span>
                  <FaArrowRight size={30} />
                </span>
              </div>
                    </>
                  }
                  {formPage===2 &&
                    <>
                      <div>
                        <label htmlFor="storeName">Business name</label>
                        <Field
                          id="storeName"
                          name="storeName"
                          type="text"
                          placeholder="Enter your Business name"
                        />
                        <ErrorMessage name="storeName" component="div" />
                      </div>
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
                        <label htmlFor="bankAccount">Bank Account</label>
                        <Field
                          id="bankAccount"
                          name="bankAccount"
                          type="number"
                          placeholder="Enter your Bank Account"
                        />
                        <ErrorMessage name="bankAccount" component="div" />
                      </div>
                      <div>
                        <label htmlFor="gst">GST</label>
                        <Field
                          id="gst"
                          name="gst"
                          type="text"
                          placeholder="Enter your GST"
                        />
                        <ErrorMessage name="gst" component="div" />
                      </div>
                      <div>
                        <label htmlFor="storeAddress">Store Address</label>
                        <Field
                          id="storeAddress"
                          name="storeAddress"
                          type="text"
                          placeholder="Enter your Store Address"
                        />
                        <ErrorMessage name="storeAddress" component="div" />
                      </div>
                      <div>
                        <label htmlFor="state">Store State</label>
                        <Field
                          id="state"
                          name="state"
                          type="text"
                          placeholder="Enter your Store State"
                        />
                        <ErrorMessage name="state" component="div" />
                      </div>
                      <div>
                        <label htmlFor="city">Store city</label>
                        <Field
                          id="city"
                          name="city"
                          type="text"
                          placeholder="Enter your Store city"
                        />
                        <ErrorMessage name="city" component="div" />
                      </div>
                      <div>
                        <label htmlFor="pinCode">Store Pincode</label>
                        <Field
                          id="pinCode"
                          name="pinCode"
                          type="number"
                          placeholder="Enter your Store Pincode"
                        />
                        <ErrorMessage name="pinCode" component="div" />
                      </div>
                      <div>
                        <label htmlFor="additionalContact">
                          Additional Contact Information
                        </label>
                        <Field
                          id="additionalContact"
                          name="additionalContact"
                          type="text"
                          placeholder="Enter your Additional Contact Information"
                        />
                        <ErrorMessage
                          name="additionalContact"
                          component="div"
                        />
                      </div>
                      <div>
                        <label htmlFor="logo">Store Image</label>
                        <Field
                          id="logo"
                          name="logo"
                          type="text"
                          placeholder="Enter your Store Image"
                        />
                        <ErrorMessage name="logo" component="div" />
                      </div>

                  <div className="div-btn">
                  <div className="icons nav-arrow" onClick={()=>{setFormPage(1);window.scrollTo(0, 0);}}>
                <span>
                <FaArrowLeft size={30} />
                </span>
              </div>
                    <button type="submit" className="btn">
                      Submit
                    </button>
                  </div>
                    </>
                  }
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

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   min-height: 100vh;
//   width: 100%;
//   .signupPage {
//     border: 1px solid black;

//     padding: 30px;
//     margin: 30px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     text-align: center;
//     .pagename {
//       font-size: x-large;
//       margin: 30px 0;
//     }
//     .form {
//       margin: 10px 0;
//       .form-container {
//         div {
//           margin: 10px 0;
//           label {
//             display: block;
//           }
//         }
//         .div-btn {
//           display: flex;
//           width: 100%;
//           justify-content: center;
//         }
//         .btn {
//           cursor: pointer;
//           seller-select: none;
//           background-color: #6933d3;
//           color: #f2e3e3;
//           padding: 6px;
//           border-radius: 10px;
//           border: none;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//       }
//     }
//   }
// `;

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

export default SellerRegister;
