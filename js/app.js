// State Management
let currentRole = null; 
let currentView = 'dashboard';
let currentUser = null;

// DOM Elements
const loginContainer = document.getElementById('login-container');
const appContainer = document.getElementById('app-container');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const btnLogout = document.getElementById('btn-logout');

const viewContainer = document.getElementById('view-container');
const navMenu = document.querySelector('.nav-menu');
const sidebar = document.querySelector('.sidebar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const sidebarOverlay = document.getElementById('sidebar-overlay');

const headerUsername = document.getElementById('header-username');
const headerRole = document.getElementById('header-role');
const headerAvatar = document.getElementById('header-avatar');

// Call Modal Elements
const callModal = document.getElementById('call-modal');
const btnEndCall = document.getElementById('btn-end-call');
const callTimer = document.getElementById('call-timer');
const postCallWrap = document.getElementById('post-call-wrap');
const btnSaveCall = document.getElementById('btn-save-call');

let callInterval;
let callSeconds = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupLoginListeners();
    setupAppListeners();
});

function setupLoginListeners() {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        if (user === 'admin' && pass === 'admin123') {
            currentRole = 'management';
            currentUser = 'Management Admin';
            loginSuccess();
        } else if (user === 'caller' && pass === 'caller123') {
            currentRole = 'telecaller';
            currentUser = 'Sarah Jenkins'; // using one of the mockData names
            loginSuccess();
        } else {
            loginError.classList.remove('hidden');
        }
    });

    btnLogout.addEventListener('click', (e) => {
        e.preventDefault();
        // Logout
        appContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        loginError.classList.add('hidden');
        currentRole = null;
        currentUser = null;
    });
}

function loginSuccess() {
    loginContainer.classList.add('hidden');
    appContainer.classList.remove('hidden');
    
    // Update Header
    headerUsername.textContent = currentUser;
    headerRole.textContent = currentRole === 'management' ? 'Management' : 'Telecaller';
    headerAvatar.src = currentRole === 'management' ? 'https://i.pravatar.cc/150?img=11' : 'https://i.pravatar.cc/150?img=5';

    // Generate Nav
    generateNavMenu();

    // Default View
    currentView = currentRole === 'management' ? 'dashboard' : 'telecalling';
    
    // Update active state
    const items = document.querySelectorAll('.nav-item');
    items.forEach(i => i.classList.remove('active'));
    document.querySelector(`.nav-item[data-view="${currentView}"]`).classList.add('active');

    renderView();
}

function generateNavMenu() {
    navMenu.innerHTML = '<p class="nav-label">MAIN</p>';
    
    let links = '';
    if (currentRole === 'management') {
        links += '<a href="#" class="nav-item" data-view="dashboard"><i class="ph ph-squares-four"></i> Dashboard</a>';
        links += '<a href="#" class="nav-item" data-view="leads"><i class="ph ph-users"></i> Leads & Allocation</a>';
        links += '<a href="#" class="nav-item" data-view="telecalling"><i class="ph ph-phone-call"></i> Telecalling</a>';
        links += '<a href="#" class="nav-item" data-view="analytics"><i class="ph ph-chart-bar"></i> Recording & Sentiment</a>';
        links += '<a href="#" class="nav-item" data-view="campaigns"><i class="ph ph-megaphone"></i> Campaigns</a>';
    } else {
        links += '<a href="#" class="nav-item" data-view="telecalling"><i class="ph ph-phone-call"></i> Telecalling Workspace</a>';
        links += '<a href="#" class="nav-item" data-view="leads"><i class="ph ph-users"></i> My Assigned Leads</a>';
        links += '<a href="#" class="nav-item" data-view="analytics"><i class="ph ph-chart-bar"></i> My Analytics</a>';
    }
    
    navMenu.innerHTML += links;

    // Attach listeners to new DOM nodes
    const navItems = document.querySelectorAll('.nav-item[data-view]');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');
            currentView = target.dataset.view;
            renderView();
            
            // Close mobile menu if open
            if(sidebar) sidebar.classList.remove('open');
            if(sidebarOverlay) sidebarOverlay.classList.remove('active');
        });
    });
}

function setupAppListeners() {
    // Mobile Menu Actions
    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.add('open');
            sidebarOverlay.classList.add('active');
        });
    }

    if(sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('active');
        });
    }

    // Call Modal Actions
    btnEndCall.addEventListener('click', () => {
        clearInterval(callInterval);
        document.querySelector('.pulsing-circle').style.animation = 'none';
        document.querySelector('.pulsing-circle').style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        document.querySelector('.call-status-display p').textContent = 'Call Ended';
        postCallWrap.classList.remove('hidden');
    });

    btnSaveCall.addEventListener('click', () => {
        closeCallModal();
    });
}

