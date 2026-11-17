// MultiCord Web - Renderer Engine & Optimizations
const STORAGE_KEY = 'multicord_accounts_v2';
const DISCORD_APP_URL = 'https://discord.com/app';
const DESKTOP_USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

// 1 default account on clean start
const INITIAL_ACCOUNTS = [
  {
    id: 1,
    name: 'Tài khoản 1',
    color: '#5865F2',
    partition: 'persist:discord_acc_1',
    avatarUrl: null,
    unreadCount: 0,
    hasUnread: false
  }
];

let accounts = [];
let activeAccountId = 1;
let splitMode = false;
let splitAccountId = null;
let editingAccountId = null;
let accountPendingDeleteId = null;
let isFirstLoadComplete = false;

// DOM References
const splashScreen = document.getElementById('splash-screen');
const splashQuote = document.getElementById('splash-quote');
const accountsContainer = document.getElementById('accounts-container');
const webviewsContainer = document.getElementById('webviews-container');
const btnAddAccount = document.getElementById('btn-add-account');
const btnToggleSplit = document.getElementById('btn-toggle-split');
const btnReload = document.getElementById('btn-reload');
const btnEditAccount = document.getElementById('btn-edit-account');
const btnDeleteAccount = document.getElementById('btn-delete-account');

const accountPill = document.getElementById('account-pill');
const topbarTitle = document.getElementById('topbar-title');
const topbarOrderTag = document.getElementById('topbar-order-tag');
const topbarPulseRing = document.getElementById('topbar-pulse-ring');
const topbarStatusDot = document.getElementById('topbar-status-dot');
const topbarLoading = document.getElementById('topbar-loading');
const splitSelectorWrapper = document.getElementById('split-selector-wrapper');
const splitSelect = document.getElementById('split-select');

// Edit Modal Elements
const modalEdit = document.getElementById('modal-edit');
const modalTitle = document.getElementById('modal-title');
const inputAccountName = document.getElementById('input-account-name');
const modalBtnCancel = document.getElementById('modal-btn-cancel');
const modalBtnSave = document.getElementById('modal-btn-save');
const colorChips = document.querySelectorAll('.color-chip');

// Confirm Delete Modal Elements
const modalConfirmDelete = document.getElementById('modal-confirm-delete');
const confirmAccountName = document.getElementById('confirm-account-name');
const modalBtnConfirmCancel = document.getElementById('modal-btn-confirm-cancel');
const modalBtnConfirmDelete = document.getElementById('modal-btn-confirm-delete');

// Splash Quotes
const SPLASH_QUOTES = [
  'Đang tối ưu hóa tài nguyên phần cứng & phân vùng dữ liệu...',
  'Đang khởi tạo phiên Discord Web độc lập...',
  'Đang kết nối tới Discord Gateway...',
  'Đang cấu hình Sandbox & Audio/Video WebRTC...'
];

function initSplash() {
  let quoteIdx = 0;
  const quoteTimer = setInterval(() => {
    if (isFirstLoadComplete) {
      clearInterval(quoteTimer);
      return;
    }
    quoteIdx = (quoteIdx + 1) % SPLASH_QUOTES.length;
    splashQuote.style.opacity = '0';
    setTimeout(() => {
      splashQuote.innerText = SPLASH_QUOTES[quoteIdx];
      splashQuote.style.opacity = '1';
    }, 200);
  }, 900);

  // Guarantee splash dismisses after 2.2s
  setTimeout(dismissSplash, 2200);
}

function dismissSplash() {
  if (isFirstLoadComplete) return;
  isFirstLoadComplete = true;
  splashScreen.classList.add('fade-out');
  setTimeout(() => {
    splashScreen.style.display = 'none';
  }, 600);
}

