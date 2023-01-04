import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import { unsubscribe } from "../../../redux/modules/actions/userActions";
import { useNavigate } from "react-router-dom";
import Loading from "../../loading/Loading";
import { deleteInitiate } from "../../../redux/modules/actions/userActions";

function UserList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHandler = (id) => {
    dispatch(deleteInitiate(id));

    alert("해당 유저를 삭제하시겠습니까?");
  };

  useEffect(() => {
    setLoading(false);

    unsubscribe(setData);
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "photoURL",
        headerName: "Image",
        sortable: false,
        renderCell: (params) => <Avatar src={params.row.photoURL} />,
        width: 80,
        filterable: false,
      },
      {
        field: "username",
        headerName: "UserName",
        renderCell: (params) => (
          <h3>{params.row.username || params.row.values.displayName}</h3>
        ),
        sortable: false,
        width: 150,
      },
      {
        field: "email",
        headerName: "Email",
        renderCell: (params) => (
          <>
            {params.row.email === null || params.row.values.email === null ? (
              <h3>Email 비공개</h3>
            ) : (
              <h3>{params.row.values.email || params.row.email}</h3>
            )}
          </>
        ),
        sortable: false,
        width: 250,
      },
      {
        field: "phonenumber",
        headerName: "PhoneNumber",
        renderCell: (params) => (
          <>
            {params.row.phoneNumber === null ||
            params.row.values.phoneNumber === null ? (
              <h3>phoneNumber 비공개</h3>
            ) : (
              <h3>{params.row.values.phoneNumber || params.row.phoneNumber}</h3>
            )}
          </>
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
          <DeleteButton onClick={() => deleteHandler(params.row.id)}>
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
          <Box sx={{ height: "75.5%", width: "82%" }}>
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
}

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

export default UserList;
