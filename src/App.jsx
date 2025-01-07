import DataTable from './components/DataTable';
import { DataProvider } from './components/dataContext';

function App() {
  return (
    <DataProvider>
      <DataTable />
    </DataProvider>
  );
}

export default App;
