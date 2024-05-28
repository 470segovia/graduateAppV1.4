import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdatePhoneNumber = () => {
  const [phoneNumberData, setPhoneNumberData] = useState({
    phoneNumber: "",
    company: "",
    name: "",
  });
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const phoneNumberId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        console.log(phoneNumberId); 
        const res = await axios.get(`http://localhost:5000/phoneNumbers/${phoneNumberId}`);
        setPhoneNumberData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPhoneNumber();
  }, [phoneNumberId]); 

  const handleChange = (e) => {
    setPhoneNumberData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!validatePhoneNumberData()) return;

    try {
      await updatePhoneNumber();
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const validatePhoneNumberData = () => {
    if (!phoneNumberData.phoneNumber.trim()) {
      setError(true);
      return false;
    }
    return true;
  };

  const updatePhoneNumber = async () => {
    await axios.put(`http://localhost:5000/phoneNumbers/${phoneNumberId}`, phoneNumberData);
  };

  return (
    <div className="form">
      <h1>Update Phone Number</h1>
      <div>
        <p>Phone number: {phoneNumberData.phoneNumber}</p>
      </div>
      <input
        type="text"
        placeholder="Phone Number"
        name="phoneNumber"
        value={phoneNumberData.phoneNumber}
        onChange={handleChange}
        style={{ width: '100%' }}  
      />
      <input
        type="text"
        placeholder="Company"
        name="company"
        value={phoneNumberData.company}
        onChange={handleChange}
        style={{ width: '100%' }}  
      />
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={phoneNumberData.name}
        onChange={handleChange}
        style={{ width: '100%' }}  
      />
      <button onClick={handleClick}>Update</button>
      {error && <p style={{ color: 'red' }}>Phone number cannot be empty</p>}
      <Link to="/">See all phone numbers</Link>
    </div>
  );
};

export default UpdatePhoneNumber;
