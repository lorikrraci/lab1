import React, { Fragment, useState } from "react";
import { countries } from "countries-list";
import MetaData from "../layout/MetaData";
import { CheckoutSteps } from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import { useNavigate } from "react-router-dom";

export const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  // Use default empty strings if shippingInfo properties are undefined
  const [address, setAddress] = useState(shippingInfo?.address || "");
  const [city, setCity] = useState(shippingInfo?.city || "");
  const [postalCode, setPostalCode] = useState(shippingInfo?.postalCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo || "");
  const [country, setCountry] = useState(shippingInfo?.country || "");

  const countriesList = Object.values(countries);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }));
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title={"Shipping Info"} />
      <CheckoutSteps shipping />
      <div className="row wrapper">
        <div className="col-10 col-lg-6">
          <form
            className="shadow-lg mb-5"
            onSubmit={submitHandler}
            style={{
              width: "80%",
              padding: "2rem",
              margin: "0 auto",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              marginBottom: "3rem",
              borderRadius: "20px",
              padding: "30px",
            }}
          >
            <h1 className="mb-4">Shipping Info</h1>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city_field">City</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone_field">Phone Number</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country_field">Country</label>
              <select
                id="country_field"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                style={{ width: "100%" }}
              >
                {countriesList.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-block py-3"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
