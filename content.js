// Content Script - Runs on all pages
let floatingButton = null;
let resultPopup = null;

// Listen for text selection
document.addEventListener('mouseup', handleTextSelection);

// Listen for keyboard shortcut
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'showButton') {
    handleTextSelection();
  }
});

function handleTextSelection() {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText.length > 10) {
    showFloatingButton(selectedText);
  } else {
    removeFloatingButton();
  }
}

function showFloatingButton(text) {
  removeFloatingButton();

  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  floatingButton = document.createElement('div');
  floatingButton.className = 'ai-bullets-floating-btn';
  floatingButton.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M2 4a1 1 0 011-1h10a1 1 0 110 2H3a1 1 0 01-1-1zm0 4a1 1 0 011-1h10a1 1 0 110 2H3a1 1 0 01-1-1zm0 4a1 1 0 011-1h10a1 1 0 110 2H3a1 1 0 01-1-1z"/>
    </svg>
    <span>Bullet Points</span>
  `;

  floatingButton.style.position = 'absolute';
  floatingButton.style.left = `${rect.left + window.scrollX}px`;
  floatingButton.style.top = `${rect.bottom + window.scrollY + 10}px`;
  floatingButton.style.zIndex = '999999';

  floatingButton.addEventListener('click', () => {
    convertTextToBullets(text);
    removeFloatingButton();
  });

  document.body.appendChild(floatingButton);

  // Auto-remove after 5 seconds
  setTimeout(removeFloatingButton, 5000);
}

function removeFloatingButton() {
  if (floatingButton) {
    floatingButton.remove();
    floatingButton = null;
  }
}

async function convertTextToBullets(text) {
  // Show loading popup
  showResultPopup('🔄 AI ile işleniyor...', true);

  try {
    // Get settings from storage
    const settings = await chrome.storage.sync.get([
      'provider', 
      'apiKey', 
      'customPrompt',
      'ollamaUrl',
      'ollamaModel'
    ]);

    if (!settings.apiKey || !settings.provider) {
      throw new Error('Lütfen önce ayarlardan API key ve provider seçin');
    }

    // Send to background for processing
    chrome.runtime.sendMessage(
      { 
        action: 'convertText', 
        text: text,
        settings: settings
      },
      (response) => {
        if (response.success) {
          showResultPopup(response.result, false);
        } else {
          showResultPopup(`❌ Hata: ${response.error}`, false);
        }
      }
    );

  } catch (error) {
    showResultPopup(`❌ Hata: ${error.message}`, false);
  }
}

function showResultPopup(content, isLoading) {
  // Remove existing popup
  if (resultPopup) {
    resultPopup.remove();
  }

  resultPopup = document.createElement('div');
  resultPopup.className = 'ai-bullets-result-popup';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'ai-bullets-close-btn';
  closeBtn.innerHTML = '×';
  closeBtn.onclick = () => resultPopup.remove();

  const contentDiv = document.createElement('div');
  contentDiv.className = 'ai-bullets-content';
  contentDiv.style.whiteSpace = 'pre-wrap';
  contentDiv.textContent = content;

  const copyBtn = document.createElement('button');
  copyBtn.className = 'ai-bullets-copy-btn';
  copyBtn.textContent = '📋 Kopyala';
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(content);
    copyBtn.textContent = '✅ Kopyalandı!';
    setTimeout(() => {
      copyBtn.textContent = '📋 Kopyala';
    }, 2000);
  };

  resultPopup.appendChild(closeBtn);
  resultPopup.appendChild(contentDiv);

  if (!isLoading) {
    resultPopup.appendChild(copyBtn);
  }

  document.body.appendChild(resultPopup);
}

// Clean up on page unload
window.addEventListener('beforeunload', () => {
  removeFloatingButton();
  if (resultPopup) resultPopup.remove();
});
