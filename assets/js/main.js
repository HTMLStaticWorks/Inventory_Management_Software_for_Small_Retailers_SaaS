/* ==========================================================================
   STOCKFLOW - PUBLIC WEBSITE JAVASCRIPT
   Theme, RTL, Mobile Menu, Interactive Demos & Login Controller
   ========================================================================== */

// --- 1 & 2. GLOBAL THEME & RTL MANAGEMENT SYSTEM ---
window.applyTheme = function(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('stockflow_theme', theme); } catch(e){}
  document.querySelectorAll('.js-theme-toggle').forEach(btn => {
    const textSpan = btn.querySelector('.theme-text');
    if (textSpan) {
      textSpan.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
    } else {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  });
};

window.toggleTheme = function() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  window.applyTheme(newTheme);
};

window.applyRTL = function(direction) {
  document.documentElement.setAttribute('dir', direction);
  try { localStorage.setItem('stockflow_rtl', direction); } catch(e){}
  document.querySelectorAll('.js-rtl-toggle').forEach(btn => {
    const textSpan = btn.querySelector('.rtl-text');
    if (textSpan) {
      textSpan.textContent = direction === 'rtl' ? '⇄ LTR' : '⇄ RTL';
    } else {
      btn.textContent = '⇄';
    }
  });
};

window.toggleRTL = function() {
  const currentRTL = document.documentElement.getAttribute('dir') || 'ltr';
  const newRTL = currentRTL === 'rtl' ? 'ltr' : 'rtl';
  window.applyRTL(newRTL);
};

window.openMobileMenu = function() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeMobileMenu = function() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.toggleMobileMenu = function() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    if (mobileMenu.classList.contains('active')) {
      window.closeMobileMenu();
    } else {
      window.openMobileMenu();
    }
  }
};

