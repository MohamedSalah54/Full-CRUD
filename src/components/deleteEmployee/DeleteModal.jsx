import Modal from "@mui/material/Modal";  
import Box from "@mui/material/Box";  
import Button from "@mui/material/Button";  
import { useData } from "../dataContext";  

const modalStyle = {
  position: "absolute",  // Positioning the modal in the center of the screen
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",  // Centering the modal
  width: 300,  // Setting the modal width
  bgcolor: "white",  // White background for the modal
  borderRadius: 2,  // Rounded corners for the modal
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",  // Adding a shadow effect to the modal
  p: 4,  // Padding inside the modal
  textAlign: "center",  // Center-aligning the text within the modal
};

// The DeleteConfirm component is used for confirming the deletion of an item
const DeleteConfirm = ({ isOpen, onClose, deleteId }) => {
  const { deleteRow } = useData();  // Accessing the deleteRow function from the context to delete an item

  // Function to handle the deletion of an item
  const handleDelete = () => {
    deleteRow(deleteId);  // Calling the deleteRow function to delete the item with the provided ID
    onClose();  // Closing the modal after the deletion
  };

  return (
    <Modal
      open={isOpen}  // Modal visibility control based on the isOpen prop
      onClose={onClose}  // Function to close the modal when the user clicks outside or cancels
      aria-labelledby="delete-confirm-title"  // Accessibility label for the modal title
      aria-describedby="delete-confirm-description"  // Accessibility label for the modal description
      role="dialog"  // Defining the modal's role for accessibility
    >
      <Box sx={modalStyle} role="document">  
        <h3 id="delete-confirm-title">Are you sure you want to delete this item?</h3>  
        <p id="delete-confirm-description">  
          Deleting this item will remove it permanently. Please confirm your action.
        </p>

        {/* Button to confirm the deletion */}
        <Button
          variant="contained"  // Making the button solid
          color="error"  // Setting the button color to error (red)
          onClick={handleDelete}  // Triggering the handleDelete function when clicked
          sx={{ marginTop: 2 }}  // Adding top margin to the button for spacing
          aria-pressed="false"  // Accessibility attribute indicating the button's state
        >
          Yes, Delete  
        </Button>
        
        {/* Button to cancel the deletion */}
        <Button
          variant="outlined"  // Making the button outlined (bordered)
          color="primary"  // Setting the button color to primary (blue)
          onClick={onClose}  // Calling the onClose function to close the modal without deleting
          sx={{ marginTop: 2, marginLeft: 1 }}  // Adding top margin and left margin to the button
          aria-pressed="false"  // Accessibility attribute indicating the button's state
        >
          Cancel  
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteConfirm;  
