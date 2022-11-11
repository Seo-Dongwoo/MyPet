import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { db } from "../../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Avatar, Button } from "@mui/material";
import { deleteInitiate } from "../../../redux/modules/actions/productActions";

function ProductList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const deleteHandler = (id, img) => {
    dispatch(deleteInitiate(id, img));
  };

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

  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: "Image",
        sortable: false,
        width: 60,
        renderCell: (params) => <Avatar src={params.row.img} />,
        filterable: false,
      },
      {
        field: "category",
        headerName: "Category",
        sortable: false,
        width: 150,
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
        width: 100,
      },
      {
        field: "desc",
        headerName: "Desc",
        sortable: false,
        width: 250,
      },
      {
        field: "edit",
        headerName: "Edit",
        renderCell: (params) => <DeleteButton>Edit</DeleteButton>,
      },
      {
        field: "delete",
        headerName: "Delete",
        renderCell: (params) => (
          <DeleteButton
            onClick={() => deleteHandler(params.row.id, params.row.img)}
          >
            Delete
          </DeleteButton>
        ),
      },
    ],
    []
  );

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

export default ProductList;
