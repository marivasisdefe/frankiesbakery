import logging
import azure.functions as func
import requests
import os
import json
 
API_KEY = os.getenv("AZURE_FOUNDARY_KEY")
ENDPOINT_URL = "https://plmoros-1958-evlzk.westeurope.inference.ml.azure.com/score"
 
def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Procesando solicitud en /api/chat")
 
    try:
        # Recibir input desde frontend
        req_body = req.get_json()
        user_input = req_body.get("message", "")
 
        # Encabezados para Azure Foundry
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {API_KEY}"
        }
        payload = {"chat_input": user_input}
 
        # Llamada a Azure Foundry
        response = requests.post(ENDPOINT_URL, json=payload, headers=headers)
        response.raise_for_status()
        result = response.json()
 
        bot_response = result.get("chat_output", "Sin respuesta del modelo")
 
        return func.HttpResponse(
            json.dumps({"response": bot_response}),
            mimetype="application/json",
            status_code=200
        )
 
    except Exception as e:
        logging.error(f"Error en /api/chat: {e}")
        return func.HttpResponse(
            json.dumps({"response": f"Error: {str(e)}"}),
            mimetype="application/json",
            status_code=500
        )