// State Loading & Migration
function loadAccounts() {
  const oldV1 = localStorage.getItem('multicord_accounts_v1');
  if (oldV1) {
    try {
      const parsed = JSON.parse(oldV1);
      if (parsed.length === 2 && parsed[1].name === 'Tài khoản 2' && !parsed[1].avatarUrl) {
        accounts = [parsed[0]];
      } else {
        accounts = parsed;
      }
    } catch (e) {
      accounts = [...INITIAL_ACCOUNTS];
    }
    localStorage.removeItem('multicord_accounts_v1');
    saveAccounts();
  } else {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        accounts = JSON.parse(saved);
      } catch (e) {
        accounts = [...INITIAL_ACCOUNTS];
      }
    } else {
      accounts = [...INITIAL_ACCOUNTS];
    }
  }

  if (!accounts || accounts.length === 0) {
    accounts = [...INITIAL_ACCOUNTS];
  }

  // Ensure unread fields exist on all accounts
  accounts.forEach((acc) => {
    if (typeof acc.unreadCount !== 'number') acc.unreadCount = 0;
    if (typeof acc.hasUnread !== 'boolean') acc.hasUnread = false;
  });

  activeAccountId = accounts[0].id;
  splitAccountId = accounts.length > 1 ? accounts[1].id : null;
  saveAccounts();
}

function saveAccounts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}

