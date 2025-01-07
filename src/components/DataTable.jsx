import { DataGrid } from '@mui/x-data-grid'; 
import Paper from '@mui/material/Paper'; 
import { useData } from './DataContext'; 
import Toolbar from './Toolbar'; 
import { useState } from 'react'; 
import BeatLoader from 'react-spinners/BeatLoader'; 

const columns = [
  { field: 'id', headerName: 'ID', width: 70 }, // Column for ID
  { field: 'NAME_ONE', headerName: 'Name One', width: 130 }, // Column for english name
  { field: 'NAME_TWO', headerName: 'Name Two', width: 130 }, // Column for arabic name
  { field: 'EMAIL', headerName: 'Email', width: 130 }, // Column for Email
  { field: 'AGE', headerName: 'Age', width: 130 }, // Column for Age
  { field: 'JOINING_DATE', headerName: 'Joining Date', width: 130 }, 
  { field: 'IS_ACTIVE_Y_N', headerName: 'Is Active', width: 130 }, 
];

export default function DataTable() {
  const paginationModel = { page: 0, pageSize: 5 };

  // Fetch the rows and loading state from the custom hook 'useData'
  const { rows, loading } = useData();

  // State to keep track of the selected row's ID
  const [selectedId, setSelectedId] = useState(null);

  // Function to handle row selection
  const handleRowSelection = (selectionModel) => {
    if (selectionModel.length > 0) {
      // If a row is selected, update the selectedId state with the selected row's ID
      const selectedRowId = selectionModel[0]; 
      setSelectedId(selectedRowId);
      console.log('Selected Row ID:', selectedRowId);
    }
  };

  // If data is still loading, show a loading spinner inside a Paper component
  if (loading) {
    return (
      <div>
        {/* Toolbar component with the selectedId and rows as props */}
        <Toolbar selectedId={selectedId} rows={rows} />
        
        {/* Paper component to hold the loading spinner */}
        <Paper sx={{ height: 400, width: '100%', marginTop: 2 }} className="loader-paper">
          <div className="loader-container">
            {/* BeatLoader spinner is displayed while loading */}
            <BeatLoader color="#00bcd4" loading={loading} size={15} />
          </div>
        </Paper>
      </div>
    );
  }

  // Once data is loaded, display the DataGrid with rows and columns
  return (
    <div>
      {/* Toolbar component for displaying selected row ID */}
      <Toolbar selectedId={selectedId} rows={rows} />
      
      {/* Paper component containing the DataGrid */}
      <Paper sx={{ height: 400, width: '100%', marginTop: 2 }}>
        <DataGrid
          rows={rows} // The rows of data to be displayed in the grid
          columns={columns} // The columns defined above
          initialState={{ pagination: { paginationModel } }} // Set the initial pagination model
          pageSizeOptions={[5, 10]} // Allow pagination with 5 or 10 rows per page
          sx={{ border: 0 }} // Remove borders from the DataGrid
          checkboxSelection // Enable checkbox selection for rows
          onRowSelectionModelChange={handleRowSelection} // Handle row selection changes
          aria-label="Data Table" // Set accessibility label for the table
          aria-describedby="data-table-description" // Set accessibility description
          getRowClassName={(params) =>
            params.row.id === selectedId ? 'selected-row' : '' // Add CSS class for selected row
          }
          componentsProps={{
            row: {
              tabIndex: 0, // Set tab index for rows for better accessibility
              role: 'row', // Set role as 'row' for accessibility
            },
            cell: {
              role: 'cell', // Set role as 'cell' for accessibility
            },
          }}
          getRowId={(row) => row.id} // Define the unique row ID
          aria-rowcount={rows.length} // Set total row count for accessibility
          aria-colcount={columns.length} // Set total column count for accessibility
        />
      </Paper>

      {/* Hidden description for the data table (for accessibility) */}
      <div id="data-table-description" style={{ display: 'none' }}>
        This is a table displaying data rows with information such as ID, Name, Email, Age, and more.
      </div>
    </div>
  );
}
