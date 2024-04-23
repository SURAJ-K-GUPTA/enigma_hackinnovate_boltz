import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  selectLoggedInUser,
  updateUserAsync,
} from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// Validation function
const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = "Required";
  }
  if (!values.street) {
    errors.street = "Required";
  }
  if (!values.addressLine2) {
    errors.addressLine2 = "Required";
  }
  if (!values.city) {
    errors.city = "Required";
  }
  if (!values.state) {
    errors.state = "Required";
  }
  if (!values.pinCode) {
    errors.pinCode = "Required";
  }

  if (!values.country) {
    errors.country = "Required";
  }

  return errors;
};

const AddressForm = ({address ,addressIndex, setShowAddAddressForm, setSelectedEditIndex}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  const formValues = {
    name: address.name || "",
    email: address.email || "",
    phoneNumber: address.phoneNumber || "",
    street: address.street || "",
    addressLine2: address.addressLine2 || "",
    city: address.city || "",
    state: address.state || "",
    pinCode: address.pinCode || "",
    country: address.country || "",
  };
  const handleCancle = (e) => {
    if(setShowAddAddressForm){setShowAddAddressForm(false)}
    if(setSelectedEditIndex){setSelectedEditIndex(-1)}
  }
  return (
    <Container>
      <Formik
        initialValues={formValues}
        validate={validate}
        onSubmit={async (values, { resetForm }) => {
          // Handle form submission here
          // Modify the values object before dispatching
          console.log(values);
          if(!address){
            dispatch(
            updateUserAsync({
              ...user,
              addresses: [...user.addresses, values],
            })
          );
          console.log("Form submitted with values:", values);
          }
          else{
            const userAddresses = [...user.addresses]
            userAddresses[addressIndex] = values
            dispatch(
              updateUserAsync({
                ...user,
                addresses:[...userAddresses]
              })
            )
          if(setSelectedEditIndex){setSelectedEditIndex(-1)}
            console.log("Form submitted with values:", values);
            console.log("Form submitted with addresses:", userAddresses);
          }
          resetForm();
          setShowAddAddressForm(false)
        }}
        onReset={async (values) => {
          
          }}
      >
        <div className="form-container">
          <Form className="">
            <div>
              <label htmlFor="name">Name</label>
              <Field
                className="input-field"
                id="name"
                name="name"
                type="text"
                placeholder="Enter your Full Name"
              />
              <ErrorMessage className="error" name="name" component="span" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field
                className="input-field"
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
              />
              <ErrorMessage name="email" component="span" />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <Field
                className="input-field"
                id="phoneNumber"
                name="phoneNumber"
                type="number"
                placeholder="Enter Phone Number"
              />
              <ErrorMessage name="phoneNumber" component="span" />
            </div>
            <div>
              <label htmlFor="street">Street Address</label>
              <Field
                className="input-field"
                id="street"
                name="street"
                type="text"
                placeholder="Enter Address"
              />
              <ErrorMessage name="street" component="span" />
            </div>
            <div>
              <label htmlFor="addressLine2">Address Line 2</label>
              <Field
                className="input-field"
                id="addressLine2"
                name="addressLine2"
                type="addressLine2"
                placeholder="Enter Address Line 2"
              />
              <ErrorMessage name="addressLine2" component="span" />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <Field
                className="input-field"
                id="city"
                name="city"
                type="text"
                placeholder="Enter city"
              />
              <ErrorMessage name="city" component="span" />
            </div>
            <div>
              <label htmlFor="state">State / Province / Region</label>
              <Field
                className="input-field"
                id="state"
                name="state"
                type="text"
                placeholder="Enter State / Province / Region"
              />
              <ErrorMessage name="state" component="span" />
            </div>
            <div>
              <label htmlFor="pinCode">Pincode</label>
              <Field
                className="input-field"
                id="pinCode"
                name="pinCode"
                type="number"
                placeholder="Enter pinCode"
              />
              <ErrorMessage name="pinCode" component="span" />
            </div>
            <div>
              <label htmlFor="country">Country</label>
              <Field
                className="input-field"
                id="country"
                name="country"
                type="text"
                placeholder="Enter country"
              />
              <ErrorMessage name="country" component="span" />
            </div>

            <div className="div-btn">
              <button type="button" onClick={(e)=>{handleCancle(e)}} className="btn">
                cancel
              </button>
              <button type="reset" className="btn">
                reset
              </button>
              {setShowAddAddressForm && <button type="submit" className="btn">
                Add Address
              </button>}
              {setSelectedEditIndex && <button type="submit" className="btn">
                Edit Address
              </button>}
            </div>
          </Form>
        </div>
      </Formik>
    </Container>
  );
};

const Container = styled.div`

  label,div {
    display: block;
  }
  form {
	display: flex;
	flex-direction: column;
	width: 400px;
	margin: 20px;
}
  form input {
    width: 100%;
  }
span {
	color: red;
}


  .div-btn {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 10px;
    justify-content: space-around;
    .btn {
      cursor: pointer;
      user-select: none;
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
`;
export default AddressForm;