// Render Sidebar UI with Hover Close Button & Unread Badges
function renderSidebar() {
  accountsContainer.innerHTML = '';

  accounts.forEach((acc, index) => {
    const wrapper = document.createElement('div');
    const isActive = acc.id === activeAccountId;
    wrapper.className = `account-wrapper ${isActive ? 'active' : ''} ${acc.avatarUrl ? 'has-avatar' : ''}`;
    wrapper.id = `acc-wrapper-${acc.id}`;
    wrapper.title = `${acc.name} (Cmd+${index + 1})`;

    const pill = document.createElement('div');
    pill.className = 'pill-indicator';

    const avatar = document.createElement('div');
    avatar.className = 'account-avatar';
    avatar.style.backgroundColor = acc.color || '#5865F2';

    if (acc.avatarUrl) {
      const img = document.createElement('img');
      img.src = acc.avatarUrl;
      img.alt = acc.name;
      img.loading = 'lazy';
      img.onerror = () => {
        acc.avatarUrl = null;
        renderSidebar();
      };
      avatar.appendChild(img);
    } else {
      avatar.innerText = getInitials(acc.name, index + 1);
    }

    avatar.addEventListener('click', () => {
      setActiveAccount(acc.id);
    });

    // Close button ('x') on hover
    const closeBtn = document.createElement('button');
    closeBtn.className = 'account-close-btn';
    closeBtn.title = `Đóng ${acc.name}`;
    closeBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="10" height="10">
        <path fill="currentColor" d="M18.3 5.71a1 1 0 0 0-1.42 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.12L10.59 12l-4.9 4.89a1 1 0 1 0 1.42 1.42L12 13.41l4.89 4.9a1 1 0 0 0 1.42-1.42L13.41 12l4.9-4.89a1 1 0 0 0 0-1.4z"/>
      </svg>
    `;

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Do not trigger account switch
      promptDeleteAccount(acc.id);
    });

    // Unread Message Badge (Red counter or white dot)
    const badge = document.createElement('div');
    badge.className = 'unread-badge';
    badge.id = `badge-${acc.id}`;
    if (acc.hasUnread) {
      if (acc.unreadCount > 0) {
        badge.innerText = acc.unreadCount > 99 ? '99+' : `${acc.unreadCount}`;
        badge.classList.remove('dot', 'hidden');
      } else {
        badge.classList.add('dot');
        badge.classList.remove('hidden');
      }
    } else {
      badge.classList.add('hidden');
    }

    wrapper.appendChild(pill);
    wrapper.appendChild(avatar);
    wrapper.appendChild(closeBtn);
    wrapper.appendChild(badge);
    accountsContainer.appendChild(wrapper);
  });
}

function getInitials(name, fallbackNum) {
  if (!name) return `${fallbackNum}`;
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase() || `${fallbackNum}`;
}

// Unread Messages Handler & Title Observer
function handleTitleChange(acc, title) {
  if (!title) return;

  let count = 0;
  let hasUnread = false;

  // Extract mention / DM unread counts, e.g. "(1) Discord", "(5) #chat", "(99+) Discord"
  const countMatch = title.match(/^\((\d+)\+?\)/);
  if (countMatch) {
    count = parseInt(countMatch[1], 10);
    hasUnread = true;
  } else if (title.startsWith('•') || title.startsWith('(*)')) {
    // General unread activity (unread message in channel without direct mention)
    hasUnread = true;
    count = 0; // white dot
  }

  if (acc.unreadCount !== count || acc.hasUnread !== hasUnread) {
    acc.unreadCount = count;
    acc.hasUnread = hasUnread;
    updateAccountBadge(acc);
    updateGlobalDockBadge();
  }
}

function updateAccountBadge(acc) {
  const badge = document.getElementById(`badge-${acc.id}`);
  if (!badge) return;

  if (acc.hasUnread) {
    if (acc.unreadCount > 0) {
      badge.innerText = acc.unreadCount > 99 ? '99+' : `${acc.unreadCount}`;
      badge.className = 'unread-badge';
    } else {
      badge.innerText = '';
      badge.className = 'unread-badge dot';
    }
  } else {
    badge.className = 'unread-badge hidden';
  }
}

function updateGlobalDockBadge() {
  const totalCount = accounts.reduce((sum, a) => sum + (a.unreadCount || 0), 0);
  const anyUnread = accounts.some((a) => a.hasUnread);

  if (window.multicordAPI && window.multicordAPI.updateBadge) {
    if (totalCount > 0) {
      window.multicordAPI.updateBadge(totalCount);
    } else if (anyUnread) {
      window.multicordAPI.updateBadge('•');
    } else {
      window.multicordAPI.updateBadge(0);
    }
  }
}

// Webview Slot Management with Discord Loaders (No Pitch-Black Screens)
function ensureWebviewSlot(acc, shouldLoadNow) {
  let slot = document.getElementById(`slot-${acc.id}`);
  let wv = document.getElementById(`webview-${acc.id}`);

  if (!slot) {
    slot = document.createElement('div');
    slot.id = `slot-${acc.id}`;
    slot.className = 'webview-slot';

    // Discord-themed Slot Loading Animation
    const loader = document.createElement('div');
    loader.id = `loader-${acc.id}`;
    loader.className = 'slot-loader';
    loader.innerHTML = `
      <div class="loader-inner">
        <div class="loader-mascot-wrap">
          <svg class="loader-discord-svg" viewBox="0 0 127.14 96.36">
            <path fill="currentColor" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.86,53,48.81,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
          </svg>
          <div class="loader-pulse-glow"></div>
        </div>
        <div class="discord-dots-loader">
          <div class="d-dot"></div>
          <div class="d-dot"></div>
          <div class="d-dot"></div>
        </div>
        <div class="loader-title">Đang kết nối Discord Web...</div>
        <div class="loader-subtitle">${acc.name} • Phiên độc lập</div>
        <div class="loader-hint">
          💡 <span>Mẹo: Quét mã QR bằng ứng dụng Discord trên điện thoại để đăng nhập tức thì</span>
        </div>
      </div>
    `;

    wv = document.createElement('webview');
    wv.id = `webview-${acc.id}`;
    wv.setAttribute('partition', acc.partition);
    wv.setAttribute('allowpopups', 'true');
    wv.setAttribute('useragent', DESKTOP_USER_AGENT);
    wv.setAttribute(
      'webpreferences',
      'contextIsolation=no, nodeIntegration=false, spellcheck=true, backgroundThrottling=false'
    );

    // Event listeners
    wv.addEventListener('did-start-loading', () => {
      loader.classList.remove('fade-out');
      if (acc.id === activeAccountId) topbarLoading.classList.remove('hidden');
    });

    wv.addEventListener('did-stop-loading', () => {
      loader.classList.add('fade-out');
      if (acc.id === activeAccountId) topbarLoading.classList.add('hidden');
      dismissSplash();
      extractDiscordProfileAndEnhance(wv, acc);
    });

    wv.addEventListener('dom-ready', () => {
      loader.classList.add('fade-out');
      dismissSplash();
    });

    // Detect Discord unread message counts in title in real-time
    wv.addEventListener('page-title-updated', (e) => {
      handleTitleChange(acc, e.title);
    });

    slot.appendChild(loader);
    slot.appendChild(wv);
    webviewsContainer.appendChild(slot);
  }

  // Lazy loading
  if (shouldLoadNow && (!wv.src || wv.src === 'about:blank')) {
    wv.setAttribute('src', DISCORD_APP_URL);
  }

  return slot;
}

// MultiCord Optimization & Script Injection
function extractDiscordProfileAndEnhance(wv, acc) {
  if (!wv || typeof wv.executeJavaScript !== 'function') return;
  try {
    wv.executeJavaScript(`
      (() => {
        try {
          // 1. Hide "Download Discord Desktop App" notice banner
          const notices = document.querySelectorAll('div[class*="notice_"]');
          notices.forEach(n => {
            if (n.innerText && (n.innerText.includes('App') || n.innerText.includes('Desktop') || n.innerText.includes('Tải'))) {
              n.style.display = 'none';
            }
          });

          // 2. Extract Avatar from user panels (bottom-left area)
          let avatarUrl = null;
          let username = null;

          // Look in bottom-left panels (language independent)
          const panels = document.querySelector('section[class*="panels_"]') || 
                         document.querySelector('div[class*="panels_"]') ||
                         document.querySelector('[class*="userPanel_"]') ||
                         document.querySelector('nav[class*="container_"]');

          if (panels) {
            // Priority: image with /avatars/ inside panels
            const avatarImg = panels.querySelector('img[src*="/avatars/"]') ||
                              panels.querySelector('img[class*="avatar_"]') ||
                              panels.querySelector('img');
            if (avatarImg && avatarImg.src && !avatarImg.src.startsWith('data:')) {
              avatarUrl = avatarImg.src;
            }

            // Extract username from panels
            const nameEl = panels.querySelector('[class*="nameTag_"]') ||
                           panels.querySelector('[class*="title_"]') ||
                           panels.querySelector('[class*="panelSubtextContainer_"]') ||
                           panels.querySelector('div[class*="textRow_"]');
            if (nameEl) {
              const text = nameEl.innerText ? nameEl.innerText.split('\\n')[0].trim() : '';
              if (text && text.length > 0) username = text;
            }
          }

          // Fallback search for user avatar across document if not found in panels
          if (!avatarUrl) {
            const allAvatars = document.querySelectorAll('img[src*="cdn.discordapp.com/avatars/"]');
            for (const img of allAvatars) {
              if (img.closest('[class*="panels_"], [class*="container_"], button[class*="avatar_"]')) {
                avatarUrl = img.src;
                break;
              }
            }
            if (!avatarUrl && allAvatars.length > 0) {
              avatarUrl = allAvatars[0].src;
            }
          }

          // 3. Count unread mention badges directly from DOM if present
          const badgeEls = document.querySelectorAll('div[class*="numberBadge_"], div[class*="unreadMentionsBar_"]');
          let domBadgeCount = 0;
          badgeEls.forEach(b => {
            const val = parseInt(b.innerText, 10);
            if (!isNaN(val)) domBadgeCount += val;
          });

          return {
            avatar: avatarUrl,
            username: username,
            domBadgeCount: domBadgeCount
          };
        } catch(e) {
          return null;
        }
      })()
    `).then((res) => {
      if (!res) return;
      let changed = false;
      if (res.avatar && res.avatar !== acc.avatarUrl) {
        acc.avatarUrl = res.avatar;
        changed = true;
      }
      if (res.username && acc.name.startsWith('Tài khoản')) {
        acc.name = res.username;
        changed = true;
      }
      if (typeof res.domBadgeCount === 'number' && res.domBadgeCount > 0 && acc.unreadCount === 0) {
        acc.unreadCount = res.domBadgeCount;
        acc.hasUnread = true;
        updateAccountBadge(acc);
        updateGlobalDockBadge();
      }
      if (changed) {
        saveAccounts();
        renderSidebar();
        updateTopbar();
      }
    }).catch(() => {});
  } catch (e) {}
}

// Periodic profile poller: automatically syncs real avatar & username when user finishes logging in
setInterval(() => {
  accounts.forEach((acc) => {
    if (!acc.avatarUrl || acc.name.startsWith('Tài khoản')) {
      const wv = document.getElementById(`webview-${acc.id}`);
      if (wv && wv.src && wv.src !== 'about:blank') {
        extractDiscordProfileAndEnhance(wv, acc);
      }
    }
  });
}, 2500);

function updateWebviewStates() {
  const currentAcc = accounts.find((a) => a.id === activeAccountId);
  if (currentAcc) ensureWebviewSlot(currentAcc, true);

  if (splitMode && splitAccountId) {
    const secondaryAcc = accounts.find((a) => a.id === splitAccountId);
    if (secondaryAcc) ensureWebviewSlot(secondaryAcc, true);
  }

  // Remove any deleted slots
  const validIds = accounts.map((a) => `slot-${a.id}`);
  const allSlots = webviewsContainer.querySelectorAll('.webview-slot');
  allSlots.forEach((slot) => {
    if (!validIds.includes(slot.id)) slot.remove();
  });

  // Toggle Visibility Classes on Slots
  if (splitMode && splitAccountId) {
    webviewsContainer.classList.add('split-mode');
    btnToggleSplit.querySelector('.action-icon').classList.add('active');
    splitSelectorWrapper.classList.remove('hidden');

    allSlots.forEach((slot) => {
      slot.className = 'webview-slot';
      if (slot.id === `slot-${activeAccountId}`) {
        slot.classList.add('visible', 'split-left');
      } else if (slot.id === `slot-${splitAccountId}`) {
        slot.classList.add('visible', 'split-right');
      }
    });
  } else {
    webviewsContainer.classList.remove('split-mode');
    btnToggleSplit.querySelector('.action-icon').classList.remove('active');
    splitSelectorWrapper.classList.add('hidden');

    allSlots.forEach((slot) => {
      slot.className = 'webview-slot';
      if (slot.id === `slot-${activeAccountId}`) {
        slot.classList.add('visible');
      }
    });
  }
}

function setActiveAccount(id) {
  if (activeAccountId === id && !splitMode) return;
  activeAccountId = id;

  if (splitMode && splitAccountId === activeAccountId) {
    const another = accounts.find((a) => a.id !== activeAccountId);
    splitAccountId = another ? another.id : null;
    if (!splitAccountId) splitMode = false;
  }

  renderSidebar();
  updateWebviewStates();
  updateTopbar();
  updateSplitDropdown();
}

function updateTopbar() {
  const currentIndex = accounts.findIndex((a) => a.id === activeAccountId);
  const current = accounts[currentIndex];
  if (current) {
    topbarTitle.innerText = current.name;
    if (topbarOrderTag) {
      topbarOrderTag.innerText = `#${currentIndex >= 0 ? currentIndex + 1 : 1}`;
    }
    const color = current.color || '#23a55a';
    topbarStatusDot.style.backgroundColor = color;
    topbarStatusDot.style.boxShadow = `0 0 8px ${color}`;
    if (topbarPulseRing) {
      topbarPulseRing.style.borderColor = color;
    }

    // Trigger smooth bounce entrance animation on account switch
    if (accountPill) {
      accountPill.classList.remove('animate-change');
      void accountPill.offsetWidth; // Force reflow
      accountPill.classList.add('animate-change');
    }
  }
}

