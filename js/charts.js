/* ============================================
   CHARTS.JS — Stackly Dental Clinic
   Light Theme Cinematic Chart.js Configurations
   ============================================ */

const CHART_COLORS = {
  primary: '#1a2b3c',
  primaryLight: '#2c3e50',
  accent: '#2ba89d',
  accentLight: '#3cc4b7',
  warm: '#e8734a',
  warmLight: '#f09878',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  purple: '#8b5cf6',
  gray: '#a0aec0',
};

Chart.defaults.color = '#718096';
Chart.defaults.font.family = "'Outfit', sans-serif";
Chart.defaults.font.size = 11;

const CHART_DEFAULTS = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'top',
      align: 'end',
      labels: {
        usePointStyle: true,
        pointStyle: 'rectRounded',
        padding: 20,
        boxWidth: 8,
        boxHeight: 8
      }
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: '#1a2b3c',
      bodyColor: '#4a5568',
      borderColor: 'rgba(26, 43, 60, 0.1)',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
      boxPadding: 4,
      boxShadow: '0 4px 15px rgba(26, 43, 60, 0.1)'
    }
  }
};

const GRID_CONFIG = {
  color: 'rgba(26, 43, 60, 0.05)',
  borderDash: [4, 4],
  drawBorder: false
};

const TICK_CONFIG = {
  color: '#718096',
  padding: 10
};

/* ---- Dashboard Page Charts ---- */
function initDashboardCharts() {
  const trendCtx = document.getElementById('patientTrendChart');
  if (trendCtx) {
    new Chart(trendCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
          {
            label: 'New Patients',
            data: [45, 52, 65, 80, 74, 90, 85, 110],
            borderColor: CHART_COLORS.accent,
            backgroundColor: 'transparent',
            tension: 0.4, // Smooth curves for healthcare
            borderWidth: 3,
            pointRadius: 4,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: CHART_COLORS.accent,
            pointBorderWidth: 2
          },
          {
            label: 'Revenue (₹L)',
            data: [4.5, 5.2, 6.8, 8.5, 7.2, 9.5, 8.8, 11.2],
            borderColor: CHART_COLORS.warm,
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 4,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: CHART_COLORS.warm,
            pointBorderWidth: 2,
            borderDash: [5, 5]
          }
        ]
      },
      options: {
        ...CHART_DEFAULTS,
        scales: {
          y: { beginAtZero: true, grid: GRID_CONFIG, ticks: TICK_CONFIG, border: { display: false } },
          x: { grid: { display: false }, ticks: TICK_CONFIG, border: { display: false } }
        }
      }
    });
  }

  const typeCtx = document.getElementById('serviceTypeChart');
  if (typeCtx) {
    new Chart(typeCtx, {
      type: 'polarArea',
      data: {
        labels: ['General', 'Cosmetic', 'Implants', 'Ortho', 'Surgery'],
        datasets: [{
          data: [35, 25, 20, 15, 5],
          backgroundColor: [
            'rgba(43, 168, 157, 0.7)', 'rgba(232, 115, 74, 0.7)', 'rgba(59, 130, 246, 0.7)',
            'rgba(139, 92, 246, 0.7)', 'rgba(245, 158, 11, 0.7)'
          ],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        ...CHART_DEFAULTS,
        scales: {
          r: {
            ticks: { display: false },
            grid: { color: 'rgba(26, 43, 60, 0.05)' },
            angleLines: { color: 'rgba(26, 43, 60, 0.05)' }
          }
        }
      }
    });
  }

  const revenueCtx = document.getElementById('revenueChart');
  if (revenueCtx) {
    new Chart(revenueCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
          label: 'Revenue (₹L)',
          data: [4.5, 5.2, 6.8, 8.5, 7.2, 9.5, 8.8, 11.2],
          backgroundColor: CHART_COLORS.accent,
          borderRadius: 8, 
          barThickness: 16,
          borderSkipped: false
        }]
      },
      options: {
        ...CHART_DEFAULTS,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: GRID_CONFIG, ticks: { ...TICK_CONFIG, callback: v => '₹' + v + 'L' }, border: { display: false } },
          x: { grid: { display: false }, ticks: TICK_CONFIG, border: { display: false } }
        }
      }
    });
  }

  const weeklyCtx = document.getElementById('weeklyAppointmentsChart');
  if (weeklyCtx) {
    new Chart(weeklyCtx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [{
          label: 'Appointments',
          data: [18, 22, 19, 25, 20, 28],
          borderColor: CHART_COLORS.warm,
          backgroundColor: 'rgba(232, 115, 74, 0.1)',
          tension: 0.4,
          fill: true,
          borderWidth: 2,
          pointStyle: false 
        }]
      },
      options: {
        ...CHART_DEFAULTS,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { display: false }, ticks: { display: false }, border: { display: false } },
          x: { grid: { display: false }, ticks: TICK_CONFIG, border: { display: false } }
        }
      }
    });
  }
}

/* ---- Generic function to expose initializers ---- */
window.initDashboardCharts = initDashboardCharts;
