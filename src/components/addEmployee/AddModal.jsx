import Modal from "@mui/material/Modal";  
import Box from "@mui/material/Box";  
import TextField from "@mui/material/TextField";  
import Button from "@mui/material/Button";  
import { useState } from "react";  
import { useData } from "../dataContext";  
import toast from "react-hot-toast";  

const modalStyle = {
  position: "absolute",  // Positioning the modal in the center of the screen
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",  // Centering the modal
  width: 400,  // Setting the modal width
  bgcolor: "white",  // White background for the modal
  borderRadius: 2,  // Rounded corners for the modal
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",  // Adding a shadow effect to the modal
  p: 4,  // Padding inside the modal
  textAlign: "center",  // Center-aligning the text within the modal
};

const AddModal = ({ isOpen, onClose }) => {
  // Initializing the state to manage the new employee's data
  const [newData, setNewData] = useState({
    NAME_ONE: "",
    NAME_TWO: "",
    EMAIL: "",
    AGE: "",
    JOINING_DATE: "",
    IS_ACTIVE_Y_N: "",
  });

  const { addRow } = useData();  // Accessing the addRow function from the context to add a new row

  // Function to handle input changes in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;  // Extracting the name and value from the input
    setNewData((prev) => ({ ...prev, [name]: value }));  // Updating the state with the new input value
  };

  // Function to handle the form submission for adding a new employee
  const handleAdd = () => {
    const { NAME_ONE, NAME_TWO, EMAIL, AGE, JOINING_DATE, IS_ACTIVE_Y_N } = newData;
    // Checking if all required fields are filled
    if (NAME_ONE && NAME_TWO && EMAIL && AGE && JOINING_DATE && IS_ACTIVE_Y_N) {
      addRow({ NAME_ONE, NAME_TWO, EMAIL, AGE, JOINING_DATE, IS_ACTIVE_Y_N });  // Calling the addRow function to add the new employee
      setNewData({ NAME_ONE: "", NAME_TWO: "", EMAIL: "", AGE: "", JOINING_DATE: "", IS_ACTIVE_Y_N: "" });  // Resetting the form fields after submission
      onClose();  // Closing the modal after submission
    } else {
      toast.error("Please fill all fields!");  // Displaying an error if any field is empty
    }
  };

  return (
    <Modal
      open={isOpen}  // Modal visibility controlled by the isOpen prop
      onClose={onClose}  // Function to close the modal when clicked outside or canceled
      aria-labelledby="add-employee-title"  // Accessibility label for the modal title
      aria-describedby="add-employee-description"  // Accessibility label for the modal description
      role="dialog"  // Defining the modal's role for accessibility
    >
      <Box sx={modalStyle} role="document">  
        <h3 id="add-employee-title">Add New Employee</h3>  
        <p id="add-employee-description">  
          Fill in the details below to add a new employee to the system.
        </p>

        {/* Rendering input fields for each data property */}
        {Object.keys(newData).map((key) => (
          <TextField
            key={key}  // Using the key to uniquely identify each field
            label={key.replace("_", " ")}  // Replacing underscores with spaces for the label
            name={key}  // Assigning the name attribute for each input field
            value={newData[key]}  // Setting the value of the input field to the corresponding state value
            onChange={handleInputChange}  // Handling input changes
            fullWidth  // Making the input field span the full width of the modal
            margin="normal"  // Adding normal margin for spacing
            aria-label={key.replace("_", " ")}  // Accessibility label for the input field
            required  // Marking the field as required for submission
          />
        ))}

        {/* Button to submit the form and add the new employee */}
        <Button
          variant="contained"  // Making the button solid
          color="success"  // Setting the button color to success (green)
          onClick={handleAdd}  // Triggering the handleAdd function when clicked
          sx={{ marginTop: 2 }}  // Adding top margin to the button for spacing
          aria-pressed="false"  // Accessibility attribute indicating the button's state
        >
          Add  
        </Button>
      </Box>
    </Modal>
  );
};

export default AddModal;  
