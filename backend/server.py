# backend/server.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Add the current directory to the path so we can import the Python files
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import your Python files
from rag_n_roll import RagNRoll
from copy_of_snowflake_4 import SnowflakeModel  # Adjust import name if needed

app = Flask(__name__)
CORS(app)

# Initialize your AI models
rag_model = RagNRoll()
snowflake_model = SnowflakeModel()

@app.route('/api/repair/search', methods=['POST'])
def search_repair_guides():
    data = request.json
    query = data.get('query', '')
    
    # Use your RAG model to search for repair guides
    results = rag_model.search(query)
    
    return jsonify(results)

@app.route('/api/repair/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '')
    history = data.get('history', [])
    
    # Use your Snowflake model to generate a response
    response = snowflake_model.generate_response(message, history)
    
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
