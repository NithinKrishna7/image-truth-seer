
# Image Forgery Detection Flask Backend

This Flask backend serves your CNN + ELA model for image forgery detection.

## Setup

1. **Install dependencies:**
```bash
pip install -r requirements.txt
```

2. **Place your model:**
   - Copy your `model.keras` file to the `models/` directory
   - Update the `MODEL_PATH` in `app.py` if needed

3. **Run the server:**
```bash
python app.py
```

## API Endpoints

### POST /analyze-image
Analyzes an image for forgery detection.

**Request:**
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
}
```

**Response:**
```json
{
  "authenticity": 87.3,
  "isForged": false,
  "confidence": 94.2,
  "elaScore": 0.23,
  "elaImage": "data:image/png;base64,...",
  "analysisTime": 2.4,
  "probabilities": {
    "authentic": 0.8734,
    "tampered": 0.1266
  }
}
```

### GET /health
Health check endpoint.

### POST /test-model
Test endpoint to verify model loading.

## Model Details

- **Input Size:** 128x128x3 RGB images
- **Preprocessing:** ELA with quality=90, resize, normalize by /255.0
- **Output:** [prob_authentic, prob_tampered] with softmax
- **Architecture:** CNN with 3 conv layers + 2 dense layers
