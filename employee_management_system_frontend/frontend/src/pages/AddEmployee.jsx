// src/pages/AddEmployee.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axios';
import { toast } from 'react-toastify';

const DEPARTMENTS = ['IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales'];
const DESIGNATIONS = ['Developer', 'Senior Developer', 'Team Lead', 'Manager',
                       'HR Manager', 'Accountant', 'QA Engineer', 'Designer'];

const AddEmployee = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', department: '',
    designation: '', salary: '', status: 'ACTIVE'
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[0-9]{10}$/.test(form.phone)) newErrors.phone = 'Must be 10 digits';
    if (!form.department) newErrors.department = 'Department is required';
    if (!form.designation) newErrors.designation = 'Designation is required';
    if (!form.salary) newErrors.salary = 'Salary is required';
    else if (parseFloat(form.salary) <= 0) newErrors.salary = 'Salary must be > 0';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // POST http://localhost:8081/api/employees
      await API.post('/employees', {
        ...form,
        salary: parseFloat(form.salary)
      });
      toast.success('✅ Employee added successfully!');
      navigate('/employees');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to add employee!';
      toast.error(`❌ ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
    if (errors[e.target.name]) {
      setErrors({...errors, [e.target.name]: ''});
    }
  };

  return (
    <div>
      <div style={styles.header}>
        <h2 style={styles.heading}>➕ Add New Employee</h2>
        <button onClick={() => navigate('/employees')} style={styles.backBtn}>
          ← Back to List
        </button>
      </div>

      <div style={styles.formCard}>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGrid}>

            {/* Name */}
            <div style={styles.field}>
              <label style={styles.label}>Full Name *</label>
              <input name="name" value={form.name}
                onChange={handleChange} placeholder="Enter full name"
                style={{...styles.input, borderColor: errors.name ? '#e53935':'#ddd'}} />
              {errors.name && <span style={styles.error}>{errors.name}</span>}
            </div>

            {/* Email */}
            <div style={styles.field}>
              <label style={styles.label}>Email Address *</label>
              <input name="email" type="email" value={form.email}
                onChange={handleChange} placeholder="Enter email"
                style={{...styles.input, borderColor: errors.email ? '#e53935':'#ddd'}} />
              {errors.email && <span style={styles.error}>{errors.email}</span>}
            </div>

            {/* Phone */}
            <div style={styles.field}>
              <label style={styles.label}>Phone Number *</label>
              <input name="phone" value={form.phone} maxLength={10}
                onChange={handleChange} placeholder="10 digit number"
                style={{...styles.input, borderColor: errors.phone ? '#e53935':'#ddd'}} />
              {errors.phone && <span style={styles.error}>{errors.phone}</span>}
            </div>

            {/* Department */}
            <div style={styles.field}>
              <label style={styles.label}>Department *</label>
              <select name="department" value={form.department}
                onChange={handleChange}
                style={{...styles.input, borderColor: errors.department ? '#e53935':'#ddd'}}>
                <option value="">-- Select Department --</option>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              {errors.department && <span style={styles.error}>{errors.department}</span>}
            </div>

            {/* Designation */}
            <div style={styles.field}>
              <label style={styles.label}>Designation *</label>
              <select name="designation" value={form.designation}
                onChange={handleChange}
                style={{...styles.input, borderColor: errors.designation ? '#e53935':'#ddd'}}>
                <option value="">-- Select Designation --</option>
                {DESIGNATIONS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              {errors.designation && <span style={styles.error}>{errors.designation}</span>}
            </div>

            {/* Salary */}
            <div style={styles.field}>
              <label style={styles.label}>Salary (₹) *</label>
              <input name="salary" type="number" value={form.salary}
                onChange={handleChange} placeholder="Enter salary amount"
                style={{...styles.input, borderColor: errors.salary ? '#e53935':'#ddd'}} />
              {errors.salary && <span style={styles.error}>{errors.salary}</span>}
            </div>

            {/* Status */}
            <div style={styles.field}>
              <label style={styles.label}>Status</label>
              <select name="status" value={form.status} onChange={handleChange}
                style={styles.input}>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="ON_LEAVE">ON LEAVE</option>
              </select>
            </div>

          </div>

          {/* Buttons */}
          <div style={styles.btnRow}>
            <button type="button" onClick={() => navigate('/employees')}
              style={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? '⏳ Saving...' : '✅ Add Employee'}
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
           fontSize:'14px', transition:'border 0.2s', width:'100%' },
  error: { color:'#e53935', fontSize:'12px', marginTop:'2px' },
  btnRow: { display:'flex', justifyContent:'flex-end', gap:'12px' },
  cancelBtn: { background:'#f5f5f5', color:'#555', border:'1px solid #ddd',
               padding:'11px 24px', borderRadius:'8px', fontSize:'14px', fontWeight:'600' },
  submitBtn: { background:'#1a237e', color:'#fff', border:'none',
               padding:'11px 28px', borderRadius:'8px', fontSize:'14px', fontWeight:'600' },
};

export default AddEmployee;