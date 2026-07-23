// src/pages/SearchEmployee.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axios';
import { toast } from 'react-toastify';

const SearchEmployee = () => {
  const [keyword, setKeyword] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [department, setDepartment] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!keyword.trim()) {
      toast.warning('Enter a keyword to search!');
      return;
    }
    setLoading(true);
    try {
      // GET http://localhost:8081/api/employees/search?keyword=...
      const res = await API.get(`/employees/search?keyword=${keyword}`);
      setResults(res.data);
      setSearched(true);
    } catch {
      toast.error('Search failed!');
    } finally {
      setLoading(false);
    }
  };

  const handleSalarySearch = async () => {
    if (!minSalary || !maxSalary) {
      toast.warning('Enter both min and max salary!');
      return;
    }
    setLoading(true);
    try {
      // GET http://localhost:8081/api/employees/salary?min=...&max=...
      const res = await API.get(`/employees/salary?min=${minSalary}&max=${maxSalary}`);
      setResults(res.data);
      setSearched(true);
    } catch {
      toast.error('Salary search failed!');
    } finally {
      setLoading(false);
    }
  };

  const handleDeptSearch = async () => {
    if (!department) {
      toast.warning('Enter department name!');
      return;
    }
    setLoading(true);
    try {
      // GET http://localhost:8081/api/employees/department/{dept}
      const res = await API.get(`/employees/department/${department}`);
      setResults(res.data);
      setSearched(true);
    } catch {
      toast.error('Department search failed!');
    } finally {
      setLoading(false);
    }
  };

  const statusColor = {
    ACTIVE: { bg:'#e8f5e9', color:'#2e7d32' },
    INACTIVE: { bg:'#ffebee', color:'#c62828' },
    ON_LEAVE: { bg:'#fff3e0', color:'#e65100' },
  };

  return (
    <div>
      <h2 style={{color:'#1a237e', marginBottom:'20px', fontSize:'22px'}}>
        🔍 Search Employees
      </h2>

      {/* Search Cards */}
      <div style={styles.searchGrid}>

        {/* Keyword Search */}
        <div style={styles.searchCard}>
          <h3 style={styles.searchTitle}>🔤 Search by Keyword</h3>
          <p style={styles.searchHint}>Search by name, email, or department</p>
          <div style={styles.searchRow}>
            <input
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="e.g. Yogeshwari, IT, developer..."
              style={styles.searchInput}
              onKeyPress={e => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch} style={styles.searchBtn}>
              🔍 Search
            </button>
          </div>
        </div>

        {/* Salary Range Search */}
        <div style={styles.searchCard}>
          <h3 style={styles.searchTitle}>💰 Search by Salary Range</h3>
          <p style={styles.searchHint}>Find employees within salary range</p>
          <div style={styles.salaryRow}>
            <input type="number" value={minSalary}
              onChange={e => setMinSalary(e.target.value)}
              placeholder="Min salary" style={styles.searchInput} />
            <span style={{color:'#666', fontWeight:'600'}}>to</span>
            <input type="number" value={maxSalary}
              onChange={e => setMaxSalary(e.target.value)}
              placeholder="Max salary" style={styles.searchInput} />
            <button onClick={handleSalarySearch} style={styles.searchBtn}>
              🔍 Search
            </button>
          </div>
        </div>

        {/* Department Search */}
        <div style={styles.searchCard}>
          <h3 style={styles.searchTitle}>🏢 Search by Department</h3>
          <p style={styles.searchHint}>Find all employees in a department</p>
          <div style={styles.searchRow}>
            <select value={department}
              onChange={e => setDepartment(e.target.value)}
              style={styles.searchInput}>
              <option value="">-- Select Department --</option>
              {['IT','HR','Finance','Marketing','Operations','Sales'].map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <button onClick={handleDeptSearch} style={styles.searchBtn}>
              🔍 Search
            </button>
          </div>
        </div>

      </div>

      {/* Results */}
      {loading && <p style={styles.loading}>⏳ Searching...</p>}

      {searched && !loading && (
        <div style={styles.resultsCard}>
          <h3 style={styles.resultsTitle}>
            📋 Results ({results.length} found)
          </h3>
          {results.length === 0 ? (
            <p style={styles.empty}>No employees found matching your search.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Salary</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {results.map((emp, i) => (
                  <tr key={emp.id}>
                    <td>{i + 1}</td>
                    <td style={{fontWeight:'600', color:'#1a237e'}}>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>{emp.designation}</td>
                    <td style={{fontWeight:'600', color:'#2e7d32'}}>
                      ₹{emp.salary?.toLocaleString('en-IN')}
                    </td>
                    <td>
                      <span style={{...styles.statusBadge,
                                    background: statusColor[emp.status]?.bg,
                                    color: statusColor[emp.status]?.color}}>
                        {emp.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => navigate(`/employees/edit/${emp.id}`)}
                        style={styles.editBtn}>
                        ✏️ Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  searchGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',
                gap:'16px', marginBottom:'24px' },
  searchCard: { background:'#fff', padding:'20px', borderRadius:'12px',
                boxShadow:'0 2px 8px rgba(0,0,0,0.08)' },
  searchTitle: { color:'#1a237e', marginBottom:'6px', fontSize:'15px' },
  searchHint: { color:'#888', fontSize:'12px', marginBottom:'14px' },
  searchRow: { display:'flex', gap:'8px' },
  salaryRow: { display:'flex', gap:'8px', alignItems:'center', flexWrap:'wrap' },
  searchInput: { flex:1, padding:'10px 12px', border:'1.5px solid #ddd',
                 borderRadius:'8px', fontSize:'13px', minWidth:'80px' },
  searchBtn: { background:'#1a237e', color:'#fff', border:'none',
               padding:'10px 16px', borderRadius:'8px', fontSize:'13px',
               fontWeight:'600', whiteSpace:'nowrap' },
  loading: { textAlign:'center', padding:'30px', color:'#666' },
  resultsCard: { background:'#fff', borderRadius:'12px', overflow:'hidden',
                 boxShadow:'0 2px 8px rgba(0,0,0,0.08)' },
  resultsTitle: { color:'#1a237e', padding:'16px 20px',
                  borderBottom:'1px solid #f0f0f0', fontSize:'15px' },
  empty: { textAlign:'center', padding:'40px', color:'#999' },
  statusBadge: { padding:'3px 10px', borderRadius:'12px',
                 fontSize:'11px', fontWeight:'700' },
  editBtn: { background:'#e3f2fd', color:'#1565c0', border:'none',
             padding:'6px 12px', borderRadius:'6px', fontSize:'12px', fontWeight:'600' },
};

export default SearchEmployee;