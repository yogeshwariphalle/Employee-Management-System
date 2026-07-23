// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // GET http://localhost:8081/api/employees/dashboard
    API.get('/employees/dashboard')
      .then(res => { setStats(res.data); setLoading(false); })
      .catch(() => { toast.error('Failed to load dashboard!'); setLoading(false); });
  }, []);

  if (loading) return <div style={styles.loading}>⏳ Loading...</div>;

  const cards = [
    { label:'Total Employees', value: stats?.totalEmployees || 0,
      color:'#1565c0', bg:'#e3f2fd', icon:'👥', path:'/employees' },
    { label:'Active Employees', value: stats?.activeEmployees || 0,
      color:'#2e7d32', bg:'#e8f5e9', icon:'✅', path:'/employees/status/ACTIVE' },
    { label:'Inactive', value: stats?.inactiveEmployees || 0,
      color:'#c62828', bg:'#ffebee', icon:'❌', path:'/employees' },
    { label:'On Leave', value: stats?.onLeaveEmployees || 0,
      color:'#e65100', bg:'#fff3e0', icon:'🏖️', path:'/employees' },
    { label:'Total Salary Bill', value: `₹${(stats?.totalSalaryBill || 0).toLocaleString('en-IN')}`,
      color:'#6a1b9a', bg:'#f3e5f5', icon:'💰', path:'/employees' },
  ];

  return (
    <div>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.heading}>📊 Dashboard</h2>
        <button onClick={() => navigate('/employees/add')} style={styles.addBtn}>
          ➕ Add Employee
        </button>
      </div>

      {/* Stats Cards */}
      <div style={styles.grid}>
        {cards.map((card, i) => (
          <div key={i}
               style={{...styles.card, borderTop:`4px solid ${card.color}`,
                       background: card.bg}}
               onClick={() => navigate(card.path)}>
            <div style={styles.cardIcon}>{card.icon}</div>
            <div style={{...styles.cardValue, color: card.color}}>{card.value}</div>
            <div style={styles.cardLabel}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Department Wise */}
      {stats?.departmentWiseCount && (
        <div style={styles.deptCard}>
          <h3 style={styles.deptTitle}>🏢 Department Wise Count</h3>
          <div style={styles.deptGrid}>
            {Object.entries(stats.departmentWiseCount).map(([dept, count]) => (
              <div key={dept} style={styles.deptItem}>
                <div style={styles.deptName}>{dept}</div>
                <div style={styles.deptBar}>
                  <div style={{
                    ...styles.deptFill,
                    width:`${Math.min((count / stats.totalEmployees) * 100, 100)}%`
                  }}/>
                </div>
                <div style={styles.deptCount}>{count} employees</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  loading: { textAlign:'center', padding:'60px', color:'#666', fontSize:'18px' },
  header: { display:'flex', justifyContent:'space-between',
            alignItems:'center', marginBottom:'24px' },
  heading: { color:'#1a237e', fontSize:'24px', margin:0 },
  addBtn: { background:'#1a237e', color:'#fff', border:'none',
            padding:'10px 20px', borderRadius:'8px', fontSize:'14px',
            fontWeight:'600' },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px,1fr))',
          gap:'16px', marginBottom:'24px' },
  card: { padding:'22px', borderRadius:'12px', textAlign:'center',
          cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.08)',
          transition:'transform 0.2s' },
  cardIcon: { fontSize:'32px', marginBottom:'8px' },
  cardValue: { fontSize:'36px', fontWeight:'700', margin:'4px 0' },
  cardLabel: { color:'#555', fontSize:'13px', fontWeight:'500' },
  deptCard: { background:'#fff', borderRadius:'12px', padding:'24px',
              boxShadow:'0 2px 8px rgba(0,0,0,0.08)' },
  deptTitle: { color:'#1a237e', marginBottom:'20px', fontSize:'16px' },
  deptGrid: { display:'flex', flexDirection:'column', gap:'14px' },
  deptItem: { display:'grid', gridTemplateColumns:'120px 1fr 100px',
              alignItems:'center', gap:'12px' },
  deptName: { fontWeight:'600', fontSize:'13px', color:'#333' },
  deptBar: { background:'#e0e0e0', borderRadius:'6px', height:'10px', overflow:'hidden' },
  deptFill: { background:'linear-gradient(90deg,#1a237e,#42a5f5)',
              height:'100%', borderRadius:'6px', transition:'width 1s' },
  deptCount: { fontSize:'12px', color:'#666', textAlign:'right' },
};

export default Dashboard;