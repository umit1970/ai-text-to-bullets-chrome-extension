# 🚀 AI Text to Bullets - Chrome Extension

Seçili metni AI kullanarak otomatik olarak İngilizce bullet point'lere çeviren profesyonel Chrome extension'ı.

## ✨ Özellikler

### 🤖 Çoklu AI Provider Desteği
- **OpenAI** (GPT-4o-mini)
- **Anthropic** (Claude 3.5 Sonnet)
- **DeepSeek**
- **Mistral AI**
- **Qwen** (Alibaba Cloud)
- **Ollama** (Local model desteği)

### 🔒 Güvenlik
- API key'ler Chrome Sync Storage'da güvenli şekilde saklanır
- Tüm veriler şifrelenmiş formatta tutulur
- Hiçbir veri üçüncü parti sunuculara gönderilmez
- API çağrıları doğrudan provider'lara yapılır

### 🎨 Kullanıcı Deneyimi
- Modern ve şık arayüz
- Floating button ile kolay erişim
- Popup sonuç penceresi
- Tek tıkla kopyalama
- Dark mode desteği
- Responsive tasarım

### ⌨️ Klavye Kısayolları
- **Windows/Linux:** `Ctrl + Shift + B`
- **Mac:** `Cmd + Shift + B`

### 🎯 Özelleştirme
- Özel prompt yazabilme
- Buton stilini değiştirme
- Keyboard shortcut özelleştirme
- Model seçimi (Ollama için)

## 📦 Kurulum

1. Bu repository'yi indirin veya klonlayın
2. Chrome'da `chrome://extensions` sayfasını açın
3. Sağ üst köşeden "Developer mode"u aktif edin
4. "Load unpacked" butonuna tıklayın
5. İndirdiğiniz klasörü seçin

## ⚙️ Ayarlar

1. Extension ikonuna tıklayın
2. "Ayarlar" butonuna tıklayın
3. AI Provider seçin
4. API Key girin
5. "API Testi" ile bağlantıyı kontrol edin
6. "Kaydet" butonuna tıklayın

### API Key Alma

- **OpenAI:** https://platform.openai.com/api-keys
- **Anthropic:** https://console.anthropic.com/
- **DeepSeek:** https://platform.deepseek.com/
- **Mistral:** https://console.mistral.ai/
- **Qwen:** https://dashscope.aliyun.com/
- **Ollama:** Local kurulum için: https://ollama.ai/

## 🎯 Kullanım

### Yöntem 1: Mouse ile
1. Herhangi bir web sayfasında metin seçin
2. Beliren "Bullet Points" butonuna tıklayın
3. Sonucu popup penceresinde görün

### Yöntem 2: Klavye Kısayolu
1. Metni seçin
2. `Ctrl + Shift + B` (veya Mac'te `Cmd + Shift + B`) tuşlarına basın
3. Sonucu görün

## 🔧 Teknik Detaylar

### Dosya Yapısı
```
text-to-bullets-extension/
├── manifest.json          # Extension yapılandırması
├── background.js          # Service worker (AI API çağrıları)
├── content.js            # Sayfa içi script (buton ve popup)
├── content.css           # Stil dosyası
├── options.html          # Ayarlar sayfası
├── options.js            # Ayarlar script'i
├── popup.html            # Extension popup'ı
├── popup.js              # Popup script'i
├── icon16.png            # 16x16 ikon
├── icon48.png            # 48x48 ikon
├── icon128.png           # 128x128 ikon
└── README.md             # Bu dosya
```

### API Entegrasyonları

#### OpenAI
```javascript
endpoint: https://api.openai.com/v1/chat/completions
model: gpt-4o-mini
```

#### Anthropic (Claude)
```javascript
endpoint: https://api.anthropic.com/v1/messages
model: claude-3-5-sonnet-20241022
```

#### DeepSeek
```javascript
endpoint: https://api.deepseek.com/v1/chat/completions
model: deepseek-chat
```

#### Mistral
```javascript
endpoint: https://api.mistral.ai/v1/chat/completions
model: mistral-small-latest
```

#### Qwen
```javascript
endpoint: https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation
model: qwen-turbo
```

#### Ollama
```javascript
endpoint: http://localhost:11434/api/generate
model: Kullanıcı tanımlı (varsayılan: llama2)
```

## 🎨 Özelleştirme

### Prompt Değiştirme
Ayarlar sayfasında "Özel Prompt" alanına kendi prompt'unuzu yazabilirsiniz:

```
Convert the following text into concise English bullet points:

{text}

Focus on:
- Key information
- Action items
- Important dates
```

### Buton Stilini Değiştirme
`content.css` dosyasındaki `.ai-bullets-floating-btn` class'ını düzenleyin:

```css
.ai-bullets-floating-btn {
  background: linear-gradient(135deg, #YOUR_COLOR1, #YOUR_COLOR2);
  /* diğer stil özellikleri */
}
```

## 🐛 Sorun Giderme

### API Hatası
- API key'inizin doğru olduğundan emin olun
- API key'inizin aktif kredisi olduğunu kontrol edin
- "API Testi" özelliğini kullanarak bağlantıyı test edin

### Buton Görünmüyor
- Metni mouse ile seçtiğinizden emin olun
- Extension'ın yüklü ve aktif olduğunu kontrol edin
- Sayfayı yenileyin (F5)

### Ollama Çalışmıyor
- Ollama'nın bilgisayarınızda kurulu ve çalışır durumda olduğundan emin olun
- URL'yi kontrol edin (varsayılan: http://localhost:11434)
- Model isminin doğru olduğunu kontrol edin

## 📝 Lisans

MIT License - Özgürce kullanabilir, değiştirebilir ve dağıtabilirsiniz.

## 🤝 Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır. Büyük değişiklikler için önce issue açarak neleri değiştirmek istediğinizi tartışın.

## 📧 İletişim

Sorularınız veya önerileriniz için issue açabilirsiniz.

## 🙏 Teşekkürler

Bu extension'ı kullandığınız için teşekkür ederiz! Beğendiyseniz ⭐ vermeyi unutmayın.
