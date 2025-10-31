# 🚀 KURULUM KILAVUZU

## Chrome Extension Kurulumu

### Adım 1: Klasörü Hazırlayın
1. İndirdiğiniz ZIP dosyasını açın
2. `text-to-bullets-extension` klasörünü bir yere kaydedin

### Adım 2: Chrome'da Developer Mode'u Açın
1. Chrome tarayıcınızı açın
2. Adres çubuğuna `chrome://extensions` yazın ve Enter'a basın
3. Sağ üst köşede "Developer mode" (Geliştirici modu) düğmesini aktif edin

### Adım 3: Extension'ı Yükleyin
1. "Load unpacked" (Paketlenmemiş uzantı yükle) butonuna tıklayın
2. `text-to-bullets-extension` klasörünü seçin
3. "Select Folder" butonuna tıklayın

✅ Extension yüklendi! Toolbar'da mor-pembe gradyan renkli ikon göreceksiniz.

## İlk Kurulum

### 1. API Key Alın
Kullanmak istediğiniz AI provider'dan API key alın:

- **OpenAI (Önerilen):** https://platform.openai.com/api-keys
- **Anthropic (Claude):** https://console.anthropic.com/
- **DeepSeek (Uygun Fiyat):** https://platform.deepseek.com/
- **Mistral:** https://console.mistral.ai/
- **Qwen:** https://dashscope.aliyun.com/
- **Ollama (Ücretsiz/Local):** https://ollama.ai/

### 2. Ayarları Yapılandırın
1. Extension ikonuna tıklayın
2. "⚙️ Ayarlar" butonuna tıklayın
3. Açılan sayfada:
   - **AI Provider** seçin
   - **API Key** girin
   - (Opsiyonel) Özel prompt yazın
4. "🧪 API Testi" butonuna tıklayarak bağlantıyı test edin
5. "💾 Kaydet" butonuna tıklayın

### 3. İlk Kullanım
1. Herhangi bir web sayfasında metin seçin
2. Beliren mor "Bullet Points" butonuna tıklayın
3. AI'nin oluşturduğu bullet point'leri popup penceresinde görün
4. "📋 Kopyala" ile sonucu kopyalayın

## Klavye Kısayolu

- **Windows/Linux:** `Ctrl + Shift + B`
- **Mac:** `Cmd + Shift + B`

Metni seçtikten sonra bu kısayolu kullanarak hızlıca dönüştürebilirsiniz.

## Sorun Giderme

### Extension Yüklenmedi
- Developer mode'un aktif olduğundan emin olun
- Doğru klasörü seçtiğinizden emin olun (içinde manifest.json olmalı)
- Chrome'u yeniden başlatın

### Buton Görünmüyor
- En az 10 karakter metin seçin
- Sayfayı yenileyin (F5)
- Extension'ın aktif olduğunu kontrol edin

### API Hatası
- API key'inizin doğru olduğundan emin olun
- Hesabınızda kredi olduğunu kontrol edin
- "API Testi" özelliğini kullanın

### Ollama Bağlanmıyor
- Ollama'nın kurulu ve çalışır durumda olduğundan emin olun
- Terminal'de `ollama serve` komutunu çalıştırın
- Ayarlardan URL'yi kontrol edin (varsayılan: http://localhost:11434)
- Model isminin doğru olduğunu kontrol edin

## Güvenlik Notları

✅ **GÜVENLİ:**
- API key'ler Chrome Sync Storage'da güvenli şekilde saklanır
- Veriler şifrelenir
- Hiçbir veri üçüncü parti sunuculara gönderilmez
- API çağrıları direkt provider'lara yapılır

❌ **ASLA:**
- API key'inizi başkalarıyla paylaşmayın
- Public GitHub'a API key koymayın
- Şüpheli web sitelerinde extension'ı kullanmayın

## İyi Kullanımlar! 🎉

Sorularınız için: GitHub'da issue açın veya README'deki iletişim bilgilerini kullanın.
