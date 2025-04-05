# Gemini Communication Backend

This is a lightweight Flask-based backend powered by Google Gemini. It interprets button-based symbol selections from non-verbal users into natural language messages using AI. The backend maintains per-user sessions to preserve context.

---

## Features

- Session-based AI conversations using Gemini 1.5 Pro
- Interprets selected symbols (e.g., "hungry", "please") into full sentences
- REST API (2 main endpoints)
- Uses `.env` for safe API key handling

---

## Requirements

- Python 3.8+
- Google Gemini API key (get it here: https://aistudio.google.com/app/apikey)
- Pip & virtualenv (recommended)


## Setup Instructions

1. Go to the backend
   cd backend

2. Create and activate a virtual environment

   python -m venv venv
   source venv/bin/activate          # On Windows: venv\Scripts\activate

3. Install dependencies

   pip install -r requirements.txt

4. Create your `.env` file

   In the project root, create a file named `.env` and add:

   GEMINI_API_KEY=your-google-api-key-here

5. Run the server

   flask run

   You’ll see something like:

   * Running on http://127.0.0.1:5000

---

## API Endpoints

GET /
Health check  
Returns: "✅ Gemini Flask API is running!"

---

POST /init_session  
Initialize a new session with context.

Request:
{
  "context": "Hi, my name is Alex. I am nonverbal. Help me communicate based on the buttons I press."
}

Response:
{
  "session_id": "f12a9a..."
}

---

POST /send_symbols  
Send user-selected symbols and receive an interpreted message.

Request:
{
  "session_id": "f12a9a...",
  "symbols": ["hungry", "soup", "please"]
}

Response:
{
  "message": "I'm hungry and would like some soup, please."
}

---

Optional: POST /clear_sessions  
Clears all stored sessions (development only)

---

## Tech Stack

- Backend: Flask + Google Generative AI SDK
- AI Model: models/gemini-1.5-pro-latest
- Session Handling: In-memory dictionary (can be extended)
- Config: .env + python-dotenv

---

## Future Ideas

- Store user profiles in a database
- Multilingual output
- TTS integration in frontend
- Export chat logs

---
