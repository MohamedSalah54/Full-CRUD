

import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoPencilSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useData } from "./DataContext";
import toast, { Toaster } from "react-hot-toast";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    borderRadius: 2,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    p: 4,
    textAlign: "center",
};

const Toolbar = ({ selectedId, rows }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [updateData, setUpdateData] = useState({ NAME_ONE: "", NAME_TWO: "", EMAIL: "", AGE: "", JOINING_DATE: "", IS_ACTIVE_Y_N: "" });
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [newData, setNewData] = useState({ firstName: "", lastName: "" });
    const [deleteId, setDeleteId] = useState(null);
    const { addRow, deleteRow, updateRow } = useData();
    useEffect(() => {
        if (selectedId) {
            const selectedRow = rows.find(row => row.id === selectedId);
            setUpdateData(selectedRow || {});
        }
    }, [selectedId, rows]);


    const handleOpenUpdateModal = () => setIsUpdateModalOpen(true);
    const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);


    const handleUpdate = () => {
        if (updateData.NAME_ONE && updateData.NAME_TWO && updateData.EMAIL && updateData.AGE && updateData.JOINING_DATE && updateData.IS_ACTIVE_Y_N) {

            updateRow(selectedId, updateData);
            setUpdateData({ NAME_ONE: "", NAME_TWO: "", EMAIL: "", AGE: "", JOINING_DATE: "", IS_ACTIVE_Y_N: "" });
            handleCloseUpdateModal();
        } else {
            toast.error("Please fill all fields!");
        }
    };



    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleOpenDeleteConfirm = (id) => {
        setDeleteId(id);
        setIsDeleteConfirmOpen(true);
    };

    const handleCloseDeleteConfirm = () => setIsDeleteConfirmOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewData((prev) => ({ ...prev, [name]: value }));
    };
    const handleInputUpdate = (e, setState) => {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };


    const handleAdd = () => {
        const { NAME_ONE, NAME_TWO, EMAIL, AGE, JOINING_DATE, IS_ACTIVE_Y_N } = newData;
        if (NAME_ONE && NAME_TWO && EMAIL && AGE && JOINING_DATE && IS_ACTIVE_Y_N) {
            addRow({ NAME_ONE, NAME_TWO, EMAIL, AGE, JOINING_DATE, IS_ACTIVE_Y_N });
            setNewData({ NAME_ONE: "", NAME_TWO: "", EMAIL: "", AGE: "", JOINING_DATE: "", IS_ACTIVE_Y_N: "" });
            handleCloseModal();
        } else {
            toast.error("Please fill all fields!");
        }
    };

    const handleDelete = () => {
        if (deleteId) {
            deleteRow(deleteId);
            setIsDeleteConfirmOpen(false);
        }
    };

    return (
        <div className="container-toolbar">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="container-btn">
                <button className="custom-btn add-btn" onClick={handleOpenModal}>
                    <IoMdAdd className="btn-icon" />
                    Add New
                </button>
                <button className="custom-btn delete-btn" onClick={() => handleOpenDeleteConfirm(selectedId)}>
                    <MdDelete className="btn-icon" />
                    Delete
                </button>


                <button className="custom-btn update-btn" onClick={handleOpenUpdateModal} disabled={!selectedId}>
                    <IoPencilSharp className="btn-icon" />
                    Update
                </button>
            </div>
            <Modal open={isModalOpen} onClose={handleCloseModal} aria-labelledby="add-new-modal" aria-describedby="add-new-form">
                <Box sx={modalStyle}>
                    <h3 id="add-new-modal">Add New Employee</h3>
                    <TextField
                        label="Name One"
                        name="NAME_ONE"
                        value={newData.NAME_ONE}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Name Two"
                        name="NAME_TWO"
                        value={newData.NAME_TWO}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="EMAIL"
                        value={newData.EMAIL}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Age"
                        name="AGE"
                        value={newData.AGE}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Joining Date"
                        name="JOINING_DATE"
                        value={newData.JOINING_DATE}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Is Active"
                        name="IS_ACTIVE_Y_N"
                        value={newData.IS_ACTIVE_Y_N}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="success" onClick={handleAdd} sx={{ marginTop: 2 }}>
                        Add
                    </Button>
                </Box>
            </Modal>
            {/* Update Modal */}
            <Modal open={isUpdateModalOpen} onClose={handleCloseUpdateModal}>
                <Box sx={modalStyle}>
                    <h3>Update Employee</h3>

                    <TextField
                        label="Name One"
                        name="NAME_ONE"
                        value={updateData.NAME_ONE}
                        onChange={(e) => handleInputUpdate(e, setUpdateData)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Name Two"
                        name="NAME_TWO"
                        value={updateData.NAME_TWO}
                        onChange={(e) => handleInputUpdate(e, setUpdateData)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="EMAIL"
                        value={updateData.EMAIL}
                        onChange={(e) => handleInputUpdate(e, setUpdateData)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Age"
                        name="AGE"
                        value={updateData.AGE}
                        onChange={(e) => handleInputUpdate(e, setUpdateData)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Joining Date"
                        name="JOINING_DATE"
                        value={updateData.JOINING_DATE}
                        onChange={(e) => handleInputUpdate(e, setUpdateData)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Is Active"
                        name="IS_ACTIVE_Y_N"
                        value={updateData.IS_ACTIVE_Y_N}
                        onChange={(e) => handleInputUpdate(e, setUpdateData)}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="success" onClick={handleUpdate} sx={{ marginTop: 2 }}>
                        Update
                    </Button>
                    <Button variant="outlined" onClick={handleCloseUpdateModal} sx={{ marginTop: 2, marginLeft: 1 }}>
                        Cancel
                    </Button>
                </Box>
            </Modal>
            <Modal open={isDeleteConfirmOpen} onClose={handleCloseDeleteConfirm}>
                <Box sx={modalStyle}>
                    <h3>Are you sure you want to delete this item?</h3>
                    <Button variant="contained" color="error" onClick={handleDelete} sx={{ marginTop: 2 }}>
                        Yes, Delete
                    </Button>
                    <Button variant="outlined" color="primary" onClick={handleCloseDeleteConfirm} sx={{ marginTop: 2, marginLeft: 1 }}>
                        Cancel
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default Toolbar;