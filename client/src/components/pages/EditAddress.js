import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { editAddress, listAddress } from "../functions/user";

const initialstate = {
  fulladdress: {
    houseNumber: "",
    subdistrict: "",
    district: "",
    province: "",
    zipcode: "",
  },
  name: "",
  phoneNumber: "",
};

const EditUserAddress = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialstate);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await listAddress(user.user.token, user.user.user_id);
        console.log("res", res);
        const responseData = res.data;

        if (Array.isArray(responseData)) {
          setAddresses(responseData);
        } else {
          console.error("Invalid response format. Expected an array.");
          setError("Error fetching addresses. Please try again.");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching addresses:", err);
        setError("Error fetching addresses. Please try again.");
        setLoading(false);
      }
    };

    loadData();
  }, [user.user.token, user.user.user_id]);

  const handleAddressSelect = (selectedAddress) => {
    setValues(selectedAddress);
    setSelectedAddress(selectedAddress);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    editAddress(user.user.token, values._id, values)
      .then((res) => {
        toast.success("อัปเดตสินค้าเรียบร้อยแล้ว");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Update failed:", err);
        toast.error("ไม่สามารถอัปเดตสินค้าได้");
        setLoading(false);
      });
  };
  console.log("ที่อยู่", values);
  return (
    <div>
      <h2>Edit User Address</h2>

      {error && <p>Error: {error}</p>}

      <div>
        <h3>Choose Address to Edit:</h3>
        <ul>
          {addresses.map((address) => (
            <li
              key={address._id}
              onClick={() => handleAddressSelect(address)}
              style={{
                border: selectedAddress === address ? "2px solid blue" : "none",
                padding: "5px",
                margin: "5px",
                cursor: "pointer",
              }}
            >
              {`${address.fulladdress.houseNumber}, ${address.fulladdress.subdistrict}, ${address.fulladdress.district}, ${address.fulladdress.province}, ${address.fulladdress.zipcode}, ${address.name}, ${address.phoneNumber}`}
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          House Number:
          <input
            type="text"
            name="fulladdress.houseNumber"
            value={values.fulladdress.houseNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          subdistrict:
          <input
            type="text"
            name="fulladdress.subdistrict"
            value={values.fulladdress?.subdistrict || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          district:
          <input
            type="text"
            name="fulladdress.district"
            value={values.fulladdress?.district || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          province:
          <input
            type="text"
            name="fulladdress.province"
            value={values.fulladdress?.province || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          zipcode:
          <input
            type="text"
            name="fulladdress.zipcode"
            value={values.fulladdress?.zipcode || ""}
            onChange={handleChange}
          />
        </label>

        {/* Add similar input fields for other address details (subdistrict, district, province, zipcode) */}

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Address"}
        </button>
      </form>
    </div>
  );
};

export default EditUserAddress;
