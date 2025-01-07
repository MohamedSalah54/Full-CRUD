import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io"; 
import { IoPencilSharp } from "react-icons/io5"; 
import { MdDelete } from "react-icons/md"; 
import AddModal from "./addEmployee/AddModal"; 
import UpdateModal from "./updateEmployee/UpdateModal"; 
import DeleteConfirm from "./deleteEmployee/DeleteModal"; 
import { Toaster } from "react-hot-toast"; 

const Toolbar = ({ selectedId, rows }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Modal for adding employee
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Modal for updating employee
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); // Modal for confirming delete
  const [updateData, setUpdateData] = useState({}); // Data for updating employee
  const [deleteId, setDeleteId] = useState(null); // ID of the employee to be deleted

  // useEffect hook to update the selected employee data whenever the selectedId or rows change
  useEffect(() => {
    if (selectedId) {
      const selectedRow = rows.find((row) => row.id === selectedId); // Find the selected row
      setUpdateData(selectedRow || {}); // Set update data if found
    }
  }, [selectedId, rows]); // Re-run whenever selectedId or rows change

  // Functions to handle opening and closing modals
  const handleOpenAddModal = () => setIsAddModalOpen(true); // Open add modal
  const handleCloseAddModal = () => setIsAddModalOpen(false); // Close add modal

  const handleOpenUpdateModal = () => setIsUpdateModalOpen(true); // Open update modal
  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false); // Close update modal

  const handleOpenDeleteConfirm = (id) => { // Open delete confirmation modal with selected ID
    setDeleteId(id); // Set delete ID to the selected employee's ID
    setIsDeleteConfirmOpen(true); // Show delete confirmation modal
  };
  const handleCloseDeleteConfirm = () => setIsDeleteConfirmOpen(false); // Close delete confirmation modal

  return (
    <div className="container-toolbar">
      {/* Displaying Toaster component for notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Container for action buttons (Add, Update, Delete) */}
      <div className="container-btn">
        {/* Button to add a new employee */}
        <button
          className="custom-btn add-btn"
          onClick={handleOpenAddModal}
          aria-label="Add New Employee" // Accessibility label
        >
          <IoMdAdd className="btn-icon" /> 
          Add New
        </button>

        {/* Button to delete selected employee */}
        <button
          className="custom-btn delete-btn"
          onClick={() => handleOpenDeleteConfirm(selectedId)} // Pass selectedId to delete confirmation
          disabled={!selectedId} // Disable if no employee is selected
          aria-label="Delete Selected Employee" // Accessibility label
          aria-disabled={!selectedId} // Accessibility for disabled state
        >
          <MdDelete className="btn-icon" /> 
          Delete
        </button>

        {/* Button to update selected employee */}
        <button
          className="custom-btn update-btn"
          onClick={handleOpenUpdateModal} // Open update modal
          disabled={!selectedId} // Disable if no employee is selected
          aria-label="Update Selected Employee" // Accessibility label
          aria-disabled={!selectedId} // Accessibility for disabled state
        >
          <IoPencilSharp className="btn-icon" /> 
          Update
        </button>
      </div>

      {/* Modals for Add, Update, and Delete actions */}
      <AddModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal} // Close function for add modal
        aria-labelledby="add-employee-modal-title" // Accessibility label for modal title
        aria-describedby="add-employee-modal-description" // Accessibility description for modal
      />
      <UpdateModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal} // Close function for update modal
        updateData={updateData} // Data for updating employee
        setUpdateData={setUpdateData} // Function to update data
        selectedId={selectedId} // Selected employee ID for update
        aria-labelledby="update-employee-modal-title" // Accessibility label for modal title
        aria-describedby="update-employee-modal-description" // Accessibility description for modal
      />
      <DeleteConfirm
        isOpen={isDeleteConfirmOpen}
        onClose={handleCloseDeleteConfirm} // Close function for delete confirmation modal
        deleteId={deleteId} // Employee ID to delete
        aria-labelledby="delete-employee-modal-title" // Accessibility label for modal title
        aria-describedby="delete-employee-modal-description" // Accessibility description for modal
      />
    </div>
  );
};

export default Toolbar; 
