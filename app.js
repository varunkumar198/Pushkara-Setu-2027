// Pushkara Setu 2027 Frontend Application Controller
const state = {
  currentTab: 'dashboard',
  totalPilgrims: 1428950,
  diversionActive: true,
  audioPlaying: false,
  ghats: [
    { id: 'G-01', name: 'Kotilingala Ghat', capacity: 25000, occupancy: 21800, wait: 45, depth: 1.4, status: 'Critical / Divert', level: 'red' },
    { id: 'G-02', name: 'Pushkar Ghat', capacity: 30000, occupancy: 27900, wait: 45, depth: 1.2, status: 'Critical / Divert', level: 'red' },
    { id: 'G-03', name: 'Saraswati Ghat', capacity: 15000, occupancy: 6200, wait: 5, depth: 1.5, status: 'Smooth / Recommended', level: 'green' },
    { id: 'G-04', name: 'Markandeya Ghat', capacity: 12000, occupancy: 4100, wait: 5, depth: 1.3, status: 'Smooth / Recommended', level: 'green' },
    { id: 'G-05', name: 'Gowthami Ghat', capacity: 18000, occupancy: 7500, wait: 5, depth: 1.6, status: 'Smooth / Recommended', level: 'green' }
  ],
  parking: [
    { name: 'Diwancheruvu Satellite Hub', total: 3500, occupied: 1850 },
    { name: 'Lalacheruvu Transit Lot', total: 2800, occupied: 2620 },
    { name: 'Kovvur Bridge Approach', total: 4000, occupied: 1200 }
  ]
};

function switchTab(tabId) {
  state.currentTab = tabId;
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

  const activeContent = document.getElementById(tabId + '-view');
  if (activeContent) activeContent.style.display = 'block';

  const activeBtn = document.getElementById('btn-' + tabId);
  if (activeBtn) activeBtn.classList.add('active');
}

function renderGhatTable() {
  const tbody = document.getElementById('ghat-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  state.ghats.forEach(g => {
    const pct = Math.round((g.occupancy / g.capacity) * 100);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${g.name}</strong><br><span style="font-size:0.75rem; color:#94a3b8;">${g.id}</span></td>
      <td>
        <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:0.8rem;">
          <span>${g.occupancy.toLocaleString()} / ${g.capacity.toLocaleString()}</span>
          <span><strong>${pct}%</strong></span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill fill-${g.level}" style="width: ${pct}%"></div>
        </div>
      </td>
      <td><strong>${g.wait} mins</strong></td>
      <td>${g.depth} m</td>
      <td><span class="badge badge-${g.level}">${g.status}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

function renderParking() {
  const container = document.getElementById('parking-container');
  if (!container) return;
  container.innerHTML = '';

  state.parking.forEach(p => {
    const free = p.total - p.occupied;
    const pct = Math.round((p.occupied / p.total) * 100);
    const isCritical = pct > 85;

    const div = document.createElement('div');
    div.style.marginBottom = '1rem';
    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:4px;">
        <span><strong>${p.name}</strong></span>
        <span>${free} slots free (${pct}% full)</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill fill-${isCritical ? 'red' : 'green'}" style="width: ${pct}%"></div>
      </div>
    `;
    container.appendChild(div);
  });
}

function toggleAudio() {
  state.audioPlaying = !state.audioPlaying;
  const btn = document.getElementById('play-btn');
  const label = document.getElementById('audio-status');
  if (state.audioPlaying) {
    btn.innerHTML = '⏸';
    label.innerText = 'Now Playing: Sacred Pushkara Snanam Guidelines (Telugu) [Simulated Stream]';
  } else {
    btn.innerHTML = '▶';
    label.innerText = 'Audio paused. Click play to listen.';
  }
}

function submitSos(e) {
  e.preventDefault();
  const name = document.getElementById('sos-name').value;
  const desc = document.getElementById('sos-desc').value;
  const msgBox = document.getElementById('sos-msg');
  msgBox.style.display = 'block';
  msgBox.innerHTML = `<strong>Incident Logged Successfully!</strong> Case Ref: #LF-${Math.floor(1000 + Math.random() * 9000)}. Dispatched to Rajamahendravaram ICCC Desk & Volunteer App (SLA: &lt; 15 mins).`;
  document.getElementById('sos-form').reset();
}

window.addEventListener('DOMContentLoaded', () => {
  renderGhatTable();
  renderParking();

  // Periodic telemetry simulation
  setInterval(() => {
    state.totalPilgrims += Math.floor(Math.random() * 45);
    const counter = document.getElementById('total-pilgrims-counter');
    if (counter) counter.innerText = state.totalPilgrims.toLocaleString();
  }, 3000);
});
