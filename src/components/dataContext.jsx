import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://677bd9b020824100c07b0032.mockapi.io/api/employee/namesemployee');
        const data = await response.json();

        if (Array.isArray(data)) {
          const formattedData = data.map((item) => ({
            id: item.id,
            NAME_ONE: item.NAME_ONE,
            NAME_TWO: item.NAME_TWO,
            EMAIL: item.EMAIL,
            AGE: item.AGE,
            JOINING_DATE: item.JOINING_DATE,
            IS_ACTIVE_Y_N: item.IS_ACTIVE_Y_N,
          }));
          setRows(formattedData);
        } else {
          console.error('Fetched data is not an array:', data);
          setRows([]);
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again later")
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // إضافة صف جديد
  const addRow = async (newRow) => {
    try {
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

      if (response.ok) {
        const addedRow = await response.json();
        setRows((prevRows) => [
          ...prevRows,
          addedRow, // إضافة الصف الجديد مباشرة إلى الـ state
        ]);
        toast.success('New employee added!');
      } else {
        toast.error('Failed to add new employee.');
      }
    } catch (error) {
      toast.error('Network error! Please try again later.');
    }
  };

 
  const deleteRow = async (id) => {
    if (!id) {
      toast.error('Invalid ID provided.');
      return;
    }
  
    try {
      const response = await fetch(`https://677bd9b020824100c07b0032.mockapi.io/api/employee/namesemployee/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        toast.success('Employee deleted successfully!');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        toast.error(`Failed to delete employee: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      toast.error('Network error! Please try again later.');
    }
  };
  
  const updateRow = async (id, updatedData) => {
    try {
      const response = await fetch(`https://677bd9b020824100c07b0032.mockapi.io/api/employee/namesemployee/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedRow = await response.json();
        setRows((prevRows) => prevRows.map((row) => (row.id === id ? updatedRow : row)));
        toast.success('Employee updated successfully!');
      } else {
        toast.error('Failed to update employee.');
      }
    } catch (error) {
      toast.error('Network error! Please try again later.');
    }
  };

  return (
    <DataContext.Provider value={{ rows, loading, addRow, deleteRow, updateRow }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => React.useContext(DataContext);
