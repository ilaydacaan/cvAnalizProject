from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from tempfile import TemporaryDirectory
import os
import uvicorn
from cv_ai_analyzer import analyze_cv_folder_semantic, read_cv_content, analyze_cv_with_gemini

UPLOAD_DIR = "cvler"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite için 5173, CRA için 3000
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
        for file in files:
            safe_filename = os.path.basename(file.filename)
            file_path = os.path.join(UPLOAD_DIR, safe_filename)

            with open(file_path, "wb") as f:
                contents = await file.read()
                f.write(contents)

        return {"status": "Dosyalar başarıyla yüklendi."}
    except Exception as e:
        return {"error": str(e)}

@app.get("/rankings")
async def get_rankings():
    results = []

    for filename in os.listdir(UPLOAD_DIR):
        if filename.endswith(('.pdf', '.txt')):
            file_path = os.path.join(UPLOAD_DIR, filename)
            content = read_cv_content(file_path)
            if not content or len(content.split()) < 20:
                continue
            result = analyze_cv_with_gemini(content)
            score = float(result.get("score", 0.0))
            results.append({
                "name": filename,
                "score": score
            })

    sorted_results = sorted(results, key=lambda x: x["score"], reverse=True)
    return sorted_results

if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8001, reload=True)
