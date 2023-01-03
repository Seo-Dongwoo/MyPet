import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrderInitiate } from "../../../redux/modules/actions/orderActions";
import { deleteCompletedInitiate } from "../../../redux/modules/actions/completedOrderActions";

const OrderList = () => {
  const { orderItems } = useSelector((state) => state.orderProduct);
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteCompletedInitiate());
    dispatch(deleteOrderInitiate());
    alert("해당 유저를 삭제하시겠습니까?");
  };

  console.log(orderItems);
  return (
    <div>
      {orderItems.map((item, index) => (
        <div key={index}>
          <h4>{item.address}</h4>
          <button onClick={() => deleteHandler(item.id)}>삭제</button>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
