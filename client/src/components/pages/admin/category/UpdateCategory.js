import React, { useState, useEffect } from "react";
import { readCategory, editCategory } from "../../../functions/Category";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { editProductTime } from "../../../functions/user";
const UpdateCategory = () => {
  const navigate = useNavigate();
  const param = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  useEffect(() => {
    loadData(user.user.token, param.id);
  }, []);
  const loadData = (authtoken, id) => {
    readCategory(authtoken, id)
      .then((res) => {
        setName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editCategory(user.user.token, param.id, { name })
      .then((res) => {
        editProductTime(user.user.token, user.user.user_id);
        navigate("/admin/create-category");
        toast.success("อัพเดท " + res.data.name + " สำเร็จ");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="col">
      <h1>อัปเดตหมวดหมู่</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>อัปเดตหมวดหมู่</label>
          <input
            className="form-control"
            value={name}
            autoFocus
            required
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn btn-outline-primary">ส่ง</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCategory;
