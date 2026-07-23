// src/pages/EmployeeList.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axios';
import { toast } from 'react-toastify';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const navigate = useNavigate();

  useEffect(() => { fetchEmployees(); }, []);

  const fetchEmployees = () => {
    setLoading(true);
    // GET http://localhost:8081/api/employees
    API.get('/employees')
      .then(res => { setEmployees(res.data); setLoading(false); })
      .catch(() => { toast.error('Failed to load employees!'); setLoading(false); });
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;
    try {
      // DELETE http://localhost:8081/api/employees/{id}
      await API.delete(`/employees/${id}`);
      toast.success(`✅ ${name} deleted successfully!`);
      fetchEmployees();
    } catch {
      toast.error('❌ Failed to delete employee!');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      // PATCH http://localhost:8081/api/employees/{id}/status
      await API.patch(`/employees/${id}/status?status=${status}`);
      toast.success('✅ Status updated!');
      fetchEmployees();
    } catch {
      toast.error('❌ Failed to update status!');
    }
  };

  const statusColor = {
    ACTIVE: { bg:'#e8f5e9', color:'#2e7d32' },
    INACTIVE: { bg:'#ffebee', color:'#c62828' },
    ON_LEAVE: { bg:'#fff3e0', color:'#e65100' },
  };

  const filtered = filter === 'ALL'
    ? employees
    : employees.filter(e => e.status === filter);

  return (
    <div>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.heading}>👥 All Employees ({filtered.length})</h2>
        <div style={styles.headerRight}>
          <button onClick={fetchEmployees} style={styles.refreshBtn}>🔄 Refresh</button>
          <button onClick={() => navigate('/employees/add')} style={styles.addBtn}>
            ➕ Add Employee
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={styles.filterRow}>
        {['ALL','ACTIVE','INACTIVE','ON_LEAVE'].map(f => (
          <button key={f}
                  onClick={() => setFilter(f)}
                  style={{...styles.filterBtn,
                          background: filter===f ? '#1a237e' : '#fff',
                          color: filter===f ? '#fff' : '#555',
                          border: filter===f ? 'none' : '1px solid #ddd'}}>
            {f.replace('_',' ')}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <p style={styles.loading}>⏳ Loading employees...</p>
      ) : (
        <div style={styles.tableCard}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name & Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp, i) => (
                <tr key={emp.id}>
                  <td>{i + 1}</td>
                  <td>
                    <div style={{fontWeight:'600', color:'#1a237e'}}>{emp.name}</div>
                    <div style={{fontSize:'12px', color:'#888'}}>{emp.email}</div>
                  </td>
                  <td>{emp.phone}</td>
                  <td>
                    <span style={styles.deptBadge}>{emp.department}</span>
                  </td>
                  <td>{emp.designation}</td>
                  <td style={{fontWeight:'600', color:'#2e7d32'}}>
                    ₹{emp.salary?.toLocaleString('en-IN')}
                  </td>
                  <td>
                    <select
                      value={emp.status}
                      onChange={e => handleStatusChange(emp.id, e.target.value)}
                      style={{...styles.statusSelect,
                              background: statusColor[emp.status]?.bg,
                              color: statusColor[emp.status]?.color}}>
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                      <option value="ON_LEAVE">ON LEAVE</option>
                    </select>
                  </td>
                  <td>
                    <div style={styles.actionBtns}>
                      <button
                        onClick={() => navigate(`/employees/edit/${emp.id}`)}
                        style={styles.editBtn}>
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id, emp.name)}
                        style={styles.deleteBtn}>
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p style={styles.empty}>No employees found!</p>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  header: { display:'flex', justifyContent:'space-between',
            alignItems:'center', marginBottom:'16px' },
  heading: { color:'#1a237e', fontSize:'22px', margin:0 },
  headerRight: { display:'flex', gap:'10px' },
  refreshBtn: { background:'#e8eaf6', color:'#1a237e', border:'none',
                padding:'9px 16px', borderRadius:'7px', fontSize:'13px', fontWeight:'600' },
  addBtn: { background:'#1a237e', color:'#fff', border:'none',
            padding:'9px 18px', borderRadius:'7px', fontSize:'13px', fontWeight:'600' },
  filterRow: { display:'flex', gap:'8px', marginBottom:'16px', flexWrap:'wrap' },
  filterBtn: { padding:'8px 16px', borderRadius:'20px', fontSize:'12px',
               fontWeight:'600', cursor:'pointer', transition:'all 0.2s' },
  loading: { textAlign:'center', padding:'40px', color:'#666' },
  tableCard: { background:'#fff', borderRadius:'12px', overflow:'hidden',
               boxShadow:'0 2px 8px rgba(0,0,0,0.08)' },
  deptBadge: { background:'#e8eaf6', color:'#1a237e', padding:'3px 10px',
               borderRadius:'12px', fontSize:'12px', fontWeight:'600' },
  statusSelect: { border:'none', padding:'5px 10px', borderRadius:'12px',
                  fontSize:'12px', fontWeight:'600', cursor:'pointer' },
  actionBtns: { display:'flex', gap:'6px' },
  editBtn: { background:'#e3f2fd', color:'#1565c0', border:'none',
             padding:'6px 12px', borderRadius:'6px', fontSize:'12px', fontWeight:'600' },
  deleteBtn: { background:'#ffebee', color:'#c62828', border:'none',
               padding:'6px 12px', borderRadius:'6px', fontSize:'12px', fontWeight:'600' },
  empty: { textAlign:'center', padding:'40px', color:'#999', fontSize:'15px' },
};

export default EmployeeList;