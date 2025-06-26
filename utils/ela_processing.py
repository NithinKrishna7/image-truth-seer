
from PIL import Image, ImageChops, ImageEnhance
import numpy as np
import os
import tempfile

def apply_ela(image_path, quality=90):
    """
    Apply Error Level Analysis exactly as in your training code
    """
    try:
        # Open original image and convert to RGB
        original = Image.open(image_path).convert('RGB')
        
        # Create temporary file for re-saved image
        with tempfile.NamedTemporaryFile(suffix='.jpg', delete=False) as temp_file:
            temp_path = temp_file.name
            
        # Save image with specified quality (90 to match your training)
        original.save(temp_path, 'JPEG', quality=quality, optimize=True)
        
        # Open re-saved image
        resaved = Image.open(temp_path)
        
        # Calculate difference (exactly as in your img_difference function)
        diff = ImageChops.difference(original, resaved)
        
        # Get extrema values
        extrema = diff.getextrema()
        max_diff = max([ex[1] for ex in extrema])
        
        # Prevent division by zero
        if max_diff == 0:
            max_diff = 1
            
        # Scale the difference
        scale = 255.0 / max_diff
        diff = ImageEnhance.Brightness(diff).enhance(scale)
        
        # Apply sharpness enhancement (as in your code)
        enhancer = ImageEnhance.Sharpness(diff)
        diff = enhancer.enhance(1.5)
        
        # Clean up temporary file
        os.unlink(temp_path)
        
        return diff
        
    except Exception as e:
        print(f"ELA processing error: {e}")
        return None

def preprocess_for_model(ela_image):
    """
    Preprocess ELA image exactly as in your training pipeline
    """
    try:
        # Resize to 128x128 (as in your training)
        ela_resized = ela_image.resize((128, 128))
        
        # Convert to numpy array and flatten, then normalize
        img_array = np.array(ela_resized).flatten() / 255.0
        
        # Reshape to model input format (batch_size, 128, 128, 3)
        img_array = img_array.reshape(-1, 128, 128, 3)
        
        return img_array
        
    except Exception as e:
        print(f"Preprocessing error: {e}")
        return None
