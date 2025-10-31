// Background Service Worker
console.log('AI Text to Bullets - Background Service Worker Loaded');

// Keyboard shortcut listener
chrome.commands.onCommand.addListener((command) => {
  if (command === 'convert-to-bullets') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'showButton' });
      }
    });
  }
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'convertText') {
    handleConversion(request.text, request.settings)
      .then(result => sendResponse({ success: true, result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep message channel open for async response
  }
});

// Main conversion function
async function handleConversion(text, settings) {
  const { provider, apiKey, customPrompt } = settings;

  if (!apiKey || !provider) {
    throw new Error('API key veya provider bulunamadı. Lütfen ayarları kontrol edin.');
  }

  const prompt = customPrompt || 
    `Convert the following text into concise English bullet points. Extract key information and present it in a clear, structured format with bullet points:

${text}

Return ONLY the bullet points in English, nothing else.`;

  // Call appropriate AI provider
  switch (provider) {
    case 'openai':
      return await callOpenAI(apiKey, prompt);
    case 'anthropic':
      return await callAnthropic(apiKey, prompt);
    case 'deepseek':
      return await callDeepSeek(apiKey, prompt);
    case 'mistral':
      return await callMistral(apiKey, prompt);
    case 'qwen':
      return await callQwen(apiKey, prompt);
    case 'ollama':
      return await callOllama(apiKey, prompt, settings.ollamaUrl, settings.ollamaModel);
    default:
      throw new Error('Desteklenmeyen AI provider');
  }
}

// OpenAI API
async function callOpenAI(apiKey, prompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 2000
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'OpenAI API hatası');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Anthropic (Claude) API
async function callAnthropic(apiKey, prompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Anthropic API hatası');
  }

  const data = await response.json();
  return data.content[0].text;
}

// DeepSeek API
async function callDeepSeek(apiKey, prompt) {
  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'DeepSeek API hatası');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Mistral API
async function callMistral(apiKey, prompt) {
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
    throw new Error(error.message || 'Mistral API hatası');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Qwen API (Alibaba Cloud)
async function callQwen(apiKey, prompt) {
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
    throw new Error('Qwen API hatası');
  }

  const data = await response.json();
  return data.output.text;
}

// Ollama (Local)
async function callOllama(apiKey, prompt, ollamaUrl = 'http://localhost:11434', ollamaModel = 'llama2') {
  const response = await fetch(`${ollamaUrl}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: ollamaModel,
      prompt: prompt,
      stream: false
    })
  });

  if (!response.ok) {
    throw new Error('Ollama API hatası');
  }

  const data = await response.json();
  return data.response;
}
