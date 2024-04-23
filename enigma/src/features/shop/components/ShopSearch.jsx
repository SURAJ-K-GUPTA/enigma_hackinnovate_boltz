import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  fetchLocationsAsync,
  fetchShopsByFiltersAsync,
  selectLocations,
} from "../shopSlice";
const ShopSearch = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLocationsAsync());
  }, []);

  const locations = useSelector(selectLocations);
  useEffect(() => {
    const selectedStateObj = locations.find(
      (location) => String(location.value) === String(selectedState)
    );

    if (selectedStateObj) {
      setSelectedCities(selectedStateObj.cities);
    } else {
      setSelectedCities([]);
    }
  }, [selectedState]);

  const handleCityClick = (e, newCity) => {
    dispatch(
      fetchShopsByFiltersAsync({
        filter: { city: newCity },
        sort: {},
        pagination: {},
        admin: false,
      })
    );
  };
  const handleResetClick = (e) =>{
    setSelectedState('')
    setSelectedCities([])
    dispatch(
        fetchShopsByFiltersAsync({
          filter: {},
          sort: {},
          pagination: {},
          admin: false,
        })
      );
  }
  return (
    <Container>
      <div>
        <select
          name="states"
          id="states"
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
          }}
        >
          <option value="">-- Select Style --</option>
          {locations &&
            locations.map((location) => (
              <option key={location.id} value={location.value}>
                {location.name}
              </option>
            ))}
        </select>

        <select
          name="cities"
          id="cities"
          onChange={(e) => handleCityClick(e, e.target.value)}
        >
          <option value="">-- Select Artist --</option>)
          {locations &&
            selectedState &&
            selectedCities &&
            selectedCities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
        </select>
      </div>
      <div>
        <button onClick={(e)=>{handleResetClick(e)}}>Reset</button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  /* Container styling to add padding and margin */

  padding: 20px;
  margin: 6px auto 20px auto;
  background-color: #f0f0f0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  
  /* Style for the select tags */
select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #6933d3;
  color: white;
  padding: 10px;
  border: 1px solid #6933d3;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

/* Style for the select options */
select option {
  background-color: #f2e3e3;
  color: #6933d3;
}

/* Hover effect for options */
select option:hover {
  background-color: #6933d3;
  color: white;
}

/* Style for the reset button */
button {
  background-color: #6933d3;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

/* Hover effect for the reset button */
button:hover {
  background-color: #f2e3e3;
  color: #6933d3;
}




`;
export default ShopSearch;