function renderView() {
    viewContainer.innerHTML = ''; // Clear current

    if (currentView === 'dashboard') {
        viewContainer.innerHTML = renderDashboard();
    } else if (currentView === 'leads') {
        viewContainer.innerHTML = renderLeads();
    } else if (currentView === 'telecalling') {
        viewContainer.innerHTML = renderTelecalling();
    } else if (currentView === 'analytics') {
        viewContainer.innerHTML = renderAnalytics();
    } else if (currentView === 'campaigns') {
        viewContainer.innerHTML = renderCampaigns();
    }
}

// ======================================
// VIEW RENDERERS
// ======================================

function renderDashboard() {
    return `
        <div class="page-header">
            <h1>Overview Dashboard</h1>
            <p>Welcome back, ${currentUser}! Here's what's happening today.</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon meta"><i class="ph-fill ph-meta-logo"></i></div>
                <div class="stat-info">
                    <h3>${mockStats.metaLeads}</h3>
                    <p>Meta Leads</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon justdial"><i class="ph-fill ph-phone-call"></i></div>
                <div class="stat-info">
                    <h3>${mockStats.justdialLeads}</h3>
                    <p>JustDial Leads</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon calls"><i class="ph-fill ph-headset"></i></div>
                <div class="stat-info">
                    <h3>${mockStats.activeCalls}</h3>
                    <p>Active Calls</p>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon conversion"><i class="ph-fill ph-trend-up"></i></div>
                <div class="stat-info">
                    <h3>${mockStats.conversionRate}</h3>
                    <p>Conversion Rate</p>
                </div>
            </div>
        </div>

        <div class="grid-2 mt-4">
            <div class="panel">
                <div class="panel-header">
                    <div class="panel-title"><i class="ph ph-lightning"></i> Auto-notifications Timeline</div>
                </div>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">System automatically sent SMS/Email for these events.</p>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <div style="display: flex; gap: 16px; align-items: flex-start; padding-bottom: 16px; border-bottom: 1px solid var(--border-color)">
                        <div style="background: var(--info-bg); color: var(--info); padding: 8px; border-radius: 50%;"><i class="ph ph-whatsapp-logo"></i></div>
                        <div>
                            <h4 style="font-size: 14px;">WhatsApp Brochure Sent</h4>
                            <p style="color: var(--text-secondary); font-size: 12px; margin-top: 4px;">To Rahul Sharma (Trigger: Status = Interested)</p>
                        </div>
                        <span style="margin-left: auto; font-size: 11px; color: var(--text-secondary)">2 mins ago</span>
                    </div>
                    <div style="display: flex; gap: 16px; align-items: flex-start;">
                        <div style="background: var(--warning-bg); color: var(--warning); padding: 8px; border-radius: 50%;"><i class="ph ph-envelope-simple"></i></div>
                        <div>
                            <h4 style="font-size: 14px;">Follow-up Email Triggered</h4>
                            <p style="color: var(--text-secondary); font-size: 12px; margin-top: 4px;">To 45 Leads (Trigger: Campaign = Weekend Push)</p>
                        </div>
                        <span style="margin-left: auto; font-size: 11px; color: var(--text-secondary)">1 hour ago</span>
                    </div>
                </div>
            </div>

            <div class="panel">
                <div class="panel-header">
                    <div class="panel-title"><i class="ph ph-chart-pie-slice"></i> Allocation by Area</div>
                </div>
                <div style="height: 200px; display: flex; align-items: center; justify-content: center; position: relative;">
                    <!-- Placeholder for Chart -->
                    <div style="width: 150px; height: 150px; border-radius: 50%; border: 30px solid var(--bg-dark); border-top-color: var(--area-north); border-right-color: var(--area-south); border-bottom-color: var(--area-east); border-left-color: var(--area-west);"></div>
                </div>
                <div style="display: flex; justify-content: space-around; margin-top: 20px; font-size: 12px;">
                    <span style="color: var(--area-north)">North 35%</span>
                    <span style="color: var(--area-south)">South 25%</span>
                </div>
            </div>
        </div>
    `;
}

