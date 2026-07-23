// src/pages/EditEmployee.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../axios';
import { toast } from 'react-toastify';

const DEPARTMENTS = ['IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales'];
const DESIGNATIONS = ['Developer', 'Senior Developer', 'Team Lead', 'Manager',
                       'HR Manager', 'Accountant', 'QA Engineer', 'Designer'];

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    name:'', email:'', phone:'', department:'',
    designation:'', salary:'', status:'ACTIVE'
  });

  useEffect(() => {
    // GET http://localhost:8081/api/employees/{id}
    API.get(`/employees/${id}`)
      .then(res => {
        const emp = res.data;
        setForm({
          name: emp.name || '',
          email: emp.email || '',
          phone: emp.phone || '',
          department: emp.department || '',
          designation: emp.designation || '',
          salary: emp.salary || '',
          status: emp.status || 'ACTIVE',
        });
        setFetching(false);
      })
      .catch(() => {
        toast.error('Employee not found!');
        navigate('/employees');
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // PUT http://localhost:8081/api/employees/{id}
      await API.put(`/employees/${id}`, {
        ...form,
        salary: parseFloat(form.salary)
      });
      toast.success('✅ Employee updated successfully!');
      navigate('/employees');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update!';
      toast.error(`❌ ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  if (fetching) return <div style={{textAlign:'center', padding:'60px'}}>⏳ Loading...</div>;

  return (
    <div>
      <div style={styles.header}>
        <h2 style={styles.heading}>✏️ Edit Employee — {form.name}</h2>
        <button onClick={() => navigate('/employees')} style={styles.backBtn}>
          ← Back to List
        </button>
      </div>

      <div style={styles.formCard}>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGrid}>

            <div style={styles.field}>
              <label style={styles.label}>Full Name *</label>
              <input name="name" value={form.name}
                onChange={handleChange} style={styles.input} required />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Email Address *</label>
              <input name="email" type="email" value={form.email}
                onChange={handleChange} style={styles.input} required />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Phone Number *</label>
              <input name="phone" value={form.phone} maxLength={10}
                onChange={handleChange} style={styles.input} required />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Department *</label>
              <select name="department" value={form.department}
                onChange={handleChange} style={styles.input} required>
                <option value="">-- Select --</option>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Designation *</label>
              <select name="designation" value={form.designation}
                onChange={handleChange} style={styles.input} required>
                <option value="">-- Select --</option>
                {DESIGNATIONS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Salary (₹) *</label>
              <input name="salary" type="number" value={form.salary}
                onChange={handleChange} style={styles.input} required />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Status</label>
              <select name="status" value={form.status}
                onChange={handleChange} style={styles.input}>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="ON_LEAVE">ON LEAVE</option>
              </select>
            </div>

          </div>

          <div style={styles.btnRow}>
            <button type="button" onClick={() => navigate('/employees')}
              style={styles.cancelBtn}>Cancel</button>
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? '⏳ Updating...' : '💾 Update Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  header: { display:'flex', justifyContent:'space-between',
            alignItems:'center', marginBottom:'20px' },
  heading: { color:'#1a237e', fontSize:'22px', margin:0 },
  backBtn: { background:'#e8eaf6', color:'#1a237e', border:'none',
             padding:'9px 18px', borderRadius:'8px', fontSize:'13px', fontWeight:'600' },
  formCard: { background:'#fff', borderRadius:'12px', padding:'28px',
              boxShadow:'0 2px 8px rgba(0,0,0,0.08)' },
  formGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px',
              marginBottom:'24px' },
  field: { display:'flex', flexDirection:'column', gap:'6px' },
  label: { fontSize:'13px', fontWeight:'600', color:'#444' },
  input: { padding:'11px 14px', border:'1.5px solid #ddd', borderRadius:'8px',
           fontSize:'14px', width:'100%' },
  btnRow: { display:'flex', justifyContent:'flex-end', gap:'12px' },
  cancelBtn: { background:'#f5f5f5', color:'#555', border:'1px solid #ddd',
               padding:'11px 24px', borderRadius:'8px', fontSize:'14px', fontWeight:'600' },
  submitBtn: { background:'#2e7d32', color:'#fff', border:'none',
               padding:'11px 28px', borderRadius:'8px', fontSize:'14px', fontWeight:'600' },
};

export default EditEmployee;