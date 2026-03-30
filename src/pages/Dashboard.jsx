import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
    const [activeModule, setActiveModule] = useState('Employee Management');
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const modules = [
        { id: 'Company', name: 'Company Management', icon: 'fa-building', sub: ['Entity', 'Division', 'Department', 'Section', 'Designation', 'Work Sites', 'Levels', 'Org Planning'] },
        { id: 'Employee', name: 'Employee Management', icon: 'fa-users', sub: ['Staff Details', 'Job Contract', 'Job Description', 'Document Management'] },
        { id: 'Activity', name: 'Activity Management', icon: 'fa-bolt', sub: ['Promotion', 'Transfer', 'Admonition', 'Suspension', 'Separation', 'Resignations', 'Reports'] },
        { id: 'Performance', name: 'Performance Management', icon: 'fa-chart-pie', sub: ['Rating', 'Mapping', 'Peer Settings', 'Evaluations', 'Question Templates', 'Voting'] },
        { id: 'Attendance', name: 'Attendance & Time', icon: 'fa-clock', sub: ['Board', 'Today Status', 'Monthly View', 'Adjustment', 'Remote Work', 'Overtime', 'Shifts'] },
        { id: 'Leave', name: 'Leave Management', icon: 'fa-calendar-alt', sub: ['Requests', 'Status', 'Balance', 'Adjustment', 'Planner', 'Blackout'] },
        { id: 'Travel', name: 'Travel Management', icon: 'fa-plane', sub: ['Tickets', 'Official Trips', 'Expenses', 'Travel Settings'] },
        { id: 'Payroll', name: 'Payroll Management', icon: 'fa-money-bill-wave', sub: ['Salary Additions', 'Deductions', 'Monthly Deductions', 'Hold Salary', 'Payments', 'Processing'] },
        { id: 'Expat', name: 'Expat Management', icon: 'fa-globe', sub: ['Apply Process', 'Verification', 'Quota Setup', 'Visa Management', 'Alerts'] },
        { id: 'Config', name: 'System Configuration', icon: 'fa-cog', sub: ['Org Setup', 'Attendance Settings', 'Leave Policies', 'Salary Policies', 'Holidays'] },
        { id: 'Comp', name: 'Compensation', icon: 'fa-gift', sub: ['Accommodation', 'Medical', 'Assets', 'Passport', 'Utility', 'Bonuses'] },
        { id: 'LMS', name: 'Learning Management', icon: 'fa-graduation-cap', sub: ['Courses', 'Trainers', 'Batches', 'Reviews'] },
        { id: 'SelfService', name: 'Employee Self-Service', icon: 'fa-user-circle', sub: ['Dashboard', 'Timeline', 'Announcements', 'Salary Slip', 'Audit Logs'] },
        { id: 'Recruitment', name: 'Recruitment', icon: 'fa-user-plus', sub: ['Candidate Forms', 'Application Tracking', 'Documents'] },
        { id: 'Admin', name: 'Administration', icon: 'fa-user-shield', sub: ['User Roles', 'Permissions', 'Access Control', 'Logs'] },
    ];

    const stats = [
        { label: 'Total Employees', value: '1,284', icon: 'fa-users', color: 'blue' },
        { label: 'Present Today', value: '1,156', icon: 'fa-user-check', color: 'green' },
        { label: 'Leave Requests', value: '12', icon: 'fa-calendar-plus', color: 'orange' },
        { label: 'Pending Payroll', value: '45', icon: 'fa-wallet', color: 'purple' },
    ];

    const employees = [
        { id: 'EMP001', name: 'John Doe', role: 'Full-Stack Developer', dept: 'Engineering', status: 'Active' },
        { id: 'EMP002', name: 'Jane Smith', role: 'UI/UX Designer', dept: 'Design', status: 'Active' },
        { id: 'EMP003', name: 'Mike Johnson', role: 'HR Manager', dept: 'Human Resources', status: 'Pending' },
        { id: 'EMP004', name: 'Sarah Wilson', role: 'Product Manager', dept: 'Product', status: 'Away' },
        { id: 'EMP005', name: 'Alex Brown', role: 'QA Engineer', dept: 'Engineering', status: 'Active' },
    ];

    return (
        <div className="db-container">
            {/* Sidebar Navigation */}
            <aside className={`db-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
                <div className="db-logo">
                    <img src="/assets/images/logo1.png" alt="HRMetricS" />
                    {!isSidebarCollapsed && <span className="fw-bold fs-5 text-white">HRMetricS</span>}
                </div>
                
                <nav className="db-nav">
                    <div className="db-nav-group-title">{!isSidebarCollapsed && 'System Modules'}</div>
                    {modules.map((mod) => (
                        <div 
                            key={mod.id} 
                            className={`db-nav-item ${activeModule === mod.name ? 'active' : ''}`}
                            onClick={() => setActiveModule(mod.name)}
                        >
                            <i className={`fas ${mod.icon}`}></i>
                            {!isSidebarCollapsed && <span>{mod.name}</span>}
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Main Application Area */}
            <main className="db-main">
                {/* Topbar */}
                <header className="db-header">
                    <div className="db-search">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Global search for employees, reports, or modules..." />
                    </div>
                    
                    <div className="db-user-nav">
                        <div className="db-icon-btn">
                            <i className="fas fa-bell"></i>
                            <span className="db-badge">3</span>
                        </div>
                        <div className="db-icon-btn">
                            <i className="fas fa-envelope"></i>
                            <span className="db-badge">8</span>
                        </div>
                        <div className="d-flex align-items-center gap-2 cursor-pointer ms-2">
                            <div className="db-avatar bg-primary text-white">AD</div>
                            {!isSidebarCollapsed && <div>
                                <div className="fw-bold small">Admin User</div>
                                <div className="text-muted" style={{fontSize: '11px'}}>System Admin</div>
                            </div>}
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="db-content">
                    <div className="db-title-row">
                        <div>
                            <h2>{activeModule}</h2>
                            <div className="db-breadcrumb">Dashboard / {activeModule}</div>
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-outline-secondary btn-sm"><i className="fas fa-file-export me-2"></i>Export</button>
                            <button className="btn btn-primary btn-sm"><i className="fas fa-plus me-2"></i>Add Record</button>
                        </div>
                    </div>

                    {/* Stats Summary */}
                    <div className="db-stats-grid">
                        {stats.map((s, i) => (
                            <div key={i} className="db-stat-card">
                                <div className="db-stat-info">
                                    <h3>{s.label}</h3>
                                    <div className="value">{s.value}</div>
                                </div>
                                <div className={`db-stat-icon icon-${s.color}`}>
                                    <i className={`fas ${s.icon}`}></i>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Module Sub-Pages (Tabs) */}
                    <div className="mb-4 d-flex gap-3 border-bottom pb-2">
                        {modules.find(m => m.name === activeModule)?.sub.map((sub, i) => (
                            <span key={i} className={`pb-2 px-1 cursor-pointer small fw-bold ${i === 0 ? 'border-bottom border-primary border-3 text-primary' : 'text-muted'}`}>
                                {sub}
                            </span>
                        ))}
                    </div>

                    {/* Content Table */}
                    <div className="db-card">
                        <div className="db-card-header">
                            <h4>Active Records</h4>
                            <div className="d-flex gap-2">
                                <input type="text" placeholder="Filter by name..." className="form-control form-control-sm" style={{width: '200px'}} />
                                <button className="btn btn-light btn-sm bord"><i className="fas fa-filter"></i></button>
                            </div>
                        </div>
                        <div className="db-table-wrapper">
                            <table className="db-table">
                                <thead>
                                    <tr>
                                        <th>Employee ID</th>
                                        <th>Name</th>
                                        <th>Designation</th>
                                        <th>Department</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((emp) => (
                                        <tr key={emp.id}>
                                            <td className="fw-bold">{emp.id}</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="db-avatar">{emp.name.split(' ').map(n=>n[0]).join('')}</div>
                                                    {emp.name}
                                                </div>
                                            </td>
                                            <td>{emp.role}</td>
                                            <td>{emp.dept}</td>
                                            <td>
                                                <span className={`db-status-badge status-${emp.status.toLowerCase()}`}>
                                                    {emp.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="btn btn-sm text-primary"><i className="fas fa-edit"></i></button>
                                                <button className="btn btn-sm text-danger"><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