if (accountPill) {
  accountPill.addEventListener('click', () => {
    btnEditAccount.click();
  });
}

function updateSplitDropdown() {
  splitSelect.innerHTML = '';
  accounts.forEach((acc) => {
    if (acc.id !== activeAccountId) {
      const opt = document.createElement('option');
      opt.value = acc.id;
      opt.innerText = acc.name;
      if (acc.id === splitAccountId) opt.selected = true;
      splitSelect.appendChild(opt);
    }
  });
}

// User Actions
btnAddAccount.addEventListener('click', () => {
  const newId = Date.now();
  const nextNum = accounts.length + 1;
  const newAccount = {
    id: newId,
    name: `Tài khoản ${nextNum}`,
    color: '#5865F2',
    partition: `persist:discord_acc_${newId}`,
    avatarUrl: null,
    unreadCount: 0,
    hasUnread: false
  };

  accounts.push(newAccount);
  saveAccounts();
  setActiveAccount(newId);
});

btnToggleSplit.addEventListener('click', () => {
  if (accounts.length < 2) {
    alert('Cần ít nhất 2 tài khoản để bật chế độ chia đôi màn hình (Split View). Hãy bấm nút (+) để thêm tài khoản thứ 2 trước!');
    return;
  }
  splitMode = !splitMode;
  if (splitMode) {
    if (!splitAccountId || splitAccountId === activeAccountId) {
      const another = accounts.find((a) => a.id !== activeAccountId);
      splitAccountId = another ? another.id : null;
    }
  }
  updateWebviewStates();
  updateSplitDropdown();
});

