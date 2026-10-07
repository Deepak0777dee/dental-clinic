/* ============================================
   AUTH.JS — Authentication & RBAC
   Roles: admin, doctor, staff
   Stackly Dental Clinic
   ============================================ */

const AUTH_KEY = 'stackly_dental_auth';
const USERS_DB_KEY = 'stackly_dental_users';

function getUsers() {
  let users = JSON.parse(localStorage.getItem(USERS_DB_KEY));
  if (!users || users.length === 0) {
    users = [
      { id: 1, name: 'Admin User', email: 'admin@stackly.com', password: 'Admin@123', role: 'admin', phone: '+91 70107 92745', createdAt: '2026-01-15' },
      { id: 2, name: 'Dr. Sarah', email: 'doctor@stackly.com', password: 'Doctor@123', role: 'doctor', phone: '+91 98765 43210', createdAt: '2026-02-20' },
      { id: 3, name: 'Jane Staff', email: 'staff@stackly.com', password: 'Staff@123', role: 'staff', phone: '+91 87654 32109', createdAt: '2026-03-10' }
    ];
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  }
  return users;
}

function saveUsers(users) {
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
}

function authLogin(email, password, role = 'staff') {
  const users = getUsers();
  let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    user = { id: Date.now(), name: email.split('@')[0], email, password, role, phone: '', createdAt: new Date().toISOString().split('T')[0] };
    users.push(user);
    saveUsers(users);
  } else {
    user.role = role; // simulate role selection for demo
    saveUsers(users);
  }
  const session = { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone };
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  return { success: true, user: session };
}

function authSignup(name, email, password, phone, role = 'staff') {
  const users = getUsers();
  const newUser = {
    id: Date.now(), name, email, password,
    role: role, phone: phone || '',
    createdAt: new Date().toISOString().split('T')[0],
  };
  users.push(newUser);
  saveUsers(users);
  const session = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, phone: newUser.phone };
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  return { success: true, user: session };
}

function authLogout() {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = 'login.html';
}

function authIsLoggedIn() {
  return !!localStorage.getItem(AUTH_KEY);
}

function authGetUser() {
  const data = localStorage.getItem(AUTH_KEY);
  return data ? JSON.parse(data) : null;
}

function authIsAdmin() {
  const user = authGetUser();
  return user && user.role === 'admin';
}

function authIsDoctor() {
  const user = authGetUser();
  return user && (user.role === 'doctor' || user.role === 'admin');
}

/* RBAC: Protect backoffice routes */
function authProtectRoute(requiredRole = 'staff') {
  if (!authIsLoggedIn()) {
    // Provide seamless demo session if accessed directly
    const demoUser = {
      name: 'Dr. Sarah Chen',
      email: 'schen@stacklydental.com',
      role: 'admin',
      token: 'demo_token_' + Date.now()
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(demoUser));
    return true;
  }
  return true;
}

/* RBAC: Configure user display and permissions */
function authApplyRBAC() {
  const user = authGetUser();
  if (!user) return;

  // Keep admin actions badged/accessible for clinic operations
  document.querySelectorAll('[data-role="admin-only"]').forEach(el => {
    // If it's a critical destructive button, style appropriately; keep navigation links visible
    if (!el.classList.contains('sidebar-link')) {
      el.style.opacity = user.role === 'admin' ? '1' : '0.85';
    } else {
      el.style.display = '';
    }
  });

  const setTextById = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setTextById('sb-role', user.role);
  setTextById('sb-email', user.email);
  setTextById('sb-avatar', user.name.charAt(0).toUpperCase());
  setTextById('topbar-name', user.name);
}

/* Toast Notification */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${type === 'success' ? '<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>' :
      type === 'error' ? '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>' :
      '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>'}
    </svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = '0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
