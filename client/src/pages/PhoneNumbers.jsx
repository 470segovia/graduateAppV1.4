import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './PhoneNumbers.css'; 

const PhoneNumbers = () => {
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  useEffect(() => {
    const fetchAllPhoneNumbers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/phoneNumbers");
        setPhoneNumbers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPhoneNumbers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/phoneNumbers/${id}`);
      setPhoneNumbers(phoneNumbers.filter(phoneNumber => phoneNumber.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Phone Numbers Management System</h1>
      <div className="phoneNumbers">
        {phoneNumbers.map((phoneNumber) => (
          <div key={phoneNumber.id} className="phoneNumber">
            <h2>{phoneNumber.phoneNumber}</h2>
            <p>{phoneNumber.company}</p>
            <p>{phoneNumber.name}</p>
            <button className="delete" onClick={() => handleDelete(phoneNumber.id)}>Delete</button>
            <button className="update">
              <Link
                to={`/update/${phoneNumber.id}`} 
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <div className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new phone number
        </Link>
      </div>
    </div>
  );
};

export default PhoneNumbers;
