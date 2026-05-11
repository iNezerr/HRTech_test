# AI Interview Question Generator

A lightweight MVP that generates technical interview questions using AI. Built for rapid development and user feedback testing.

## Links

- **Live Vercel URL**: [https://hrtech-alpha.vercel.app/index.html](https://hrtech-alpha.vercel.app/index.html)
- **Loom Video**: [https://www.loom.com/share/34de1f79995a483fb29f18c4aae7acf3](https://www.loom.com/share/34de1f79995a483fb29f18c4aae7acf3)

## Tech Stack

- **Frontend**: HTML, jQuery, Tailwind CSS (via CDN)
- **Backend**: Python, FastAPI
- **AI**: Google Gemini API

## Architecture and Choices

This project follows a "fast first" philosophy—prioritizing speed of development to deliver a working MVP quickly and gather user feedback.

- **FastAPI**: Chosen for its high performance and automatic API documentation, enabling rapid backend development.
- **Tailwind CSS via CDN**: Allows for fast styling without a build step, keeping the frontend lightweight and deployable.
- **jQuery**: Simplifies DOM manipulation and AJAX calls for quick frontend interactivity.
- **Gemini API**: Provides powerful AI capabilities for generating relevant interview questions.

The architecture is intentionally simple: a frontend that consumes a FastAPI backend, which in turn calls the Gemini API. This minimizes complexity while delivering core functionality.

## How to Run Locally

1. **Clone the repository** (if not already cloned)

2. **Create a Python virtual environment**:
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Create a `.env` file** in the root directory and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

6. **Start the FastAPI server** using Uvicorn:
   ```bash
   uvicorn api.main:app --reload
   ```

7. **Open your browser** and navigate to `http://localhost:8000` to access the application.

The API documentation will be available at `http://localhost:8000/docs`.
