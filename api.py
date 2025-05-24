from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from tempfile import TemporaryDirectory
import os
import uvicorn

# Semantic içerik analizi yapan fonksiyonu içe aktar
from cv_ai_analyzer import analyze_cv_folder_semantic

app = FastAPI()

# CORS ayarları – frontend'in erişimine izin veriyoruz
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "CV Analiz API'si çalışıyor"}

@app.post("/analyze-cvs/")
async def analyze_uploaded_files(files: list[UploadFile] = File(...)):
    try:
        with TemporaryDirectory() as tmpdir:
            print(f"[INFO] Geçici klasör oluşturuldu: {tmpdir}")
            
            for file in files:
                safe_filename = os.path.basename(file.filename)
                file_path = os.path.join(tmpdir, safe_filename)

                with open(file_path, "wb") as f:
                    contents = await file.read()
                    f.write(contents)

                print(f"[INFO] Kaydedilen dosya: {safe_filename} ({len(contents)} byte)")

            # Semantic analiz fonksiyonu çağrılıyor
            best_cv, best_score = analyze_cv_folder_semantic(tmpdir)

            if best_cv:
                return {
                    "best_cv": best_cv,
                    "score": best_score
                }
            else:
                return {
                    "error": "Uygun CV bulunamadı."
                }

    except Exception as e:
        print(f"[HATA] CV analizi sırasında hata oluştu: {str(e)}")
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8001, reload=True)