// Initialize Theme & RTL immediately
(function initThemeRTL() {
  let savedTheme = 'light';
  let savedRTL = 'ltr';
  try {
    savedTheme = localStorage.getItem('stockflow_theme') || 'light';
    savedRTL = localStorage.getItem('stockflow_rtl') || 'ltr';
  } catch(e){}
  window.applyTheme(savedTheme);
  window.applyRTL(savedRTL);
})();

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    const toggleThemeBtn = e.target.closest('.js-theme-toggle');
    if (toggleThemeBtn && !toggleThemeBtn.hasAttribute('onclick')) {
      window.toggleTheme();
    }
    const toggleRTLBtn = e.target.closest('.js-rtl-toggle');
    if (toggleRTLBtn && !toggleRTLBtn.hasAttribute('onclick')) {
      window.toggleRTL();
    }
  });

  // --- 3. MOBILE NAVBAR DRAWER ---
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.openMobileMenu();
    });

    if (closeMenuBtn) {
      closeMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.closeMobileMenu();
      });
    }

    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', (e) => {
        e.stopPropagation();
        window.closeMobileMenu();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        window.closeMobileMenu();
      }
    });

    // Close mobile menu when clicking nav links
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        window.closeMobileMenu();
      });
    });
  }

  // --- 4. HOME SECTION 03: INTERACTIVE AUTOMATION WORKFLOW ---
  const workflowData = [
    {
      title: "1. Sale Captured at POS",
      desc: "When an item is scanned or sold through your POS system, StockFlow instantly registers the transaction data across all linked retail channels.",
      badge: "Real-time Sale Event",
      img: "assets/img/workflow-1.jpg",
      fallbackImg: "assets/img/retail-store-hero.jpg"
    },
    {
      title: "2. Inventory Instantly Updated",
      desc: "Physical and digital stock quantities are automatically decremented, preventing accidental overselling in online or offline stores.",
      badge: "Live Stock Decrement",
      img: "assets/img/workflow-2.jpg",
      fallbackImg: "assets/img/hero-bg.jpg"
    },
    {
      title: "3. Stock Threshold Evaluated",
      desc: "StockFlow compares the new balance against customized safety thresholds and minimum reorder rules per product SKU.",
      badge: "Rule Evaluation",
      img: "assets/img/workflow-3.jpg",
      fallbackImg: "assets/img/integration-hub-diagram.jpg"
    },
    {
      title: "4. Low-Stock Alert Triggered",
      desc: "If inventory falls below the safety level, an instant alert is pushed to your manager dashboard and mobile notifications.",
      badge: "Instant Alert Notification",
      img: "assets/img/workflow-4.jpg",
      fallbackImg: "assets/img/shipping-fulfillment-hub.jpg"
    },
    {
      title: "5. Purchase Order Pre-Filled",
      desc: "StockFlow automatically generates a draft Purchase Order with suggested supplier quantities, ready for one-click approval.",
      badge: "Automated Draft PO",
      img: "assets/img/workflow-5.jpg",
      fallbackImg: "assets/img/hero-bg-2.jpg"
    }
  ];

  window.switchWorkflowStep = function(stepIdx) {
    const data = workflowData[stepIdx];
    if (!data) return;

    // Toggle active class on workflow buttons
    const steps = document.querySelectorAll('.workflow-step-btn');
    steps.forEach((btn, i) => {
      const bStep = parseInt(btn.getAttribute('data-step') || i, 10);
      if (bStep === stepIdx) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Dynamically query text and image elements
    const titleEl = document.getElementById('workflowTitle');
    const descEl = document.getElementById('workflowDesc');
    const badgeEl = document.getElementById('workflowBadge');
    const imgEl = document.getElementById('workflowImg');
    const detailBox = document.querySelector('.workflow-detail-box');

    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (badgeEl) badgeEl.textContent = data.badge;

    if (imgEl) {
      imgEl.style.opacity = '0.4';
      setTimeout(() => {
        imgEl.src = data.img;
        imgEl.onerror = function() {
          this.onerror = null;
          this.src = data.fallbackImg;
        };
        imgEl.alt = data.title;
        imgEl.style.opacity = '1';
      }, 100);
    }

    if (detailBox) {
      detailBox.classList.remove('workflow-pulse');
      void detailBox.offsetWidth;
      detailBox.classList.add('workflow-pulse');
    }
  };

  const workflowSteps = document.querySelectorAll('.workflow-step-btn');
  if (workflowSteps.length > 0) {
    workflowSteps.forEach((stepBtn, idx) => {
      stepBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const stepNum = parseInt(stepBtn.getAttribute('data-step') || idx, 10);
        window.switchWorkflowStep(stepNum);
      });
    });
  }

  // --- 5. HOME 2 SECTION 02: BEFORE/AFTER DRAGGABLE SLIDER ---
  const sliderWrapper = document.getElementById('beforeAfterSlider');
  const sliderHandle = document.getElementById('sliderHandle');
  const sliderAfter = document.getElementById('sliderAfter');

  if (sliderWrapper && sliderHandle && sliderAfter) {
    let isDragging = false;

    const setSliderPos = (x) => {
      const rect = sliderWrapper.getBoundingClientRect();
      let pos = (x - rect.left) / rect.width;
      if (pos < 0.05) pos = 0.05;
      if (pos > 0.95) pos = 0.95;

      const percentage = pos * 100;
      sliderHandle.style.left = `${percentage}%`;

      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      if (isRTL) {
        sliderAfter.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
      } else {
        sliderAfter.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
      }
    };

    sliderHandle.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', (e) => {
      if (isDragging) setSliderPos(e.clientX);
    });

    sliderHandle.addEventListener('touchstart', () => isDragging = true);
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches[0]) setSliderPos(e.touches[0].clientX);
    });
  }

  // --- 6. FEATURES EXPLORER TAB SWITCHER ---
  const featureTabs = document.querySelectorAll('.feature-tab-btn');
  const featureDetailTitle = document.getElementById('featureDetailTitle');
  const featureDetailDesc = document.getElementById('featureDetailDesc');
  const featureDetailBadge = document.getElementById('featureDetailBadge');
  const featureDetailImpact = document.getElementById('featureDetailImpact');
  const featureVisualContent = document.getElementById('featureVisualContent');

  const featureContentData = {
    tracking: {
      title: "Real-time Multi-Channel Inventory Tracking",
      desc: "Gain absolute control over item stock levels, variants, barcodes, and batches across physical storefronts and e-commerce channels.",
      badge: "Core Tracking",
      impact: [
        "Instant stock sync across POS registers & online stores",
        "Barcode scanning for fast stock intake & inventory counts",
        "Full audit log of every stock increment & decrement"
      ],
      visualHtml: `
        <div class="mock-widget">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <div>
              <span style="font-size:0.75rem; color:#98A2B3; text-transform:uppercase; letter-spacing:0.05em; font-weight:700;">Live Multi-Channel Inventory Sync</span>
              <div style="font-size:1.0625rem; font-weight:800; color:#FFF; margin-top:2px;">SKU-882109: Premium Denim Jacket</div>
            </div>
            <span style="background:rgba(25,181,165,0.18); border:1px solid rgba(25,181,165,0.4); color:#0EEDC8; padding:4px 10px; border-radius:12px; font-size:0.75rem; font-weight:700;">48 Units Total</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); padding:12px 14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; align-items:center; gap:10px;">
                <span style="background:rgba(25,181,165,0.2); color:#0EEDC8; width:30px; height:30px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.75rem;">POS</span>
                <div>
                  <div style="font-size:0.875rem; font-weight:700; color:#FFF;">Main Street Store Register #1</div>
                  <div style="font-size:0.75rem; color:#98A2B3;">Stock: 22 units • Reserved: 0</div>
                </div>
              </div>
              <span style="color:#0EEDC8; font-size:0.75rem; font-weight:700; display:flex; align-items:center; gap:4px;"><span style="width:6px; height:6px; background:#0EEDC8; border-radius:50%;"></span> Synced</span>
            </div>

            <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); padding:12px 14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; align-items:center; gap:10px;">
                <span style="background:rgba(99,102,241,0.2); color:#A5B4FC; width:30px; height:30px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.75rem;">WEB</span>
                <div>
                  <div style="font-size:0.875rem; font-weight:700; color:#FFF;">Shopify Flagship Storefront</div>
                  <div style="font-size:0.75rem; color:#98A2B3;">Stock: 18 units • Reserved: 2</div>
                </div>
              </div>
              <span style="color:#0EEDC8; font-size:0.75rem; font-weight:700; display:flex; align-items:center; gap:4px;"><span style="width:6px; height:6px; background:#0EEDC8; border-radius:50%;"></span> Synced</span>
            </div>

            <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); padding:12px 14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; align-items:center; gap:10px;">
                <span style="background:rgba(245,158,11,0.2); color:#FCD34D; width:30px; height:30px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.75rem;">AMZ</span>
                <div>
                  <div style="font-size:0.875rem; font-weight:700; color:#FFF;">Amazon Prime Store Channel</div>
                  <div style="font-size:0.75rem; color:#98A2B3;">Stock: 8 units • Reserved: 1</div>
                </div>
              </div>
              <span style="color:#0EEDC8; font-size:0.75rem; font-weight:700; display:flex; align-items:center; gap:4px;"><span style="width:6px; height:6px; background:#0EEDC8; border-radius:50%;"></span> Synced</span>
            </div>
          </div>

          <div style="margin-top:16px; background:rgba(25,181,165,0.08); border:1px dashed rgba(25,181,165,0.3); border-radius:8px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center; font-size:0.8125rem;">
            <span style="color:#98A2B3;">Barcode Scanner: <strong style="color:#FFF;">USB & Wireless Active</strong></span>
            <span style="color:#0EEDC8; font-weight:700;">Latency: 0.04s</span>
          </div>
        </div>
      `
    },
    alerts: {
      title: "Intelligent Reorder & Low-Stock Alerts",
      desc: "Never run out of bestsellers again. Receive proactive notifications when stock dips below safe operational thresholds.",
      badge: "Automated Alerts",
      impact: [
        "Customizable safety stock minimums per store & category",
        "Instant push notifications & email manager digests",
        "Automated draft PO creation upon safety threshold breach"
      ],
      visualHtml: `
        <div class="mock-widget">
          <div style="background:rgba(239,68,68,0.12); border:1px solid rgba(239,68,68,0.35); border-radius:10px; padding:16px; margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="color:#FCA5A5; font-size:0.75rem; font-weight:800; letter-spacing:0.06em; text-transform:uppercase; display:flex; align-items:center; gap:6px;">
                <span style="width:8px; height:8px; background:#EF4444; border-radius:50%; box-shadow:0 0 8px #EF4444;"></span> LOW STOCK THRESHOLD ALERT
              </span>
              <span style="font-size:0.75rem; color:#98A2B3;">12 mins ago</span>
            </div>
            <div style="font-size:1.0625rem; font-weight:800; color:#FFF;">Organic Cotton Hoodie (Medium / Black)</div>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-block:10px 8px; font-size:0.875rem;">
              <span style="color:#98A2B3;">Current Balance: <strong style="color:#EF4444; font-size:1rem;">4 Units</strong></span>
              <span style="color:#98A2B3;">Safety Reorder Point: <strong style="color:#FFF;">20 Units</strong></span>
            </div>
            <div style="width:100%; height:8px; background:rgba(255,255,255,0.1); border-radius:4px; overflow:hidden;">
              <div style="width:20%; height:100%; background:linear-gradient(90deg, #EF4444, #F87171); border-radius:4px;"></div>
            </div>
          </div>

          <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:0.875rem; font-weight:700; color:#FFF;">Automated Reorder Trigger</div>
                <div style="font-size:0.78125rem; color:#98A2B3; margin-top:2px;">Draft PO ready for Vendor: EcoFabrics Ltd.</div>
              </div>
              <button style="background:#19B5A5; color:#FFF; border:none; padding:8px 14px; border-radius:6px; font-size:0.8125rem; font-weight:700; cursor:pointer;">Order +50 Units</button>
            </div>
          </div>
        </div>
      `
    },
    orders: {
      title: "Streamlined Purchase Order Management Engine",
      desc: "Generate, track, and receive vendor purchase orders in seconds. Automatically calculate landed stock costs with precision.",
      badge: "PO Engine",
      impact: [
        "One-click auto-filling from low stock recommendation lists",
        "Real-time PO tracking from dispatch to store receiving",
        "Calculates landed costs including tax, freight & duties"
      ],
      visualHtml: `
        <div class="mock-widget">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.1);">
            <div>
              <span style="font-size:0.75rem; color:#98A2B3; text-transform:uppercase; font-weight:700;">Purchase Order #PO-2026-89</span>
              <div style="font-size:1.0625rem; font-weight:800; color:#FFF; margin-top:2px;">Supplier: Apex Apparel Wholesalers</div>
            </div>
            <span style="background:rgba(25,181,165,0.18); border:1px solid rgba(25,181,165,0.4); color:#0EEDC8; padding:4px 10px; border-radius:12px; font-size:0.75rem; font-weight:700;">Approved</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:8px; font-size:0.8125rem;">
            <div style="display:grid; grid-template-columns:2fr 1fr 1fr; color:#98A2B3; font-weight:700; padding-bottom:4px; text-transform:uppercase; font-size:0.7rem;">
              <span>Item Description</span>
              <span style="text-align:center;">Qty</span>
              <span style="text-align:right;">Subtotal</span>
            </div>
            <div style="display:grid; grid-template-columns:2fr 1fr 1fr; color:#FFF; padding:8px 0; border-top:1px solid rgba(255,255,255,0.05);">
              <span>Classic Denim Jacket (M)</span>
              <span style="text-align:center;">30 pcs</span>
              <span style="text-align:right; font-weight:700; color:#0EEDC8;">$1,350.00</span>
            </div>
            <div style="display:grid; grid-template-columns:2fr 1fr 1fr; color:#FFF; padding:8px 0; border-top:1px solid rgba(255,255,255,0.05);">
              <span>Canvas Tote Bag (Tan)</span>
              <span style="text-align:center;">50 pcs</span>
              <span style="text-align:right; font-weight:700; color:#0EEDC8;">$450.00</span>
            </div>
          </div>

          <div style="margin-top:16px; background:rgba(255,255,255,0.05); border-radius:8px; padding:12px 16px; display:flex; justify-content:space-between; align-items:center;">
            <span style="color:#98A2B3; font-size:0.875rem;">Estimated Landed Total:</span>
            <span style="font-size:1.25rem; font-weight:800; color:#FFF;">$1,800.00 USD</span>
          </div>
        </div>
      `
    },
    location: {
      title: "Multi-Store & Warehouse Location Visibility",
      desc: "Seamlessly track stock movements, store transfers, and inventory balances across multiple retail branches and storage hubs.",
      badge: "Multi-Location",
      impact: [
        "Unified dashboard across physical stores & central warehouse",
        "Inter-store stock transfer requests with digital sign-off",
        "Location-specific reorder points and shelf bin tracking"
      ],
      visualHtml: `
        <div class="mock-widget">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <div>
              <span style="font-size:0.75rem; color:#98A2B3; text-transform:uppercase; font-weight:700;">Multi-Store Stock Balance</span>
              <div style="font-size:1.0625rem; font-weight:800; color:#FFF;">3 Active Retail Locations</div>
            </div>
            <button style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:#FFF; padding:6px 12px; border-radius:6px; font-size:0.75rem; font-weight:700; cursor:pointer;">+ Transfer Stock</button>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:12px 14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:0.875rem; font-weight:700; color:#FFF;">Downtown Boutique (Store #1)</div>
                <div style="font-size:0.75rem; color:#98A2B3;">1,420 Items • Capacity 85%</div>
              </div>
              <span style="color:#0EEDC8; font-weight:800; font-size:0.875rem;">Optimal</span>
            </div>

            <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:12px 14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:0.875rem; font-weight:700; color:#FFF;">Suburban Branch (Store #2)</div>
                <div style="font-size:0.75rem; color:#98A2B3;">480 Items • Reorder Needed</div>
              </div>
              <span style="color:#FBBF24; font-weight:800; font-size:0.875rem;">Low Stock</span>
            </div>

            <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:12px 14px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:0.875rem; font-weight:700; color:#FFF;">Central Warehouse Hub</div>
                <div style="font-size:0.75rem; color:#98A2B3;">14,800 Items • Primary Storage</div>
              </div>
              <span style="color:#60A5FA; font-weight:800; font-size:0.875rem;">Hub Depot</span>
            </div>
          </div>
        </div>
      `
    },
    sales: {
      title: "Sales & Gross Margin Analytics Intelligence",
      desc: "Identify your highest performing product lines, gross profit margins, and turnover rates to maximize retail profitability.",
      badge: "Sales Analytics",
      impact: [
        "Gross margin analysis per category, brand, and SKU variant",
        "Fast-moving vs slow-moving stock identification matrix",
        "Seasonal sales trend forecasting for upcoming orders"
      ],
      visualHtml: `
        <div class="mock-widget">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <div>
              <span style="font-size:0.75rem; color:#98A2B3; text-transform:uppercase; font-weight:700;">Sales & Margin Intelligence</span>
              <div style="font-size:1.25rem; font-weight:800; color:#0EEDC8;">42.8% Gross Margin</div>
            </div>
            <span style="color:#0EEDC8; background:rgba(14,237,200,0.15); padding:4px 8px; border-radius:6px; font-size:0.75rem; font-weight:800;">▲ +4.2% MoM</span>
          </div>

          <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:16px; margin-bottom:12px;">
            <div style="font-size:0.75rem; color:#98A2B3; font-weight:700; margin-bottom:12px;">Monthly Retail Revenue Velocity</div>
            <div style="display:flex; align-items:flex-end; gap:12px; height:110px; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.1);">
              <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px;">
                <div style="width:100%; background:#19B5A5; height:55%; border-radius:4px 4px 0 0;"></div>
                <span style="font-size:0.7rem; color:#98A2B3;">Feb</span>
              </div>
              <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px;">
                <div style="width:100%; background:#19B5A5; height:70%; border-radius:4px 4px 0 0;"></div>
                <span style="font-size:0.7rem; color:#98A2B3;">Mar</span>
              </div>
              <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px;">
                <div style="width:100%; background:#19B5A5; height:65%; border-radius:4px 4px 0 0;"></div>
                <span style="font-size:0.7rem; color:#98A2B3;">Apr</span>
              </div>
              <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px;">
                <div style="width:100%; background:linear-gradient(180deg, #0EEDC8, #19B5A5); height:90%; border-radius:4px 4px 0 0; box-shadow:0 0 10px rgba(14,237,200,0.5);"></div>
                <span style="font-size:0.7rem; color:#0EEDC8; font-weight:800;">May</span>
              </div>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; font-size:0.78125rem; color:#98A2B3;">
            <span>Top SKU: <strong style="color:#FFF;">Vintage Leather Boots</strong></span>
            <span>Turnover Rate: <strong style="color:#0EEDC8;">8.4x / yr</strong></span>
          </div>
        </div>
      `
    },
    reports: {
      title: "Comprehensive Audit-Ready Valuation Reports",
      desc: "Generate instant reports on total inventory valuation, COGS, dead stock, and tax compliance metrics in one click.",
      badge: "Inventory Audits",
      impact: [
        "FIFO and LIFO stock valuation calculation models",
        "Instant PDF & CSV export for store accountants & auditors",
        "Dead stock identification to unlock stuck working capital"
      ],
      visualHtml: `
        <div class="mock-widget">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <div>
              <span style="font-size:0.75rem; color:#98A2B3; text-transform:uppercase; font-weight:700;">Stock Valuation Report</span>
              <div style="font-size:1.25rem; font-weight:800; color:#FFF;">$184,650.00 Total Asset Value</div>
            </div>
            <span style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:#0EEDC8; padding:4px 10px; border-radius:6px; font-size:0.75rem; font-weight:700;">FIFO Model</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:16px;">
            <div style="background:rgba(255,255,255,0.04); border-radius:6px; padding:10px 14px; display:flex; justify-content:space-between; font-size:0.8125rem;">
              <span style="color:#FFF;">Apparel & Textiles Category</span>
              <span style="font-weight:700; color:#0EEDC8;">$101,550 (55%)</span>
            </div>
            <div style="background:rgba(255,255,255,0.04); border-radius:6px; padding:10px 14px; display:flex; justify-content:space-between; font-size:0.8125rem;">
              <span style="color:#FFF;">Footwear & Shoes</span>
              <span style="font-weight:700; color:#0EEDC8;">$55,395 (30%)</span>
            </div>
            <div style="background:rgba(255,255,255,0.04); border-radius:6px; padding:10px 14px; display:flex; justify-content:space-between; font-size:0.8125rem;">
              <span style="color:#FFF;">Accessories & Goods</span>
              <span style="font-weight:700; color:#0EEDC8;">$27,705 (15%)</span>
            </div>
          </div>

          <div style="display:flex; gap:10px;">
            <button style="flex:1; background:rgba(25,181,165,0.2); border:1px solid rgba(25,181,165,0.4); color:#0EEDC8; padding:8px; border-radius:6px; font-size:0.78125rem; font-weight:700; cursor:pointer;">Export PDF Audit</button>
            <button style="flex:1; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); color:#FFF; padding:8px; border-radius:6px; font-size:0.78125rem; font-weight:700; cursor:pointer;">Export CSV Data</button>
          </div>
        </div>
      `
    },
    suppliers: {
      title: "Centralized Retail Supplier Directory",
      desc: "Organize vendor contacts, lead times, order histories, and payment terms in one centralized store database.",
      badge: "Vendor Hub",
      impact: [
        "Supplier performance scorecards (lead time & fulfillment rate)",
        "Centralized contract storage and default payment terms",
        "Direct email purchase order transmission from portal"
      ],
      visualHtml: `
        <div class="mock-widget">
          <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:16px; margin-bottom:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:0.75rem; color:#0EEDC8; font-weight:800; letter-spacing:0.05em; text-transform:uppercase;">Tier-1 Preferred Vendor</span>
              <span style="color:#FBBF24; font-size:0.875rem;">★★★★★ 4.9</span>
            </div>
            <div style="font-size:1.125rem; font-weight:800; color:#FFF;">Nordic Fabric Works Co.</div>
            <div style="font-size:0.78125rem; color:#98A2B3; margin-top:2px;">Contact: sarah@nordicfabric.com • Lead Time: 2 Days</div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:14px;">
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); padding:12px; border-radius:8px; text-align:center;">
              <div style="font-size:1.25rem; font-weight:800; color:#FFF;">2 Active</div>
              <div style="font-size:0.7rem; color:#98A2B3; text-transform:uppercase; font-weight:700; margin-top:2px;">Open Purchase Orders</div>
            </div>
            <div style="background:rgba(255,255,253,0.03); border:1px solid rgba(255,255,255,0.08); padding:12px; border-radius:8px; text-align:center;">
              <div style="font-size:1.25rem; font-weight:800; color:#0EEDC8;">$3,400</div>
              <div style="font-size:0.7rem; color:#98A2B3; text-transform:uppercase; font-weight:700; margin-top:2px;">Total Order Balance</div>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8125rem; color:#98A2B3;">
            <span>Payment Terms: <strong style="color:#FFF;">Net 30</strong></span>
            <span style="color:#0EEDC8; cursor:pointer; font-weight:700;">View Vendor Directory →</span>
          </div>
        </div>
      `
    },
    adjustments: {
      title: "Audit-Trail Stock Adjustments & Shrinkage Control",
      desc: "Log manual stock counts, shrinkage, damaged items, or promo samples with complete manager approval logs.",
      badge: "Stock Adjustments",
      impact: [
        "Mandatory reason code selection for every manual count change",
        "Role-based manager approval permissions for shrinkage logs",
        "Immutable audit log preventing inventory theft or tampering"
      ],
      visualHtml: `
        <div class="mock-widget">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <div>
              <span style="font-size:0.75rem; color:#98A2B3; text-transform:uppercase; font-weight:700;">Audit-Trail Stock Log</span>
              <div style="font-size:1.0625rem; font-weight:800; color:#FFF;">Immutable Audit Feed</div>
            </div>
            <span style="background:rgba(25,181,165,0.15); border:1px solid rgba(25,181,165,0.3); color:#0EEDC8; padding:4px 8px; border-radius:6px; font-size:0.75rem; font-weight:700;">🔒 Verified Log</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            <div style="background:rgba(255,255,255,0.04); border-left:3px solid #0EEDC8; padding:10px 14px; border-radius:0 6px 6px 0;">
              <div style="display:flex; justify-content:space-between; font-size:0.8125rem; margin-bottom:2px;">
                <span style="color:#FFF; font-weight:700;">Stock Intake (+50 Units)</span>
                <span style="color:#0EEDC8; font-weight:800;">10:42 AM</span>
              </div>
              <div style="font-size:0.75rem; color:#98A2B3;">Logged by Alex M. (Store Mgr) • PO #2084 Receipt</div>
            </div>

            <div style="background:rgba(255,255,255,0.04); border-left:3px solid #EF4444; padding:10px 14px; border-radius:0 6px 6px 0;">
              <div style="display:flex; justify-content:space-between; font-size:0.8125rem; margin-bottom:2px;">
                <span style="color:#FFF; font-weight:700;">Damage Adjustment (-2 Units)</span>
                <span style="color:#98A2B3;">08:15 AM</span>
              </div>
              <div style="font-size:0.75rem; color:#98A2B3;">Logged by Jessica R. • Floor Display Damage</div>
            </div>
          </div>
        </div>
      `
    }
  };

  window.renderFeatureTab = function(key) {
    const data = featureContentData[key];
    if (!data) return;

    const titleEl = document.getElementById('featureDetailTitle');
    const descEl = document.getElementById('featureDetailDesc');
    const badgeEl = document.getElementById('featureDetailBadge');
    const impactEl = document.getElementById('featureDetailImpact');
    const contentEl = document.getElementById('featureVisualContent');

    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (badgeEl) {
      badgeEl.innerHTML = `<span class="badge-dot"></span> ${data.badge}`;
    }

    if (impactEl && data.impact) {
      impactEl.innerHTML = data.impact.map(item => `
        <li><span class="impact-icon">✓</span> <span class="impact-text">${item}</span></li>
      `).join('');
    }

    if (contentEl && data.visualHtml) {
      contentEl.innerHTML = data.visualHtml;
    }

    // Toggle active state on tab buttons
    const tabs = document.querySelectorAll('.feature-tab-btn');
    tabs.forEach(t => {
      if (t.getAttribute('data-feature') === key) {
        t.classList.add('active');
        t.setAttribute('aria-selected', 'true');
      } else {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      }
    });
  };

  if (featureTabs.length > 0) {
    featureTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const key = tab.dataset.feature;
        window.renderFeatureTab(key);
      });
    });

    const activeTab = document.querySelector('.feature-tab-btn.active');
    const initialKey = activeTab ? activeTab.dataset.feature : 'tracking';
    window.renderFeatureTab(initialKey);
  }

  // --- 7. LOGIN FORM AUTHENTICATION DEMO ---
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');
  const forgotPasswordLink = document.getElementById('forgotPasswordLink');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail')?.value.trim();
      const password = document.getElementById('loginPassword')?.value.trim();

      if (email === 'retailer@example.com' && password === 'demo123') {
        if (loginError) loginError.style.display = 'none';
        window.location.href = 'dashboard.html#overview';
      } else {
        if (loginError) {
          loginError.textContent = 'Invalid credentials. Please use email: retailer@example.com and password: demo123';
          loginError.style.display = 'block';
        }
      }
    });
  }

  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Password recovery is unavailable in this frontend demo. Please use retailer@example.com / demo123 to log in.');
    });
  }

  // --- 8. NEWSLETTER FORM SUBMIT ---
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for subscribing to StockFlow Retail Insights!');
      form.reset();
    });
  });

  // --- 9. SCROLL REVEAL & COUNT-UP ANIMATIONS ENGINE ---
  const revealElements = document.querySelectorAll('.reveal, .css-bar-chart');

  const activateReveal = (el) => {
    if (!el) return;
    el.classList.add('active');
    const counters = el.querySelectorAll('[data-counter]');
    counters.forEach(counter => animateCounter(counter));
  };

  // Immediate fail-safe activation for all elements
  revealElements.forEach(el => activateReveal(el));

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activateReveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.01,
      rootMargin: '200px 0px 200px 0px'
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });

    window.addEventListener('load', () => {
      revealElements.forEach(el => activateReveal(el));
    });
  } else {
    revealElements.forEach(el => activateReveal(el));
  }

  // Standalone counter observer
  const standaloneCounters = document.querySelectorAll('[data-counter]');
  if ('IntersectionObserver' in window && standaloneCounters.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    standaloneCounters.forEach(c => counterObserver.observe(c));
  }

  function animateCounter(el) {
    if (el.dataset.animated === 'true') return;
    el.dataset.animated = 'true';

    const targetVal = parseFloat(el.dataset.counter);
    if (isNaN(targetVal)) return;

    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const duration = 1800;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = targetVal * easeProgress;

      let formattedVal = currentVal.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });

      el.textContent = `${prefix}${formattedVal}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${prefix}${targetVal.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        })}${suffix}`;
      }
    }

    requestAnimationFrame(step);
  }

  // --- 10. HERO RETAIL INVENTORY NETWORK ANIMATED CANVAS ---
  const canvas = document.getElementById('heroBgCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };

    const inventoryTags = [
      'SKU-104', 'PO-2048', 'SYNC 100%', 'STOCK OK', 
      'STORE A', 'STORE B', 'BARCODE #884', 'AUTO REORDER', 
      'LOW STOCK', '1,248 SKUs', 'WAREHOUSE', 'POS LINK'
    ];

    function resizeCanvas() {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = canvas.width = parent.clientWidth || window.innerWidth;
      height = canvas.height = parent.clientHeight || 600;
    }

    class InventoryNode {
      constructor(init = false) {
        this.reset(init);
      }

      reset(init = false) {
        // Spawn particles in outer side channels (left 0-25%, right 75-100%) to keep center clear of text overlap
        const isLeft = Math.random() < 0.5;
        if (isLeft) {
          this.x = Math.random() * ((width || 1200) * 0.26);
        } else {
          this.x = ((width || 1200) * 0.74) + (Math.random() * ((width || 1200) * 0.26));
        }

        this.y = init ? Math.random() * (height || 600) : (height || 600) + 20;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = -(0.2 + Math.random() * 0.4);
        this.size = 2.5 + Math.random() * 2.5;
        this.alpha = 0.35 + Math.random() * 0.45;
        this.hasTag = (width >= 768) ? (Math.random() > 0.5) : false;
        this.tag = inventoryTags[Math.floor(Math.random() * inventoryTags.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Keep center column (28% to 72% of width) clear of floating nodes
        const centerMin = (width || 1200) * 0.28;
        const centerMax = (width || 1200) * 0.72;
        const centerX = (width || 1200) * 0.5;

        if (this.x > centerMin && this.x < centerMax) {
          // Push outward away from center
          if (this.x < centerX) {
            this.vx -= 0.04;
          } else {
            this.vx += 0.04;
          }
        }

        // Subtle repulsion from user mouse cursor
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * 1.1;
          this.y -= Math.sin(angle) * 1.1;
        }

        if (this.y < -30 || this.x < -30 || this.x > width + 30) {
          this.reset(false);
        }
      }

      draw() {
        ctx.fillStyle = `rgba(14, 237, 200, ${this.alpha})`;
        ctx.shadowColor = '#0EEDC8';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        if (this.hasTag) {
          ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
          ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 0.75})`;
          ctx.fillText(this.tag, this.x + 8, this.y + 3);
        }
      }
    }

    function initNetwork() {
      resizeCanvas();
      particles = [];
      const count = Math.min(Math.floor((width || 800) / 45), 28);
      for (let i = 0; i < count; i++) {
        particles.push(new InventoryNode(true));
      }
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * 0.18;
            ctx.strokeStyle = `rgba(25, 181, 165, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function renderLoop() {
      ctx.clearRect(0, 0, width, height);

      drawConnections();
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(renderLoop);
    }

    window.addEventListener('resize', () => {
      resizeCanvas();
    });

    const heroSectionEl = canvas.closest('.hero-section');
    if (heroSectionEl) {
      heroSectionEl.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      });

      heroSectionEl.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
      });
    }

    initNetwork();
    renderLoop();
  }

  // --- 11. PRICING BILLING CYCLE TOGGLE ---
  const billingMonthlyBtn = document.getElementById('billingMonthlyBtn');
  const billingAnnualBtn = document.getElementById('billingAnnualBtn');
  const pricingCards = document.querySelectorAll('.pricing-card');

  if (billingMonthlyBtn && billingAnnualBtn) {
    billingMonthlyBtn.addEventListener('click', () => setBillingCycle('monthly'));
    billingAnnualBtn.addEventListener('click', () => setBillingCycle('annual'));
  }

  function setBillingCycle(type) {
    if (!billingMonthlyBtn || !billingAnnualBtn) return;

    if (type === 'monthly') {
      billingMonthlyBtn.classList.add('active');
      billingAnnualBtn.classList.remove('active');
    } else {
      billingAnnualBtn.classList.add('active');
      billingMonthlyBtn.classList.remove('active');
    }

    pricingCards.forEach(card => {
      const amountEl = card.querySelector('.pricing-amount');
      const periodEl = card.querySelector('.pricing-period');

      if (amountEl && card.dataset.monthly && card.dataset.annual) {
        amountEl.classList.add('price-pop');
        setTimeout(() => amountEl.classList.remove('price-pop'), 280);

        if (type === 'annual') {
          amountEl.textContent = card.dataset.annual;
          if (periodEl) periodEl.textContent = '/ month (billed annually)';
        } else {
          amountEl.textContent = card.dataset.monthly;
          if (periodEl) periodEl.textContent = '/ month';
        }
      }
    });
  }

  // --- 12. PRICING INTERACTIVE ROI CALCULATOR ---
  const sliderStores = document.getElementById('sliderStores');
  const sliderRevenue = document.getElementById('sliderRevenue');
  const valStores = document.getElementById('valStores');
  const valRevenue = document.getElementById('valRevenue');
  const metricHours = document.getElementById('metricHours');
  const metricLoss = document.getElementById('metricLoss');
  const metricSavings = document.getElementById('metricSavings');

  if (sliderStores && sliderRevenue) {
    const updateROI = () => {
      const stores = parseInt(sliderStores.value, 10) || 1;
      const revenue = parseInt(sliderRevenue.value, 10) || 10000;

      if (valStores) valStores.textContent = `${stores} ${stores === 1 ? 'Store' : 'Stores'}`;
      if (valRevenue) valRevenue.textContent = `$${revenue.toLocaleString()}`;

      // Calculate dynamic ROI estimates
      const hoursSaved = stores * 28;
      const lossPrevented = Math.round((revenue * 0.04) * (stores * 0.85));
      const annualSavings = Math.round((hoursSaved * 25 * 12) + (lossPrevented * 12));

      if (metricHours) metricHours.textContent = `${hoursSaved} Hours`;
      if (metricLoss) metricLoss.textContent = `$${lossPrevented.toLocaleString()} / mo`;
      if (metricSavings) metricSavings.textContent = `$${annualSavings.toLocaleString()} / Year`;
    };

    sliderStores.addEventListener('input', updateROI);
    sliderRevenue.addEventListener('input', updateROI);
    updateROI();
  }

  // --- 13. FAQ ACCORDION DROPDOWN SYSTEM ---
  const faqItems = document.querySelectorAll('.faq-item');

  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const header = item.querySelector('.faq-header');
      const body = item.querySelector('.faq-body');

      if (header && body) {
        header.addEventListener('click', () => {
          const isOpen = item.classList.contains('active');

          // Close all other active FAQ items
          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
              const otherHeader = otherItem.querySelector('.faq-header');
              if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
              const otherBody = otherItem.querySelector('.faq-body');
              if (otherBody) otherBody.style.maxHeight = null;
            }
          });

          // Toggle current FAQ item
          if (isOpen) {
            item.classList.remove('active');
            header.setAttribute('aria-expanded', 'false');
            body.style.maxHeight = null;
          } else {
            item.classList.add('active');
            header.setAttribute('aria-expanded', 'true');
            body.style.maxHeight = body.scrollHeight + 'px';
          }
        });
      }
    });
  }

  // --- 14. CONTACT PAGE GOOGLE MAP LOCATION SWITCHER ---
  const mapBtns = document.querySelectorAll('.map-location-btn');
  const googleMapFrame = document.getElementById('googleMapFrame');
  const mapLocationTitle = document.getElementById('mapLocationTitle');
  const mapLocationAddress = document.getElementById('mapLocationAddress');
  const mapLocationPhone = document.getElementById('mapLocationPhone');
  const mapLocationHours = document.getElementById('mapLocationHours');
  const mapDirLink = document.getElementById('mapDirLink');

  const locationData = {
    sf: {
      title: "San Francisco Technology Hub",
      address: "100 Retail Plaza, Suite 400<br>San Francisco, CA 94105, United States",
      phone: "+1 (800) 555-STOCK",
      hours: "Mon - Fri: 8:00 AM - 6:00 PM PST",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d-122.40139882357672!3d37.79155987198275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085806305a415a7%3A0xa59f714757c9172!2sMarket%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
      dirUrl: "https://maps.google.com/?q=Market+St,+San+Francisco,+CA"
    },
    ny: {
      title: "New York Regional Office",
      address: "350 Fifth Avenue, Floor 18<br>New York, NY 10118, United States",
      phone: "+1 (212) 555-FLOW",
      hours: "Mon - Fri: 9:00 AM - 6:00 PM EST",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.18394872074!2d-73.98565568459374!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sFifth%20Ave%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
      dirUrl: "https://maps.google.com/?q=Fifth+Ave,+New+York,+NY"
    },
    london: {
      title: "London European Hub",
      address: "45 Covent Garden, Suite 12<br>London, WC2E 8RF, United Kingdom",
      phone: "+44 (020) 7946 0912",
      hours: "Mon - Fri: 9:00 AM - 5:30 PM GMT",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.053787723702!2d-0.124625484229806!3d51.51221197963625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ccab37652b%3A0x2607707328903c74!2sCovent%20Garden%2C%20London%2C%20UK!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
      dirUrl: "https://maps.google.com/?q=Covent+Garden,+London,+UK"
    }
  };

  if (mapBtns.length > 0) {
    mapBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        mapBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const key = btn.dataset.location;
        const data = locationData[key];

        if (data) {
          if (googleMapFrame) googleMapFrame.src = data.mapUrl;
          if (mapLocationTitle) mapLocationTitle.textContent = data.title;
          if (mapLocationAddress) mapLocationAddress.innerHTML = data.address;
          if (mapLocationPhone) mapLocationPhone.textContent = data.phone;
          if (mapLocationHours) mapLocationHours.textContent = data.hours;
          if (mapDirLink) mapDirLink.href = data.dirUrl;
        }
      });
    });
  }

  // --- 15. BACK TO TOP BUTTON SYSTEM ---
  const currentPath = window.location.pathname.toLowerCase();
  const isExcludedPage = currentPath.endsWith('login.html') ||
                         currentPath.endsWith('signup.html') ||
                         currentPath.endsWith('register.html') ||
                         currentPath.endsWith('dashboard.html');

  if (!isExcludedPage) {
    let backToTopBtn = document.getElementById('backToTopBtn');

    // Auto-create button if missing from HTML DOM
    if (!backToTopBtn) {
      backToTopBtn = document.createElement('button');
      backToTopBtn.id = 'backToTopBtn';
      backToTopBtn.className = 'back-to-top';
      backToTopBtn.setAttribute('aria-label', 'Back to top');
      backToTopBtn.setAttribute('title', 'Back to top');
      backToTopBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      `;
      document.body.appendChild(backToTopBtn);
    }

    // Toggle visibility on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    // Smooth scroll to top on click
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});



