from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import uuid
import google.generativeai as genai

# Load environment variables from .env
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise Exception("GEMINI_API_KEY not found in .env file!")

# Configure the Gemini API
genai.configure(api_key=api_key)

# Initialize Flask app
app = Flask(__name__)
sessions = {}  # In-memory session storage

# Health check
@app.route('/')
def health_check():
    return "✅ Gemini Flask API is running!"

# Initialize a new chat session with user context
@app.route('/init_session', methods=['POST'])
def init_session():
    data = request.get_json()
    context = data.get("context", "")

    try:
        # Start a Gemini chat session with initial context
        model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")
        chat = model.start_chat(history=[])
        system_prompt = (
            "You are helping a non-verbal person communicate with others. "
            "They cannot speak, so they press one or more visual symbols to express their intent. "
            "Your job is to interpret those symbols and generate a clear, polite, and natural sentence that communicates what they are trying to say. "
            "From now on, you will receive lists of symbols like ['hungry', 'soup', 'please'] and you must convert them into full sentences. "
            "Use the user's personal context below to better understand their situation and style of communication:\n\n"
            f"{context}"
        )
        chat.send_message(system_prompt)

        # Create a UUID session
        session_id = str(uuid.uuid4())
        sessions[session_id] = chat

        return jsonify({"session_id": session_id})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Send user-selected symbols to Gemini and receive interpreted message
@app.route('/send_symbols', methods=['POST'])
def send_symbols():
    data = request.get_json()
    session_id = data.get("session_id")
    symbols = data.get("symbols", [])  # Example: ["hungry", "soup", "please"]

    if session_id not in sessions:
        return jsonify({"error": "Invalid session ID"}), 400

    try:
        chat = sessions[session_id]
        # Build prompt from selected symbols
        prompt = f"The user pressed the following symbols: {', '.join(symbols)}. Interpret this as a clear, polite sentence for communication, based on the user's earlier context."

        # Generate response using Gemini
        response = chat.send_message(prompt)
        return jsonify({"message": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Optional: clear all sessions (dev tool)
@app.route('/clear_sessions', methods=['POST'])
def clear_sessions():
    sessions.clear()
    return jsonify({"message": "All sessions cleared."})
