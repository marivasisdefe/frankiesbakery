import logging
import azure.functions as func
import requests
import os
import json

# API Key y endpoint independientes para Chat2
API_KEY2 = os.getenv("AZURE_FOUNDARY_KEY2")
ENDPOINT_URL2 = "https://plmoros-1958-ceknm.westeurope.inference.ml.azure.com/score"

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Procesando solicitud en /api/chat2")
    try:
        # Recibir input desde frontend
        req_body = req.get_json()
        user_input = req_body.get("message", "")

        # Encabezados para Azure Foundry
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {API_KEY2}"
        }

        payload = {"chat_input": user_input}

        # Llamada a Azure Foundry (Chat2)
        response = requests.post(ENDPOINT_URL2, json=payload, headers=headers)
        response.raise_for_status()
        result = response.json()
        bot_response = result.get("chat_output", "Sin respuesta del modelo")

        return func.HttpResponse(
            json.dumps({"response": bot_response}),
            mimetype="application/json",
            status_code=200
        )

    except Exception as e:
        logging.error(f"Error en /api/chat2: {e}")
        return func.HttpResponse(
            json.dumps({"response": f"Error: {str(e)}"}),
            mimetype="application/json",
            status_code=500
        )
