import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddPhoneNumber = () => {
  const [phoneNumberData, setPhoneNumberData] = useState({
    phoneNumber: "",
    company: "",
    name: "",
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPhoneNumberData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/phoneNumbers", phoneNumberData);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Add Phone Number</h1>
      <input
        type="text"
        placeholder="Phone Number"
        name="phoneNumber"
        value={phoneNumberData.phoneNumber}
        onChange={handleChange}
        style={{ width: '100%' }}  // Make phone number input full width
      />
      <input
        type="text"
        placeholder="Company"
        name="company"
        value={phoneNumberData.company}
        onChange={handleChange}
        style={{ width: '100%' }}  // Make company input full width
      />
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={phoneNumberData.name}
        onChange={handleChange}
        style={{ width: '100%' }}  // Make name input full width
      />
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/">See all phone numbers</Link>
    </div>
  );
};

export default AddPhoneNumber;
