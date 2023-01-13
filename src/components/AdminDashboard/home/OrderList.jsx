import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { unsubscribeOrder } from "../../../redux/modules/actions/completedOrderActions";
import Loading from "../../common/Loading";

const OrderList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    unsubscribeOrder(setData);
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
    ],
    []
  );

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ListContainer>
          <Box sx={{ height: "350px", width: "620px" }}>
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={4}
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
  width: 500px;
`;

export default OrderList;
