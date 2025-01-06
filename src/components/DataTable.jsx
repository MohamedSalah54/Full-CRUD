import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useData } from './DataContext';
import Toolbar from './Toolbar';

const columns = [
    { field: 'id', headerName: 'id', width: 70 },
    { field: 'NAME_ONE', headerName: 'NAME_ONE', width: 130 },
    { field: 'NAME_TWO', headerName: 'NAME_TWO', width: 130 },
    { field: 'EMAIL', headerName: 'EMAIL', width: 130 },
    { field: 'AGE', headerName: 'AGE', width: 130 },
    { field: 'JOINING_DATE', headerName: 'JOINING_DATE', width: 130 },
    { field: 'IS_ACTIVE_Y_N', headerName: 'IS_ACTIVE_Y_N', width: 130 },
];

export default function DataTable() {
    const paginationModel = { page: 0, pageSize: 5 };
    const { rows, loading } = useData();

    const handleSelectionChange = (selectionModel) => {
        console.log("Selection Model: ", selectionModel);
        if (selectionModel && selectionModel.length > 0) {
          console.log("Selected rows: ", selectionModel);
        }
      };
      

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Toolbar />
            <Paper sx={{ height: 400, width: '100%', marginTop: 2 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    onSelectionModelChange={(newSelectionModel) => {
                        console.log("Selection Model Changed: ", newSelectionModel);
                        handleSelectionChange(newSelectionModel);
                    }}
                    sx={{ border: 0 }}
                />

            </Paper>
        </div>
    );
}
