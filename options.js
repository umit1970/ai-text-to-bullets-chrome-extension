// Options Page Script
const form = document.getElementById('settingsForm');
const providerSelect = document.getElementById('provider');
const apiKeyInput = document.getElementById('apiKey');
const testBtn = document.getElementById('testBtn');
const statusMessage = document.getElementById('statusMessage');
const ollamaSettings = document.getElementById('ollamaSettings');

// Load saved settings
chrome.storage.sync.get([
  'provider', 
  'apiKey', 
  'customPrompt',
  'ollamaUrl',
  'ollamaModel'
], (result) => {
  if (result.provider) {
    providerSelect.value = result.provider;
    toggleOllamaSettings();
  }
  if (result.apiKey) {
    apiKeyInput.value = result.apiKey;
  }
  if (result.customPrompt) {
    document.getElementById('customPrompt').value = result.customPrompt;
  }
  if (result.ollamaUrl) {
    document.getElementById('ollamaUrl').value = result.ollamaUrl;
  }
  if (result.ollamaModel) {
    document.getElementById('ollamaModel').value = result.ollamaModel;
  }
});

// Toggle Ollama settings
providerSelect.addEventListener('change', toggleOllamaSettings);

function toggleOllamaSettings() {
  ollamaSettings.style.display = providerSelect.value === 'ollama' ? 'block' : 'none';
}

// Save settings
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const settings = {
    provider: providerSelect.value,
    apiKey: apiKeyInput.value,
    customPrompt: document.getElementById('customPrompt').value,
    ollamaUrl: document.getElementById('ollamaUrl').value,
    ollamaModel: document.getElementById('ollamaModel').value
  };

  chrome.storage.sync.set(settings, () => {
    showStatus('✅ Ayarlar kaydedildi!', 'success');
  });
});

// Test API
testBtn.addEventListener('click', async () => {
  const provider = providerSelect.value;
  const apiKey = apiKeyInput.value;

  if (!provider || !apiKey) {
    showStatus('⚠️ Lütfen provider ve API key girin', 'error');
    return;
  }

  showStatus('🔄 Test ediliyor...', 'info');
  testBtn.disabled = true;

  try {
    const testPrompt = 'Say "API test successful" in 3 words';
    let result;

    switch (provider) {
      case 'openai':
        result = await testOpenAI(apiKey, testPrompt);
        break;
      case 'anthropic':
        result = await testAnthropic(apiKey, testPrompt);
        break;
      case 'deepseek':
        result = await testDeepSeek(apiKey, testPrompt);
        break;
      case 'mistral':
        result = await testMistral(apiKey, testPrompt);
        break;
      case 'qwen':
        result = await testQwen(apiKey, testPrompt);
        break;
      case 'ollama':
        const ollamaUrl = document.getElementById('ollamaUrl').value;
        const ollamaModel = document.getElementById('ollamaModel').value;
        result = await testOllama(ollamaUrl, ollamaModel, testPrompt);
        break;
      default:
        throw new Error('Desteklenmeyen provider');
    }

    showStatus(`✅ API testi başarılı! Yanıt: "${result}"`, 'success');
  } catch (error) {
    showStatus(`❌ API testi başarısız: ${error.message}`, 'error');
  } finally {
    testBtn.disabled = false;
  }
});

// Test functions
async function testOpenAI(apiKey, prompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 50
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'API hatası');
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

async function testAnthropic(apiKey, prompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 50,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'API hatası');
  }

  const data = await response.json();
  return data.content[0].text.trim();
}

async function testDeepSeek(apiKey, prompt) {
  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'API hatası');
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

async function testMistral(apiKey, prompt) {
  const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'mistral-small-latest',
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API hatası');
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

async function testQwen(apiKey, prompt) {
  const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'qwen-turbo',
      input: { messages: [{ role: 'user', content: prompt }] }
    })
  });

  if (!response.ok) {
    throw new Error('API hatası');
  }

  const data = await response.json();
  return data.output.text.trim();
}

async function testOllama(url, model, prompt) {
  const response = await fetch(`${url}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: model,
      prompt: prompt,
      stream: false
    })
  });

  if (!response.ok) {
    throw new Error('Ollama bağlantısı başarısız. URL ve model ismini kontrol edin.');
  }

  const data = await response.json();
  return data.response.trim();
}

function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status-message status-${type}`;
  statusMessage.style.display = 'block';

  if (type === 'success') {
    setTimeout(() => {
      statusMessage.style.display = 'none';
    }, 3000);
  }
}
