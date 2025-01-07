import React, { createContext, useState, useEffect } from 'react';  
import toast from 'react-hot-toast';  

// Creating a Context to store and share data across the application
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // State to store the data (rows) and loading state
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect to fetch data when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching data from the API using fetch
        const response = await fetch('https://677bd9b020824100c07b0032.mockapi.io/api/employee/namesemployee');
        const data = await response.json();

        // Checking if the fetched data is an array
        if (Array.isArray(data)) {
          // Formatting data to match the expected structure
          const formattedData = data.map((item) => ({
            id: item.id,
            NAME_ONE: item.NAME_ONE,
            NAME_TWO: item.NAME_TWO,
            EMAIL: item.EMAIL,
            AGE: item.AGE,
            JOINING_DATE: item.JOINING_DATE,
            IS_ACTIVE_Y_N: item.IS_ACTIVE_Y_N,
          }));
          setRows(formattedData);  // Updating the rows state with the formatted data
        } else {
          console.error('Fetched data is not an array:', data);  // Error if the data is not an array
          setRows([]);  // Setting empty data if the response is not valid
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again later");  // Showing an error toast if the fetch fails
      } finally {
        setLoading(false);  // Setting loading state to false after the data is fetched or fails
      }
    };

    fetchData();  // Calling the fetchData function when the component is mounted
  }, []);  // Empty dependency array to run only once when the component mounts

  // Function to add a new row (employee)
  const addRow = async (newRow) => {
    try {
      // Sending a POST request to the API to add a new row
      const response = await fetch('https://677bd9b020824100c07b0032.mockapi.io/api/employee/namesemployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          NAME_ONE: newRow.NAME_ONE,
          NAME_TWO: newRow.NAME_TWO,
          EMAIL: newRow.EMAIL,
          AGE: newRow.AGE,
          JOINING_DATE: newRow.JOINING_DATE,
          IS_ACTIVE_Y_N: newRow.IS_ACTIVE_Y_N,
        }),
      });

      // If the response is successful, add the new row to the existing rows
      if (response.ok) {
        const addedRow = await response.json();
        setRows((prevRows) => [
          ...prevRows,
          addedRow,  // Adding the new row to the existing rows
        ]);
        toast.success('New employee added');  // Showing a success toast
      } else {
        toast.error('Failed to add new employee.');  // Showing an error toast if the addition fails
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later');  // Showing an error toast if the request fails
    }
  };

  // Function to delete a row (employee) by ID
  const deleteRow = async (id) => {
    if (!id) {
      toast.error('Invalid ID provided.');  // Showing an error toast if the ID is invalid
      return;
    }

    try {
      // Sending a DELETE request to the API to remove the row
      const response = await fetch(`https://677bd9b020824100c07b0032.mockapi.io/api/employee/namesemployee/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Removing the deleted row from the state
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        toast.success('Employee deleted successfully');  // Showing a success toast
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);  // Logging the error if the deletion fails
        toast.error(`Failed to delete employee: ${errorData.message || 'Unknown error'}`);  // Showing an error toast with the error message
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later');  // Showing an error toast if the request fails
    }
  };

  // Function to update a row (employee) by ID
  const updateRow = async (id, updatedData) => {
    try {
      // Sending a PUT request to the API to update the row
      const response = await fetch(`https://677bd9b020824100c07b0032.mockapi.io/api/employee/namesemployee/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),  // Sending the updated data in the request body
      });

      if (response.ok) {
        const updatedRow = await response.json();
        // Updating the rows state with the updated row
        setRows((prevRows) => prevRows.map((row) => (row.id === id ? updatedRow : row)));
        toast.success('Employee updated successfully');  // Showing a success toast
      } else {
        toast.error('Failed to update employee.');  // Showing an error toast if the update fails
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');  // Showing an error toast if the request fails
    }
  };

  return (
    <DataContext.Provider value={{ rows, loading, addRow, deleteRow, updateRow }}>
      {children} 
    </DataContext.Provider>
  );
};

export const useData = () => React.useContext(DataContext);
