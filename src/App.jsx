import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DataTable from './components/DataTable';
import { DataProvider } from './components/dataContext';

function App() {
  return (
    <DataProvider>
    <Router>
      <Routes>
        <Route path="/" element={<DataTable />} />
      </Routes>
    </Router>
    </DataProvider>
  );
}

export default App;
