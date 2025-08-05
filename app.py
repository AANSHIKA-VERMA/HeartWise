# 1. Import necessary libraries
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS 
import joblib

# This initializes your backend application.
app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "The API server is running!"
# loads the trained model into memory when the server starts.
try:
    model = joblib.load('heart_disease_model.joblib')
except FileNotFoundError:
    print("Model file not found! Make sure 'heart_disease_model.joblib' is in the directory.")
    model = None

# This creates a URL route '/predict' that the frontend will send data to.
# 'methods=['POST']' specifies that this route only accepts data submissions.
@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded, cannot make predictions.'}), 500

    
    # The website will send the user's input as a JSON object.
    data = request.get_json(force=True)


    # match the order of columns your model was trained on..
    try:
        feature_list = [
            data['age'],
            data['sex'],
            data['cp'],
            data['trestbps'],
            data['chol'],
            data['fbs'],
            data['restecg'],
            data['thalach'],
            data['exang'],
            data['oldpeak'],
            data['slope'],
            data['ca'],
            data['thal']
        ]
    except KeyError as e:
        return jsonify({'error': f'Missing feature in request: {e.name}'}), 400


    # The model expects a 2D array as input, so we reshape our single prediction.
    final_features = np.array(feature_list).reshape(1, -1)

    # Use the loaded model to make a prediction
    prediction = model.predict(final_features)


    # converted the prediction (which is a NumPy array) to a standard integer.
    output = int(prediction[0])

    # The result is sent back as a JSON object. The frontend will read this.
    return jsonify({'prediction': output})

# Run the Flask app
# This block of code will only run when you execute 'python app.py' directly.
# It starts the development server.
if __name__ == '__main__':
    # 'port=5000' is the default, but it's good to be explicit.
    # 'debug=True' provides helpful error messages during development.
    app.run(port=5000, debug=True)
