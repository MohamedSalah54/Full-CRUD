import Modal from "@mui/material/Modal";  
import Box from "@mui/material/Box"; 
import TextField from "@mui/material/TextField";  
import Button from "@mui/material/Button";  
import { useData } from "../dataContext";  
import toast from "react-hot-toast";  

const modalStyle = {
  position: "absolute",  // Positioning the modal at the center of the screen
  top: "50%",  
  left: "50%",
  transform: "translate(-50%, -50%)",  // Centering the modal
  width: 400,
  bgcolor: "white",  // Setting the background color to white
  borderRadius: 2,  // Rounded corners for the modal
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",  // Adding a shadow effect to the modal
  p: 4,  // Padding inside the modal
  textAlign: "center",  // Centering the text inside the modal
};

// The UpdateModal component is used for updating employee details
const UpdateModal = ({ isOpen, onClose, updateData, setUpdateData, selectedId }) => {
  const { updateRow } = useData();  // Accessing the updateRow function from the context

  // Handles changes in input fields and updates the state for the respective field
  const handleInputChange = (e) => {
    const { name, value } = e.target;  // Extracting name and value from the input field
    setUpdateData((prev) => ({ ...prev, [name]: value }));  // Updating the state with the new value
  };

  // Handles the update action when the Update button is clicked
  const handleUpdate = () => {
    // Checking if all fields are filled before submitting
    if (Object.values(updateData).every((val) => val)) {
      updateRow(selectedId, updateData);  // Calling the updateRow function to update the data
      setUpdateData({});  // Resetting the updateData state
      onClose();  // Closing the modal after the update
    } else {
      toast.error("Please fill all fields!");  // Showing an error toast if any field is empty
    }
  };

  return (
    <Modal
      open={isOpen}  // Modal visibility control
      onClose={onClose}  // Function to close the modal
      aria-labelledby="update-modal-title"  // Accessibility label for the modal title
      aria-describedby="update-modal-description"  // Accessibility label for the modal description
      role="dialog"  // Defining the role of the modal
    >
      <Box sx={modalStyle} role="document">  
        <h3 id="update-modal-title">Update Employee</h3>  
        <p id="update-modal-description">  
          Update the employee details in the form below and click Update to save the changes.
        </p>

        {/* Rendering input fields dynamically based on the keys of updateData */}
        {Object.keys(updateData).map((key) => (
          <TextField
            key={key}  // Unique key for each input field
            label={key.replace("_", " ")}  // Formatting the label by replacing underscores with spaces
            name={key}  // The name attribute used to identify the field
            value={updateData[key]}  // Binding the input value to the corresponding data in updateData
            onChange={handleInputChange}  // Handling input changes
            fullWidth  // Making the input field take full width
            margin="normal"  // Setting normal margin for the inputs
            aria-label={key.replace("_", " ")}  // Accessibility label for each input field
          />
        ))}
        
        {/* Update button to trigger the handleUpdate function */}
        <Button
          variant="contained"
          color="success"
          onClick={handleUpdate}  // Triggering the handleUpdate function when clicked
          sx={{ marginTop: 2 }}  // Adding top margin to the button
          aria-pressed="false"  // Accessibility attribute for button state
        >
          Update  
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateModal;  
