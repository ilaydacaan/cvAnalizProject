import os
import re
import time
import pdfplumber
import google.generativeai as genai
from typing import Tuple, Optional

# ✅ Gemini API Anahtarını ayarla
GOOGLE_API_KEY = "AIzaSyDud_uPIQOc8_kmZenua4OFxa0Iro37TCw"
genai.configure(api_key=GOOGLE_API_KEY)

# 📄 PDF veya TXT'den CV metni çıkar
def read_cv_content(file_path: str) -> str:
    try:
        if file_path.endswith('.pdf'):
            text = ""
            with pdfplumber.open(file_path) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"

            print(f"[DEBUG] {file_path} → {len(text.split())} kelime")
            print(f"[Önizleme] {text[:200]}")
            return text

        elif file_path.endswith('.txt'):
            with open(file_path, 'r', encoding='utf-8') as f:
                text = f.read()
            print(f"[DEBUG] {file_path} → {len(text.split())} kelime")
            print(f"[Önizleme] {text[:200]}")
            return text

        else:
            return ""
    except Exception as e:
        print(f"❌ Dosya okuma hatası ({file_path}): {str(e)}")
        return ""

# 🤖 Gemini API ile CV analiz et
def analyze_cv_with_gemini(cv_content: str) -> dict:
    try:
        model = genai.GenerativeModel("models/gemini-2.0-flash")  # ✅ DOĞRU MODEL ADI

        prompt = f"""
Aşağıda bir CV metni bulunmaktadır. Bu kişiyi aşağıdaki 5 kritere göre değerlendir:

1. Eğitim durumu (0-100)
2. İş/staj deneyimi (0-100)
3. Teknik beceriler (0-100)
4. Dil becerileri (0-100)
5. Genel değerlendirme (0-100)

Her kriter için açıkça 0-100 arasında bir puan ver. Sadece sayıların net geçtiği bir analiz metni üret.

CV:
\"\"\"
{cv_content[:4000]}
\"\"\"
"""

        response = model.generate_content(prompt)

        # Yanıtı güvenli şekilde al
        text = ""
        if hasattr(response, "text"):
            text = response.text.strip()
        elif hasattr(response, "parts") and len(response.parts) > 0:
            text = response.parts[0].text.strip()
        else:
            raise ValueError("Gemini yanıtı alınamadı.")

        print("\n📄 Gemini Yanıtı (ilk 300 karakter):")
        print(text[:300])

        return {
            "analysis": text,
            "score": calculate_score(text)
        }

    except Exception as e:
        print(f"❌ Gemini API hatası: {str(e)}")
        return {"error": str(e), "score": 0.0}

# 🔢 Analiz metninden puan hesapla
def calculate_score(analysis: str) -> float:
    try:
        scores = re.findall(r"\b(\d{1,3})\b", analysis)
        scores = [int(s) for s in scores if 0 <= int(s) <= 100]
        if scores:
            print(f"📊 Sayılar bulundu: {scores}")
            return round(sum(scores) / len(scores), 2)
    except:
        pass
    return 0.0

# 📁 Klasördeki tüm CV'leri değerlendir ve en iyisini döndür
def analyze_cv_folder_semantic(folder_path: str) -> Tuple[Optional[str], Optional[float]]:
    best_cv = None
    best_score = 0.0

    for filename in os.listdir(folder_path):
        if filename.endswith(('.pdf', '.txt')):
            file_path = os.path.join(folder_path, filename)
            cv_content = read_cv_content(file_path)

            # ... (önceki kontrol ve yazdırma kodları) ...

            if not cv_content or len(cv_content.split()) < 20:
                print(f"⚠️ {filename} içeriği çok kısa veya boş. Atlandı.")
                continue

            print(f"\n🔍 {filename} analiz ediliyor...")

            result = analyze_cv_with_gemini(cv_content)
            score = result.get("score", 0.0)
            summary = result.get("analysis", "")[:300]

            print(f"✅ Skor: {score} | Dosya: {filename}")
            print(f"📄 Özet:\n{summary}...\n")

            if score > best_score:
                best_score = score
                best_cv = filename

            # Her analizden sonra kısa bir bekleme ekle
            time.sleep(2) # 2 saniye bekle (ihtiyaca göre ayarlayabilirsiniz)

    if best_cv:
        print(f"\n🏆 En iyi CV: {best_cv} (Skor: {best_score})")
    else:
        print("❗ Hiçbir uygun CV bulunamadı.")

    return best_cv, best_score