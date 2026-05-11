import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


class JobRequest(BaseModel):
    job_title: str


class QuestionResponse(BaseModel):
    questions: list[str]


@app.post("/api/generate")
async def generate_questions(request: JobRequest) -> QuestionResponse:
    try:
        generation_config = genai.GenerationConfig(
            temperature=0.7,
            top_p=0.8,
            top_k=40,
            max_output_tokens=1024,
            response_mime_type="application/json"
        )
        model = genai.GenerativeModel("gemini-2.5-flash", generation_config=generation_config)
        prompt = f"You are an HR expert. The job title is {request.job_title}. Generate exactly 3 thoughtful interview questions for this specific role. Return the output ONLY as a raw JSON array of 3 strings. Do not use markdown blocks. Do not include any other text."
        response = model.generate_content(prompt)
        questions = json.loads(response.text)
        return QuestionResponse(questions=questions)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate questions: {str(e)}")