function renderLeads() {
    let leadsToDisplay = mockLeads;
    if (currentRole === 'telecaller') {
        leadsToDisplay = mockLeads.filter(l => l.allocatedTo === currentUser);
    }

    const rows = leadsToDisplay.map(lead => `
        <tr>
            <td>
                <div class="lead-cell">
                    <div class="lead-avatar">${lead.name.charAt(0)}</div>
                    <div>
                        <span class="lead-name">${lead.name}</span>
                        <span class="lead-phone">${lead.phone}</span>
                    </div>
                </div>
            </td>
            <td>
                <span class="badge-tag badge-source ${lead.source.toLowerCase()}">
                    <i class="ph-fill ${lead.source === 'Meta' ? 'ph-meta-logo' : (lead.source === 'Justdial' ? 'ph-phone-call' : 'ph-globe')}"></i> ${lead.source}
                </span>
            </td>
            <td>
                <span class="badge-tag badge-area ${lead.area.toLowerCase()}">${lead.area}</span>
            </td>
            <td>
                <span class="badge-tag badge-status ${lead.status.toLowerCase().replace(/ /g, '-')}">${lead.status}</span>
            </td>
            <td>
                <div style="font-weight: 500; font-size: 13px;">${lead.allocatedTo}</div>
            </td>
            <td>
                <button class="btn-icon call" title="Call User" onclick="initiateCall('${lead.name}', '${lead.phone}', '${lead.source}')">
                    <i class="ph-fill ph-phone-call"></i>
                </button>
            </td>
        </tr>
    `).join('');

    return `
        <div class="page-header flex-between">
            <div>
                <h1>Lead Allocation</h1>
                <p>${currentRole === 'management' ? 'View and reassign all incoming leads.' : 'Your assigned leads for today.'}</p>
            </div>
            ${currentRole === 'management' ? '<button class="btn-primary"><i class="ph ph-export"></i> Export CSV</button>' : ''}
        </div>

        <div class="panel">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Lead Details</th>
                            <th>Source</th>
                            <th>Area</th>
                            <th>Status</th>
                            <th>Allocated To</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderTelecalling() {
    const leadsToDisplay = currentRole === 'telecaller' ? mockLeads.filter(l => l.allocatedTo === currentUser && (l.status === 'New' || l.status === 'Follow Up')) : mockLeads.filter(l => l.status === 'New');
    
    return `
        <div class="page-header">
            <h1>Telecalling Workspace</h1>
            <p>Built-in web dialer to directly call leads without switching apps.</p>
        </div>

        <div class="grid-2">
            <div class="panel">
                <div class="panel-header">
                    <div class="panel-title"><i class="ph ph-phone-outgoing"></i> Queue List (${leadsToDisplay.length})</div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 12px; max-height: 500px; overflow-y: auto; padding-right: 8px;">
                    ${leadsToDisplay.length === 0 ? '<p style="color: var(--text-secondary); padding: 20px;">No leads queued up right now.</p>' : ''}
                    ${leadsToDisplay.map(lead => `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: var(--bg-dark); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                            <div class="lead-cell">
                                <div class="lead-avatar">${lead.name.charAt(0)}</div>
                                <div>
                                    <span class="lead-name" style="font-size: 16px;">${lead.name}</span>
                                    <span class="lead-phone">${lead.phone} • <span style="color: var(--text-secondary)">${lead.status}</span></span>
                                </div>
                            </div>
                            <button class="btn-icon call" onclick="initiateCall('${lead.name}', '${lead.phone}', '${lead.source}')">
                                <i class="ph-fill ph-phone-call"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="panel" style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
                <div style="width: 100px; height: 100px; background: var(--bg-dark); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 40px; color: var(--text-secondary); margin-bottom: 24px;">
                    <i class="ph ph-headset"></i>
                </div>
                <h3 style="margin-bottom: 8px;">Ready to call</h3>
                <p style="color: var(--text-secondary);">Select a lead from the queue to start dialing.</p>
            </div>
        </div>
    `;
}

function renderAnalytics() {
    if (currentRole === 'telecaller') {
        const myRecs = mockRecordings.filter(r => r.telecaller === currentUser);
        const recList = myRecs.map(rec => `
            <div style="padding: 16px; border: 1px solid var(--border-color); border-radius: 12px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <div><strong>${rec.leadName}</strong> - Date: ${rec.date}</div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-top:4px;">Duration: ${rec.duration}</div>
                </div>
                <span class="sentiment-badge sentiment-${rec.sentiment.toLowerCase()}">${rec.sentiment}</span>
            </div>
        `).join('');

        return `
            <div class="page-header">
                <h1>My Recordings</h1>
                <p>Review your past calls and manager feedback.</p>
            </div>
            <div class="panel">
                <h3>Recent Calls</h3>
                <p style="margin-bottom: 20px; color: var(--text-secondary);">You have access to ${myRecs.length} recordings this week. Keep up the good work!</p>
                ${recList}
            </div>
        `;
    }

    // Management Analytics
    const recs = mockRecordings.map(rec => `
        <div class="panel mb-4">
            <div class="panel-header" style="margin-bottom: 0;">
                <div style="display: flex; gap: 16px; align-items: center;">
                    <div class="lead-avatar"><i class="ph ph-waveform"></i></div>
                    <div>
                        <div style="font-weight: 600; font-size: 16px;">${rec.leadName} <span class="sentiment-badge sentiment-${rec.sentiment.toLowerCase()}">${rec.sentiment}</span></div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">Caller: ${rec.telecaller} • Duration: ${rec.duration} • ${rec.date}</div>
                    </div>
                </div>
                <button class="btn-primary" onclick="toggleTranscript(${rec.id})"><i class="ph ph-text-align-left"></i> View Transcript</button>
            </div>
            
            <div id="transcript-${rec.id}" class="hidden mt-4">
                <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: var(--radius-full); display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
                    <button class="btn-icon call"><i class="ph-fill ph-play"></i></button>
                    <div style="flex-grow: 1; height: 4px; background: var(--border-color); border-radius: 4px; position: relative;">
                        <div style="position: absolute; left: 0; top: 0; height: 100%; width: 30%; background: var(--accent-primary); border-radius: 4px;"></div>
                    </div>
                    <span style="font-size: 12px;">01:12 / ${rec.duration}</span>
                </div>
                
                <h4 style="font-size: 12px; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 8px;">AI Transcript Analysis</h4>
                <div class="transcript-box">
                    ${rec.transcript.map(msg => `
                        <div class="message ${msg.sender}">
                            ${msg.text}
                            ${msg.sentiment ? `<span class="sentiment-badge sentiment-${msg.sentiment}">${msg.sentiment}</span>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');

    return `
        <div class="page-header">
            <h1>Recording Analytics</h1>
            <p>AI-driven sentiment analysis on telecaller conversations.</p>
        </div>
        ${recs}
    `;
}

function renderCampaigns() {
    return `
        <div class="page-header flex-between">
            <div>
                <h1>Campaign Management</h1>
                <p>Create WhatsApp and Email drip campaigns based on Lead status.</p>
            </div>
            <button class="btn-primary"><i class="ph ph-plus"></i> New Campaign</button>
        </div>

        <div class="panel" style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 64px; color: var(--accent-primary); margin-bottom: 24px;">
                <i class="ph-duotone ph-paper-plane-tilt"></i>
            </div>
            <h2>No active campaigns</h2>
            <p style="color: var(--text-secondary); margin-top: 12px; max-width: 400px; margin-left: auto; margin-right: auto;">
                Create rule-based campaigns. For example: "If Source is Meta and Status is New for 2 hours, send WhatsApp Brochure."
            </p>
        </div>
    `;
}

// ======================================
// CALL SIMULATOR LOGIC
// ======================================

window.initiateCall = function(name, phone, source) {
    if (!currentRole) return;
    
    // Set Data
    document.getElementById('call-name').textContent = name;
    document.getElementById('script-name').textContent = name.split(' ')[0];
    document.getElementById('script-caller-name').textContent = currentUser;
    document.getElementById('call-phone').textContent = phone;
    
    const sourceEl = document.getElementById('call-source');
    sourceEl.innerHTML = `<i class="ph-fill ph-${source.toLowerCase() === 'meta' ? 'meta-logo' : (source.toLowerCase() === 'justdial' ? 'phone-call' : 'globe')}"></i> ${source}`;
    document.getElementById('script-source').textContent = source;

    // Reset UI
    document.querySelector('.pulsing-circle').style.animation = 'pulse 2s infinite';
    document.querySelector('.pulsing-circle').style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
    document.querySelector('.call-status-display p').textContent = 'Call in progress...';
    postCallWrap.classList.add('hidden');
    callSeconds = 0;
    updateCallTimer();
    
    // Open Modal
    callModal.classList.add('active');
    
    // Start Timer
    clearInterval(callInterval);
    callInterval = setInterval(() => {
        callSeconds++;
        updateCallTimer();
    }, 1000);
};

function updateCallTimer() {
    const mins = Math.floor(callSeconds / 60).toString().padStart(2, '0');
    const secs = (callSeconds % 60).toString().padStart(2, '0');
    callTimer.textContent = `${mins}:${secs}`;
}

function closeCallModal() {
    callModal.classList.remove('active');
    clearInterval(callInterval);
    
    const statusVal = document.getElementById('lead-status-select').value;
    if(statusVal) {
        console.log("Updated to ", statusVal);
        // Reset select for next call
        document.getElementById('lead-status-select').value = "";
    }
}

// Utility
window.toggleTranscript = function(id) {
    const el = document.getElementById('transcript-' + id);
    if(el.classList.contains('hidden')) {
        el.classList.remove('hidden');
    } else {
        el.classList.add('hidden');
    }
}
