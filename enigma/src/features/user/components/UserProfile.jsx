import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserAsync,
  selectUserInfo,
  updateUserAsync,
} from "../userSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import AddressForm from "../../../common/AddressForm";
import styled from "styled-components";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { LuPencilLine } from "react-icons/lu";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const loggedInUser = useSelector(selectLoggedInUser);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      dispatch(fetchLoggedInUserAsync(loggedInUser.id));
      console.log(userInfo);
      console.log(loggedInUser);
    }
  }, []);

  //TODO: We will add payment section when we work on backend.

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   setValue,
  //   formState: { errors },
  // } = useForm();

  // const handleEdit = (addressUpdate, index) => {
  //   const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue
  //   newUser.addresses.splice(index, 1, addressUpdate);
  //   dispatch(updateUserAsync(newUser));
  //   setSelectedEditIndex(-1);
  // };
  const handleRemove = (e, index) => {
    var res = window.confirm(`Do you want to delete "${index}" from addresses`);
    if (res) {
      const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue
      newUser.addresses.splice(index, 1);
      dispatch(updateUserAsync(newUser));
    }
  };

  const enableEditing = (e) => {
    setIsEditing(!isEditing);
    e.preventDefault()
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    // const address = userInfo.addresses[index];
    // setValue('name', address.name);
    // setValue('email', address.email);
    // setValue('city', address.city);
    // setValue('state', address.state);
    // setValue('pinCode', address.pinCode);
    // setValue('phone', address.phone);
    // setValue('street', address.street);
  };

  // const handleAdd = (address) => {
  //   const newUser = {
  //     ...userInfo,
  //     addresses: [...userInfo.addresses, address],
  //   };
  //   dispatch(updateUserAsync(newUser));
  //   setShowAddAddressForm(false);
  // };

  return (
    <Container>
      <div className="profile">
        {userInfo && (
          <div className="profile-page">
            <div className="profile-head">
              <h1 className="pagename">Profile</h1>
              <div className="icons" onClick={enableEditing}>
                <LuPencilLine size={30} />
              </div>
            </div>
            <hr />
            <div className="profile-form">
              <Formik
                initialValues={{
                  name: userInfo.name || "",
                  phoneNumber: userInfo.phoneNumber || "",
                  email: userInfo.email || "",
                  password: userInfo.password || "",
                }}
                validate={validate}
                enableReinitialize={true}
                onSubmit={async (values, { resetForm }) => {
                  // Handle form submission here
                  // Modify the values object before dispatching
                  const modifiedValues = {
                    ...values,
                    id: userInfo.id,
                  };
                  dispatch(updateUserAsync(modifiedValues));
                  console.log("Form submitted with values:", modifiedValues);
                  setIsEditing(!isEditing);
                }}
              >
                <div className="profile-form-container">
                  <Form>
                    <div>
                      <label htmlFor="name">Name</label>
                      <Field
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter name"
                        readOnly={!isEditing}
                        className={`${!isEditing ? 'no-focus' : ''}`}
                      />
                      <ErrorMessage name="name" component="span" />
                    </div>
                    <div>
                      <label htmlFor="phoneNumber">Mobile Number</label>
                      <Field
                        id="phoneNumber"
                        name="phoneNumber"
                        type="number"
                        placeholder="Enter Phone Number"
                        readOnly={!isEditing}
                        className={`${!isEditing ? 'no-focus' : ''}`}
                      />
                      <ErrorMessage name="phoneNumber" component="span" />
                    </div>
                    <div>
                      <label htmlFor="email">Email</label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        readOnly={!isEditing}
                        className={`${!isEditing ? 'no-focus' : ''}`}
                      />
                      <ErrorMessage name="email" component="span" />
                    </div>
                    <div>
                      <label htmlFor="password">Password</label>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        readOnly={!isEditing}
                        className={`${!isEditing ? 'no-focus' : ''}`}
                      />
                      <ErrorMessage name="password" component="span" />
                    </div>
                    <div className="div-btn">
                      {isEditing && (
                        <button type="submit" className="btn">
                          Edit Profile
                        </button>
                      )}
                    </div>
                  </Form>
                </div>
              </Formik>
            </div>
            <div className="user-addresses"></div>
          </div>
        )}
      </div>
      <div className="addresses">
        <button
          onClick={(e) => {
            setShowAddAddressForm(!showAddAddressForm);
            setSelectedEditIndex(-1);
          }}
          type="submit"
          className="btn"
        >
          Add New Address
        </button>
        {showAddAddressForm ? (
          <AddressForm
            address={""}
            setShowAddAddressForm={setShowAddAddressForm}
          />
        ) : null}
        <p className="mt-0.5 text-sm text-gray-500">Your Addresses :</p>
        {userInfo &&
          userInfo.addresses &&
          userInfo.addresses.map((address, index) => (
            <div key={index}>
              {selectedEditIndex === index ? (
                <AddressForm
                  address={address}
                  addressIndex={index}
                  setSelectedEditIndex={setSelectedEditIndex}
                />
              ) : null}
              <div className="saved-addresses">
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {address.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.street}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.pinCode}
                    </p>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone: {address.phoneNumber}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {address.city}
                    </p>
                  </div>
                  <div>
                    <div className="div-btn">
                      <button
                        onClick={(e) => handleEditForm(index)}
                        type="button"
                        className="btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleRemove(e, index)}
                        type="button"
                        className="btn"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .profile-page {
    border: 1px solid black;

    padding: 30px;
    margin: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    text-align: center;
    .profile-head {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    .icons {
      border-radius: 3px;
      padding: 3px;
      border: 1px solid black;
      cursor: pointer;
    }
    .icons:hover {
      box-shadow: 3px 3px #f2e3e3;
    }
    label {
      display: block;
      text-align: start;
      margin: 10px 0 0 0;
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
  }
  .addresses {
    border: 1px solid black;
    min-width: 60%;
    padding: 30px;
    margin: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .div-btn {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
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
  .no-focus {
  outline: none; 
  cursor: default; 
  pointer-events: none; 
}
`;
