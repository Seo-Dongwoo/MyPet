import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { db } from "../../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Avatar } from "@mui/material";

function ProductList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        setLoading(false);
      },
      (err) => {
        console.log(err);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const columns = [
    {
      field: "image",
      headerName: "Image",
      sortable: false,
      width: 100,
      renderCell: (params) => <Avatar src={params.row.img} />,
      filterable: false,
    },
    {
      field: "category",
      headerName: "Category",
      sortable: false,
      width: 200,
    },
    {
      field: "product",
      headerName: "Product",
      sortable: false,
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
      sortable: false,
      width: 150,
    },
    {
      field: "desc",
      headerName: "Desc",
      sortable: false,
      width: 310,
    },
  ];

  console.log(data);
  return (
    <ListContainer>
      <Box sx={{ height: "75.5%", width: "80%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row.id}
        />
      </Box>
    </ListContainer>
  );
}

const ListContainer = styled.div`
  padding: 5% 0 0 5%;
  width: 80%;
  height: 100%;
`;

export default ProductList;
