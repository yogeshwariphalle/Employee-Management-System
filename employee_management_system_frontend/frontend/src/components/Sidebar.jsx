// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';

const menuItems = [
  { path: '/dashboard', label: '📊 Dashboard', },
  { path: '/employees', label: '👥 All Employees', },
  { path: '/employees/add', label: '➕ Add Employee', },
  { path: '/employees/search', label: '🔍 Search', },
];

const Sidebar = () => {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.menuTitle}>MENU</div>
      {menuItems.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            ...styles.menuItem,
            background: isActive ? '#283593' : 'transparent',
            color: isActive ? '#fff' : '#90caf9',
            borderLeft: isActive ? '4px solid #64b5f6' : '4px solid transparent',
          })}>
          {item.label}
        </NavLink>
      ))}
    </aside>
  );
};

const styles = {
  sidebar: { width:'230px', background:'#1a237e', minHeight:'calc(100vh - 52px)',
             padding:'16px 0', flexShrink:0 },
  menuTitle: { color:'rgba(255,255,255,0.4)', fontSize:'11px', fontWeight:'700',
               letterSpacing:'0.1em', padding:'8px 20px 12px', textTransform:'uppercase' },
  menuItem: { display:'block', padding:'12px 20px', fontSize:'14px',
              fontWeight:'500', textDecoration:'none', transition:'all 0.2s',
              marginBottom:'2px' },
};

export default Sidebar;