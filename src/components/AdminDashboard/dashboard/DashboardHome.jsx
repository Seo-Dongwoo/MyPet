import React from "react";
import { useDispatch } from "react-redux";
import { resetCompletedInitiate } from "../../../redux/modules/actions/completedOrderActions";
import { resetOrderInitiate } from "../../../redux/modules/actions/orderActions";
import { resetCartInitiate } from "../../../redux/modules/actions/cartActions";
const DashboardHome = () => {
  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(resetCompletedInitiate());
    dispatch(resetOrderInitiate());
    dispatch(resetCartInitiate());
  };
  return (
    <div>
      <button onClick={() => deleteHandler()}>삭제</button>
    </div>
  );
};

export default DashboardHome;
