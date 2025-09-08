from flask import Flask, request, jsonify, render_template
import requests
import os

app = Flask(__name__)

# API Key segura desde variable de entorno
API_KEY = os.getenv("AZURE_FOUNDARY_KEY")
ENDPOINT_URL = "https://plmoros-1958-evlzk.westeurope.inference.ml.azure.com/score"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_input = data.get("message", "")
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    payload = {"chat_input": user_input}
    try:
        response = requests.post(ENDPOINT_URL, json=payload, headers=headers)
        response.raise_for_status()
        result = response.json()
        bot_response = result.get("chat_output", "Sin respuesta del modelo")
    except Exception as e:
        bot_response = f"Error: {e}"
    return jsonify({"response": bot_response})

# Endpoint de prueba para verificar la variable de entorno
@app.route("/api/test-env")
def test_env():
    return jsonify({"AZURE_FOUNDARY_KEY": os.environ.get("AZURE_FOUNDARY_KEY")})
#  eliminar este endpoint

if __name__ == "__main__":
    app.run(debug=True)
