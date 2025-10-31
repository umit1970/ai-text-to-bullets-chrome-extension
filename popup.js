// Popup Script
document.getElementById('settingsBtn').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

// Check if settings are configured
chrome.storage.sync.get(['provider', 'apiKey'], (result) => {
  const status = document.getElementById('status');

  if (!result.provider || !result.apiKey) {
    status.textContent = '⚠️ Lütfen ayarları yapılandırın';
    status.className = 'status error';
    status.style.display = 'block';
  } else {
    status.textContent = `✅ ${result.provider.toUpperCase()} aktif`;
    status.className = 'status success';
    status.style.display = 'block';
  }
});
