import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useData } from './DataContext';
import Toolbar from './Toolbar';
import { useState } from 'react';

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
  const [selectedId, setSelectedId] = useState(null);

  // تحديث selectedId عند اختيار row
  const handleRowSelection = (selectionModel) => {
    if (selectionModel.length > 0) {
      const selectedRowId = selectionModel[0]; // أخذ أول عنصر في الاختيار
      setSelectedId(selectedRowId);
      console.log('Selected Row ID:', selectedRowId);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Toolbar selectedId={selectedId} rows={rows}/> {/* تمرير rows إلى Toolbar */}
      <Paper sx={{ height: 400, width: '100%', marginTop: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          onRowSelectionModelChange={handleRowSelection} // استخدم هذه الخاصية
        />
      </Paper>
    </div>
  );
}
