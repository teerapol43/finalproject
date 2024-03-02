import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SlipCard from "../../card/SlipCard";
import { updateStatusOrder, getOrdersAdmin } from "../../functions/admin";
import {
  editOrderTime,
  getAddress,
  getName,
  getOrders,
  getPhoneNumber,
} from "../../functions/user";
import { toast } from "react-toastify";

const Order = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState({});
  const [address, setAddress] = useState({});
  const [phoneNumber, setPhoneNumber] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    Promise.all([getOrders(user.user.token)])
    .then(([ordersRes, addressRes, phoneNumberRes, nameRes]) => {
      console.log("Orders response:", ordersRes.data);
      setOrders(ordersRes.data);
    });

    getOrdersAdmin(user.user.token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการโหลดคำสั่งซื้อ:", error);
      });
  };

  const thaiStatus = (status) => {
    switch (status) {
      case "Not Process":
        return "ยังไม่ดำเนินการ";
      case "Processing":
        return "กำลังดำเนินการ";
      case "Cancelled":
        return "ถูกยกเลิก";
      case "Completed":
        return "สั่งซื้อสำเร็จ";
      default:
        return status;
    }
  };

  const handleChangeStatus = (orderId, orderstatus) => {
    updateStatusOrder(user.user.token, orderId, orderstatus)
      .then((res) => {
        editOrderTime(user.user.token, user.user.user_id);
        toast.info("อัพเดท " + res.data.orderstatus + " สำเร็จ");
        loadData();
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการอัพเดทสถานะ:", error);
        toast.error("เกิดข้อผิดพลาดในการอัพเดทสถานะ");
      });
  };

  return (
    <div className="col text-center">
      <div className="row">
        <h1>ข้อมูลการสั่งซื้อสินค้า</h1>
        {orders.length === 0 ? (
          <p>ไม่มีสินค้า</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="cart m-3">
              <p>
                สั่งซื้อโดย <b>{order.orderBy.username}</b>
                <br />
                สถานะ : {thaiStatus(order.orderstatus)}
                <p className="mb-2">ชื่อ: {order.name}</p>
                <p className="mb-2">
                  ที่อยู่:{" "}
                  {order && order.fulladdress && order.fulladdress.houseNumber}{" "}
                </p>
                <p className="mb-2">
                  ตำบล:{" "}
                  {order && order.fulladdress && order.fulladdress.subdistrict}
                </p>
                <p className="mb-2">
                  อำเภอ:{" "}
                  {order && order.fulladdress && order.fulladdress.district}
                </p>
                <p className="mb-2">
                  จังหวัด:{" "}
                  {order && order.fulladdress && order.fulladdress.province}{" "}
                </p>
                <p className="mb-2">
                  รหัสไปรษณีย์:{" "}
                  {order && order.fulladdress && order.fulladdress.zipcode}
                </p>
                <p className="mb-2">เบอร์โทร: {order.phoneNumber}</p>
              </p>

              <table className="table table-bordered">
                <colgroup>
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "25%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>ชื่อสินค้า</th>
                    <th>ราคา</th>
                    <th>ชิ้น</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.count}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={3}>
                      ราคาสุทธิ :{" "}
                      <b>
                        <u>{order.cartTotal}</u>
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <SlipCard order={order} />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <select
                        value={order.orderstatus}
                        onChange={(e) =>
                          handleChangeStatus(order._id, e.target.value)
                        }
                        className="form form-control"
                      >
                        <option value="Not Process">ยังไม่ดำเนินการ</option>
                        <option value="Processing">กำลังดำเนินการ</option>
                        <option value="Cancelled">ถูกยกเลิก</option>
                        <option value="Completed">สั่งซื้อสำเร็จ</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Order;
