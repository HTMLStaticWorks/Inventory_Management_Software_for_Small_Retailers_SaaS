/* ==========================================================================
   STOCKFLOW - RETAILER DASHBOARD JAVASCRIPT
   Single Page Application Controller for dashboard.html
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. THEME & RTL SYNC WITH LOCALSTORAGE ---
  const savedTheme = localStorage.getItem('stockflow_theme') || 'light';
  const savedRTL = localStorage.getItem('stockflow_rtl') || 'ltr';

  document.documentElement.setAttribute('data-theme', savedTheme);
  document.documentElement.setAttribute('dir', savedRTL);

  const dashThemeBtn = document.getElementById('dashThemeBtn');
  const dashRTLBtn = document.getElementById('dashRTLBtn');

  function updateToggleButtons() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    if (dashThemeBtn) dashThemeBtn.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
    if (dashRTLBtn) dashRTLBtn.innerHTML = '⇄';
  }
  updateToggleButtons();

  if (dashThemeBtn) {
    dashThemeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('stockflow_theme', next);
      updateToggleButtons();
    });
  }

  if (dashRTLBtn) {
    dashRTLBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('dir') || 'ltr';
      const next = current === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', next);
      localStorage.setItem('stockflow_rtl', next);
      updateToggleButtons();
    });
  }

  // --- 2. SINGLE PAGE DASHBOARD HASH ROUTER ---
  const viewPanels = document.querySelectorAll('.view-panel');
  const navBtns = document.querySelectorAll('.js-dash-nav');
  const pageTitle = document.getElementById('dashPageTitle');

  const viewTitles = {
    overview: "Overview",
    inventory: "Inventory",
    "purchase-orders": "Purchase Orders",
    alerts: "Low Stock Alerts",
    "sales-reports": "Sales Reports",
    "inventory-reports": "Inventory Reports",
    locations: "Locations",
    suppliers: "Suppliers",
    billing: "Subscription & Billing",
    settings: "Settings",
    help: "Help & Support"
  };

  function switchDashboardView(hashName) {
    const cleanHash = (hashName || 'overview').replace('#', '');
    const targetHash = viewTitles[cleanHash] ? cleanHash : 'overview';

    // Hide all views & remove active class
    viewPanels.forEach(panel => panel.classList.remove('active'));
    navBtns.forEach(btn => btn.classList.remove('active'));

    // Show target view
    const targetPanel = document.getElementById(`view-${targetHash}`);
    if (targetPanel) targetPanel.classList.add('active');

    // Highlight active nav item
    const activeNavBtn = document.querySelector(`.js-dash-nav[data-target="${targetHash}"]`);
    if (activeNavBtn) activeNavBtn.classList.add('active');

    // Update Topbar Title
    if (pageTitle) pageTitle.textContent = viewTitles[targetHash];

    // Close mobile sidebar if open
    const sidebar = document.getElementById('dashSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  }

  // Handle click on sidebar menu items
  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = btn.dataset.target;
      window.location.hash = `#${targetView}`;
      switchDashboardView(targetView);
    });
  });

  // Handle hash changes or page initial load
  window.addEventListener('hashchange', () => {
    switchDashboardView(window.location.hash);
  });

  // Initial render on page refresh
  switchDashboardView(window.location.hash);

  // --- 3. MOBILE SIDEBAR DRAWER TOGGLE ---
  const dashSidebar = document.getElementById('dashSidebar');
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  if (sidebarToggleBtn && dashSidebar) {
    sidebarToggleBtn.addEventListener('click', () => {
      const isActive = dashSidebar.classList.toggle('active');
      if (sidebarOverlay) {
        if (isActive) sidebarOverlay.classList.add('active');
        else sidebarOverlay.classList.remove('active');
      }
    });
  }

  if (sidebarOverlay && dashSidebar) {
    sidebarOverlay.addEventListener('click', () => {
      dashSidebar.classList.remove('active');
      sidebarOverlay.classList.remove('active');
    });
  }

  // --- 4. TOPBAR SEARCH & DROPDOWN ---
  const topbarSearchInput = document.getElementById('topbarSearchInput');
  const searchResultsDropdown = document.getElementById('searchResultsDropdown');

  const searchableData = [
    { title: "Classic Cotton Shirt (SH-104)", category: "Inventory", hash: "inventory" },
    { title: "Canvas Tote Bag (CT-208)", category: "Inventory", hash: "inventory" },
    { title: "Ceramic Mug (MG-301)", category: "Inventory", hash: "inventory" },
    { title: "PO-2048 - Northline Supplies", category: "Purchase Order", hash: "purchase-orders" },
    { title: "PO-2047 - Urban Wholesale", category: "Purchase Order", hash: "purchase-orders" },
    { title: "Northline Supplies", category: "Supplier", hash: "suppliers" },
    { title: "Urban Wholesale", category: "Supplier", hash: "suppliers" },
    { title: "Downtown Branch", category: "Location", hash: "locations" }
  ];

  if (topbarSearchInput && searchResultsDropdown) {
    topbarSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) {
        searchResultsDropdown.classList.remove('active');
        searchResultsDropdown.innerHTML = '';
        return;
      }

      const matches = searchableData.filter(item => 
        item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
      );

      if (matches.length > 0) {
        searchResultsDropdown.innerHTML = matches.map(m => `
          <div class="search-item-result" data-hash="${m.hash}">
            <strong>${m.title}</strong>
            <span style="font-size: 0.75rem; color: var(--dash-text-muted); display: block;">Category: ${m.category}</span>
          </div>
        `).join('');
        searchResultsDropdown.classList.add('active');
      } else {
        searchResultsDropdown.innerHTML = `<div class="search-item-result" style="cursor: default;">No matching retail items found.</div>`;
        searchResultsDropdown.classList.add('active');
      }
    });

    searchResultsDropdown.addEventListener('click', (e) => {
      const item = e.target.closest('.search-item-result');
      if (item && item.dataset.hash) {
        window.location.hash = `#${item.dataset.hash}`;
        switchDashboardView(item.dataset.hash);
        searchResultsDropdown.classList.remove('active');
        topbarSearchInput.value = '';
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.topbar-search-wrapper')) {
        searchResultsDropdown.classList.remove('active');
      }
    });
  }

  // --- 5. NOTIFICATION DRAWER TOGGLE ---
  const notifBtn = document.getElementById('notifBtn');
  const notificationDrawer = document.getElementById('notificationDrawer');
  const closeNotifBtn = document.getElementById('closeNotifBtn');
  const notifBadge = document.querySelector('.notification-badge');
  const markReadBtn = document.getElementById('markReadBtn');

  if (notifBtn && notificationDrawer) {
    notifBtn.addEventListener('click', () => {
      notificationDrawer.classList.add('active');
    });

    if (closeNotifBtn) {
      closeNotifBtn.addEventListener('click', () => {
        notificationDrawer.classList.remove('active');
      });
    }

    if (markReadBtn && notifBadge) {
      markReadBtn.addEventListener('click', () => {
        notifBadge.style.display = 'none';
        showToast("All notifications marked as read.");
      });
    }
  }

  // --- 6. TOAST NOTIFICATION UTILITY ---
  const toastContainer = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastText');

  function showToast(message) {
    if (toastContainer && toastText) {
      toastText.textContent = message;
      toastContainer.classList.add('active');
      setTimeout(() => {
        toastContainer.classList.remove('active');
      }, 3500);
    }
  }

  // Trigger toasts on specific dashboard actions
  document.body.addEventListener('click', (e) => {
    if (e.target.closest('.js-create-po-btn')) {
      showToast("Purchase order draft created successfully!");
    }
    if (e.target.closest('.js-save-settings-btn')) {
      showToast("Store settings saved successfully!");
    }
  });

  // --- 7. STOCK ADJUSTMENT MODAL INTERACTION ---
  const adjustStockModal = document.getElementById('adjustStockModal');
  const closeStockModalBtn = document.getElementById('closeStockModalBtn');
  const adjustStockForm = document.getElementById('adjustStockForm');

  document.body.addEventListener('click', (e) => {
    if (e.target.closest('.js-open-adjust-modal')) {
      const row = e.target.closest('tr');
      const prodName = row ? row.cells[0]?.textContent : "Selected Item";
      const itemTitleEl = document.getElementById('modalItemTitle');
      if (itemTitleEl) itemTitleEl.textContent = prodName;

      if (adjustStockModal) adjustStockModal.classList.add('active');
    }
  });

  if (closeStockModalBtn && adjustStockModal) {
    closeStockModalBtn.addEventListener('click', () => {
      adjustStockModal.classList.remove('active');
    });
  }

  if (adjustStockForm) {
    adjustStockForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (adjustStockModal) adjustStockModal.classList.remove('active');
      showToast("Inventory stock quantity updated successfully.");
    });
  }

  // --- 8. PURCHASE ORDER STATUS FILTER TABS ---
  const poFilterBtns = document.querySelectorAll('.js-po-filter');
  const poRows = document.querySelectorAll('.js-po-row');

  poFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      poFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.status;
      poRows.forEach(row => {
        if (filter === 'all' || row.dataset.status === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // --- 9. HELP FAQ ACCORDION TOGGLE ---
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      if (item) item.classList.toggle('active');
    });
  });
});
