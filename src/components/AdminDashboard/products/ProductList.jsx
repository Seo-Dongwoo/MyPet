import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import {
  deleteInitiate,
  deleteStorageFile,
  unsubscribeProduct,
} from "../../../redux/modules/actions/productActions";
import { useNavigate } from "react-router-dom";
import Loading from "../../common/Loading";

function ProductList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHandler = (id, name) => {
    dispatch(deleteInitiate(id));
    deleteStorageFile(name);
    alert("상품을 삭제하시겠습니까?");
  };

  useEffect(() => {
    setLoading(false);

    unsubscribeProduct(setData);
  }, []);
  console.log(data);

  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: "Image",
        sortable: false,
        width: 80,
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
        width: 220,
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
        width: 270,
      },
      {
        field: "edit",
        headerName: "Edit",
        renderCell: (row) => (
          <EditButton
            onClick={() => {
              navigate(`/admin/edit/${row.id}`);
            }}
          >
            Edit
          </EditButton>
        ),
      },
      {
        field: "delete",
        headerName: "Delete",
        renderCell: (params) => (
          <DeleteButton
            onClick={() => deleteHandler(params.row.id, params.row.product)}
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
          <Box sx={{ height: "75.5%", width: "80%" }}>
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

const EditButton = styled.button`
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

export default ProductList;
