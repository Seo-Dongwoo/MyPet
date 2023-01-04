// export default OrderList;
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { unsubscribe } from "../../../redux/modules/actions/completedOrderActions";
import { useNavigate } from "react-router-dom";
import Loading from "../../loading/Loading";
import { deleteInitiate } from "../../../redux/modules/actions/completedOrderActions";

const OrderList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHandler = (id, orderNumber) => {
    dispatch(deleteInitiate(id, orderNumber));

    alert("해당 유저를 삭제하시겠습니까?");
  };

  useEffect(() => {
    setLoading(false);

    unsubscribe(setData);
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "orderNumber",
        headerName: "주문 번호",
        renderCell: (params) => <h3>{params.row.data.orderNumber}</h3>,
        sortable: false,
        width: 150,
      },
      {
        field: "address",
        headerName: "배송지",
        renderCell: (params) => (
          <h3>{params.row.data.completedOrder.map((item) => item.address)}</h3>
        ),
        sortable: false,
        width: 430,
      },
      {
        field: "detailAddress",
        headerName: "상세 주소",
        renderCell: (params) => (
          <h3>
            {params.row.data.completedOrder.map((item) => item.detailAddress)}
          </h3>
        ),
        sortable: false,
        width: 200,
      },
      {
        field: "view",
        headerName: "View",
        renderCell: (row) => (
          <ViewButton
            onClick={() => {
              navigate(`/admin/view/${row.id}`);
            }}
          >
            View
          </ViewButton>
        ),
      },
      {
        field: "delete",
        headerName: "Delete",
        renderCell: (params) => (
          <DeleteButton
            onClick={() =>
              deleteHandler(params.row.id, params.row.data.orderNumber)
            }
          >
            Delete
          </DeleteButton>
        ),
      },
    ],
    []
  );

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ListContainer>
          <Box sx={{ height: "75.5%", width: "90%" }}>
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              getRowId={(row) => row.id}
              sx={{
                borderColor: "primary.light",
                boxShadow: 2,
                border: 2,
                marginTop: 5,
                paddingLeft: 1,
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
                },
              }}
            />
          </Box>
        </ListContainer>
      )}
    </>
  );
};

const ListContainer = styled.div`
  padding: 5% 0 0 10%;
  width: 75%;
  height: 100%;
`;

const DeleteButton = styled.button`
  width: 60px;
  height: 30px;
  background: none;
  background-color: red;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  &:hover {
    background-color: white;
    color: red;
    transition: all 0.5s ease;
  }
`;

const ViewButton = styled.button`
  width: 60px;
  height: 30px;
  background: none;
  background-color: #007fff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  &:hover {
    background-color: white;
    color: #007fff;
    transition: all 0.5s ease;
  }
`;

export default OrderList;