splitSelect.addEventListener('change', (e) => {
  splitAccountId = Number(e.target.value);
  updateWebviewStates();
});

btnReload.addEventListener('click', () => {
  const wv = document.getElementById(`webview-${activeAccountId}`);
  if (wv) wv.reload();
});

// Prompt Delete Account Flow (Topbar button or Sidebar 'x')
btnDeleteAccount.addEventListener('click', () => {
  promptDeleteAccount(activeAccountId);
});

function promptDeleteAccount(id) {
  if (accounts.length <= 1) {
    alert('Không thể đóng: Bạn phải giữ lại ít nhất 1 tài khoản.');
    return;
  }

  const target = accounts.find((a) => a.id === id);
  if (!target) return;

  accountPendingDeleteId = id;
  confirmAccountName.innerText = `"${target.name}"`;
  modalConfirmDelete.classList.remove('hidden');
}

modalBtnConfirmCancel.addEventListener('click', () => {
  modalConfirmDelete.classList.add('hidden');
  accountPendingDeleteId = null;
});

modalBtnConfirmDelete.addEventListener('click', () => {
  if (!accountPendingDeleteId) return;

  const idToDelete = accountPendingDeleteId;
  modalConfirmDelete.classList.add('hidden');
  accountPendingDeleteId = null;

  // Perform deletion
  accounts = accounts.filter((a) => a.id !== idToDelete);
  saveAccounts();

  // If deleted account was active, switch to first account
  if (activeAccountId === idToDelete) {
    activeAccountId = accounts[0].id;
  }

  if (splitAccountId === idToDelete) {
    const another = accounts.find((a) => a.id !== activeAccountId);
    splitAccountId = another ? another.id : null;
    if (!splitAccountId) splitMode = false;
  }

  renderSidebar();
  updateWebviewStates();
  updateTopbar();
  updateSplitDropdown();
  updateGlobalDockBadge();
});

