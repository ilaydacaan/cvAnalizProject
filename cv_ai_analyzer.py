import os
import re
import time
import json
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

# 🔢 JSON'dan puan hesapla
def calculate_score(analysis: str) -> float:
    try:
        json_text_match = re.search(r"\{.*\}", analysis, re.DOTALL)
        if json_text_match:
            json_text = json_text_match.group()
            data = json.loads(json_text)
            scores = list(data.values())
            scores = [int(s) for s in scores if isinstance(s, int) and 0 <= s <= 100]
            if scores:
                print(f"📊 JSON'dan alınan puanlar: {scores}")
                return round(sum(scores) / len(scores), 2)
    except Exception as e:
        print(f"⚠️ Skor hesaplama hatası: {e}")
    return 0.0

# 🤖 Gemini API ile CV analiz et
def analyze_cv_with_gemini(cv_content: str) -> dict:
    try:
        model = genai.GenerativeModel("models/gemini-2.0-flash")

        prompt = f"""
Aşağıda bir CV metni bulunmaktadır. Lütfen bu kişiyi 5 kritere göre değerlendir ve SADECE aşağıdaki JSON çıktısını üret:

{{
  "education": 0-100,
  "experience": 0-100,
  "technical_skills": 0-100,
  "language_skills": 0-100,
  "overall": 0-100
}}

CV:
\"\"\"{cv_content[:4000]}\"\"\"
"""

        response = model.generate_content(prompt)

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

# 📁 Klasördeki tüm CV'leri değerlendir ve en iyisini döndür
def analyze_cv_folder_semantic(folder_path: str) -> Tuple[Optional[str], Optional[float]]:
    results = []

    for filename in os.listdir(folder_path):
        if filename.endswith(('.pdf', '.txt')):
            file_path = os.path.join(folder_path, filename)
            cv_content = read_cv_content(file_path)

            if not cv_content or len(cv_content.split()) < 20:
                print(f"⚠️ {filename} içeriği çok kısa veya boş. Atlandı.")
                continue

            print(f"\n🔍 {filename} analiz ediliyor...")

            result = analyze_cv_with_gemini(cv_content)
            score = float(result.get("score", 0.0))
            summary = result.get("analysis", "")[:300]

            results.append({
                "filename": filename,
                "score": score,
                "summary": summary
            })

            print(f"✅ Skor: {score} | Dosya: {filename}")
            print(f"📄 Özet:\n{summary}\n")

            time.sleep(2)

    if not results:
        print("❗ Hiçbir uygun CV bulunamadı.")
        return None, None

    sorted_results = sorted(results, key=lambda x: x["score"], reverse=True)

    print("\n📊 CV Skor Sıralaması (En İyiden En Kötüye):")
    for idx, item in enumerate(sorted_results, 1):
        print(f"{idx}. {item['filename']} → Skor: {item['score']}")

    best = sorted_results[0]
    print(f"\n🏆 En iyi CV: {best['filename']} (Skor: {best['score']})")

    return best["filename"], best["score"]
