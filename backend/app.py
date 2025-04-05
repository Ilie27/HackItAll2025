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

# Initialize a new chat session with user context and profile info
@app.route('/init_session', methods=['POST'])
def init_session():
    data = request.get_json()
    context = data.get("context", "")
    name = data.get("name", "Unknown")
    address = data.get("address", "Unknown location")
    condition = data.get("condition", "non-verbal")

    try:
        # Start a Gemini chat session with initial context
        model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")
        chat = model.start_chat(history=[])

        system_prompt = (
            "You are helping a non-verbal person communicate with others. "
            "They cannot speak, so they press one or more visual symbols to express their intent. "
            "Your job is to interpret those symbols and generate a clear, polite, and natural sentence that communicates what they are trying to say. "
            "Use the user's personal context below to better understand their situation and style of communication:\n\n"
            f"{context}\n\n"
            "From now on, you will receive lists of symbols like ['hungry', 'soup', 'please'] and you must convert them into full sentences. Reply only with a sentence."
        )

        chat.send_message(system_prompt)

        # Create and store the session with profile
        session_id = str(uuid.uuid4())
        sessions[session_id] = {
            "chat": chat,
            "profile": {
                "name": name,
                "address": address,
                "condition": condition
            }
        }

        return jsonify({"session_id": session_id})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Send user-selected symbols to Gemini and receive interpreted message
@app.route('/send_symbols', methods=['POST'])
def send_symbols():
    data = request.get_json()
    session_id = data.get("session_id")
    symbols = data.get("symbols", [])

    if session_id not in sessions:
        return jsonify({"error": "Invalid session ID"}), 400

    try:
        chat = sessions[session_id]["chat"]
        prompt = f"Symbols selected: {', '.join(symbols)}"
        response = chat.send_message(prompt)
        return jsonify({"message": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Send emergency message including user info
@app.route('/send_emergency', methods=['POST'])
def send_emergency():
    data = request.get_json()
    session_id = data.get("session_id")
    symbols = data.get("symbols", [])

    if session_id not in sessions:
        return jsonify({"error": "Invalid session ID"}), 400

    try:
        session = sessions[session_id]
        chat = session["chat"]
        profile = session["profile"]

        emergency_prompt = (
            f"A non-verbal person named {profile['name']} is requesting emergency help. "
            f"They are located at {profile['address']}. "
            f"Their medical condition is: {profile['condition']}. "
            f"The person selected the following symbols to communicate their problem: {', '.join(symbols)}. "
            f"Craft an urgent and clear message that can be read or sent to emergency services, explaining their need for help."
        )

        response = chat.send_message(emergency_prompt)

        return jsonify({
            "emergency_message": response.text,
            "name": profile["name"],
            "address": profile["address"]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Optional: clear all sessions (dev tool)
@app.route('/clear_sessions', methods=['POST'])
def clear_sessions():
    sessions.clear()
    return jsonify({"message": "All sessions cleared."})