// Edit Modal
btnEditAccount.addEventListener('click', () => {
  const current = accounts.find((a) => a.id === activeAccountId);
  if (!current) return;

  editingAccountId = current.id;
  modalTitle.innerText = `Chỉnh sửa: ${current.name}`;
  inputAccountName.value = current.name;

  colorChips.forEach((chip) => {
    if (chip.dataset.color.toLowerCase() === (current.color || '#5865f2').toLowerCase()) {
      chip.classList.add('selected');
    } else {
      chip.classList.remove('selected');
    }
  });

  modalEdit.classList.remove('hidden');
  inputAccountName.focus();
});

colorChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    colorChips.forEach((c) => c.classList.remove('selected'));
    chip.classList.add('selected');
  });
});

modalBtnCancel.addEventListener('click', () => {
  modalEdit.classList.add('hidden');
});

modalBtnSave.addEventListener('click', () => {
  if (!editingAccountId) return;
  const current = accounts.find((a) => a.id === editingAccountId);
  if (current) {
    current.name = inputAccountName.value.trim() || current.name;
    const selectedChip = document.querySelector('.color-chip.selected');
    if (selectedChip) {
      current.color = selectedChip.dataset.color;
    }
    saveAccounts();
    renderSidebar();
    updateTopbar();
    updateSplitDropdown();
  }
  modalEdit.classList.add('hidden');
});

// Helper for testing unread badges via console
window.testUnreadBadge = (count = 3) => {
  const current = accounts.find((a) => a.id === activeAccountId);
  if (current) {
    current.unreadCount = count;
    current.hasUnread = count > 0;
    updateAccountBadge(current);
    updateGlobalDockBadge();
    console.log(`[MultiCord] Simulating ${count} unread messages on ${current.name}`);
  }
};

// Keyboard Shortcuts
window.addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey) {
    const num = parseInt(e.key, 10);
    if (!isNaN(num) && num >= 1 && num <= accounts.length) {
      setActiveAccount(accounts[num - 1].id);
    }
    if (e.key === 't' || e.key === 'T') {
      btnAddAccount.click();
    }
    if (e.key === 'r' || e.key === 'R') {
      btnReload.click();
    }
    if (e.key === 'd' || e.key === 'D') {
      btnToggleSplit.click();
    }
  }
});

// Application Launch
initSplash();
loadAccounts();
renderSidebar();
updateWebviewStates();
updateTopbar();
updateGlobalDockBadge();
