import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { deleteTodo } from "./TodoSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TodoList = () => {
  const todo = useSelector((state) => [...state.todo.todos]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddList = () => {
    navigate("/addtodo");
  };
  const handleEditTodo = (event, id) => {
    navigate(`/edittodo/${id}`);
  };

  const handleDelete = (event, id) => {
    Swal.fire({
      title: "Are you sure you want to delete this?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      dispatch(deleteTodo(id));
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Desctiption", width: 200 },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      // disableClickEventBubbling: true,
      disableSelectionOnClick: true,
      disableColumnMenu: true,
      width: 200,
      renderCell: (cellValues) => {
        return (
          <>
            <EditIcon
              sx={{ color: "blue", fontSize: 20, cursor: "pointer" }}
              onClick={(event) => {
                handleEditTodo(event, cellValues.id);
              }}
            />
            <DeleteIcon
              sx={{ color: "red", fontSize: 20, cursor: "pointer", ml: 2 }}
              onClick={(event) => {
                handleDelete(event, cellValues.id);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Box
        sx={{
          my: 2,
          mt: 5,
          mx: 4,
          display: "flex",
        }}
      >
        <Button variant="contained" color={"secondary"} onClick={handleAddList}>
          <AddIcon
            sx={{
              mr: 1,
              color: "white",
              fontSize: 22,
            }}
          />
          Add TODO
        </Button>
      </Box>
      <Box
        sx={{
          my: 2,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={todo}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            // checkboxSelection
          />
        </div>
      </Box>
    </>
  );
};

export default TodoList;
