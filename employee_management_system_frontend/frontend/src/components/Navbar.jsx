// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        👥 Employee Management System
      </div>
      
    </nav>
  );
};

const styles = {
  nav: { background:'#1a237e', color:'#fff', padding:'14px 24px',
         display:'flex', justifyContent:'space-between', alignItems:'center',
         boxShadow:'0 2px 8px rgba(0,0,0,0.2)' },
  brand: { fontSize:'20px', fontWeight:'700', color:'#fff' },
  info: { display:'flex', alignItems:'center', gap:'12px' },
  badge: { background:'rgba(255,255,255,0.15)', color:'#fff', padding:'5px 12px',
           borderRadius:'12px', fontSize:'12px' },
  version: { color:'rgba(255,255,255,0.6)', fontSize:'13px' },
};

export default Navbar;