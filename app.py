
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import os
import time
from utils.ela_processing import apply_ela, preprocess_for_model
from utils.image_utils import base64_to_image, image_to_base64, save_temp_image

app = Flask(__name__)
CORS(app)  # Enable CORS for your React frontend

# Load your trained model
MODEL_PATH = 'models/model.keras'  # Update this path to your model location
try:
    model = tf.keras.models.load_model(MODEL_PATH, compile=False)
    print("Model loaded successfully!")
    print(f"Model input shape: {model.input_shape}")
    print(f"Model output shape: {model.output_shape}")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'model_path': MODEL_PATH
    })

@app.route('/analyze-image', methods=['POST'])
def analyze_image():
    """
    Main endpoint for image analysis using your CNN + ELA model
    """
    start_time = time.time()
    
    try:
        # Get request data
        data = request.json
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
            
        # Check if model is loaded
        if model is None:
            return jsonify({'error': 'Model not loaded'}), 500
            
        # Convert base64 to PIL Image
        image = base64_to_image(data['image'])
        if image is None:
            return jsonify({'error': 'Invalid image data'}), 400
            
        # Save image temporarily
        temp_path = save_temp_image(image)
        if temp_path is None:
            return jsonify({'error': 'Failed to process image'}), 500
            
        try:
            # Apply ELA (exactly as in your training pipeline)
            ela_image = apply_ela(temp_path, quality=90)
            if ela_image is None:
                return jsonify({'error': 'ELA processing failed'}), 500
                
            # Preprocess for model (exactly as in your training pipeline)
            processed_image = preprocess_for_model(ela_image)
            if processed_image is None:
                return jsonify({'error': 'Image preprocessing failed'}), 500
                
            # Run model prediction
            prediction = model.predict(processed_image, verbose=0)[0]
            
            # Process results according to your model output format
            # prediction = [prob_authentic, prob_tampered]
            prob_authentic = float(prediction[0])
            prob_tampered = float(prediction[1])
            
            # Determine if image is forged (same logic as your inference code)
            is_forged = prob_tampered > prob_authentic
            
            # Calculate metrics
            authenticity_score = prob_authentic * 100
            confidence = max(prob_authentic, prob_tampered) * 100
            
            # Calculate analysis time
            analysis_time = round(time.time() - start_time, 2)
            
            # Convert ELA image to base64 for frontend display
            ela_base64 = image_to_base64(ela_image)
            
            # Calculate ELA score (normalized mean pixel intensity)
            ela_score = np.mean(np.array(ela_image)) / 255.0
            
            # Prepare response
            response = {
                'authenticity': round(authenticity_score, 1),
                'isForged': is_forged,
                'confidence': round(confidence, 1),
                'elaScore': round(ela_score, 3),
                'elaImage': ela_base64,
                'analysisTime': analysis_time,
                'probabilities': {
                    'authentic': round(prob_authentic, 4),
                    'tampered': round(prob_tampered, 4)
                },
                'modelInfo': {
                    'architecture': 'CNN + ELA',
                    'inputSize': '128x128',
                    'elaQuality': 90
                }
            }
            
            print(f"Analysis complete: {response['authenticity']:.1f}% authentic, {analysis_time}s")
            return jsonify(response)
            
        finally:
            # Clean up temporary file
            if os.path.exists(temp_path):
                os.unlink(temp_path)
                
    except Exception as e:
        print(f"Analysis error: {e}")
        return jsonify({'error': f'Analysis failed: {str(e)}'}), 500

@app.route('/test-model', methods=['POST'])
def test_model():
    """
    Test endpoint to verify model is working with a sample prediction
    """
    try:
        if model is None:
            return jsonify({'error': 'Model not loaded'}), 500
            
        # Create a dummy input to test the model
        dummy_input = np.random.random((1, 128, 128, 3))
        prediction = model.predict(dummy_input, verbose=0)
        
        return jsonify({
            'status': 'success',
            'prediction_shape': prediction.shape,
            'sample_prediction': prediction[0].tolist()
        })
        
    except Exception as e:
        return jsonify({'error': f'Model test failed: {str(e)}'}), 500

if __name__ == '__main__':
    print("Starting Flask server...")
    print(f"Model path: {MODEL_PATH}")
    app.run(debug=True, host='0.0.0.0', port=5000)
