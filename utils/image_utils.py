
import base64
import io
from PIL import Image
import tempfile
import os

def base64_to_image(base64_string):
    """
    Convert base64 string to PIL Image
    """
    try:
        # Remove data URL prefix if present
        if ',' in base64_string:
            base64_string = base64_string.split(',')[1]
            
        # Decode base64
        image_data = base64.b64decode(base64_string)
        
        # Convert to PIL Image
        image = Image.open(io.BytesIO(image_data))
        
        return image
        
    except Exception as e:
        print(f"Base64 conversion error: {e}")
        return None

def image_to_base64(image):
    """
    Convert PIL Image to base64 string
    """
    try:
        buffer = io.BytesIO()
        image.save(buffer, format='PNG')
        img_str = base64.b64encode(buffer.getvalue()).decode()
        return f"data:image/png;base64,{img_str}"
        
    except Exception as e:
        print(f"Image to base64 error: {e}")
        return None

def save_temp_image(image):
    """
    Save PIL Image to temporary file and return path
    """
    try:
        temp_file = tempfile.NamedTemporaryFile(suffix='.jpg', delete=False)
        image.save(temp_file.name, 'JPEG')
        return temp_file.name
        
    except Exception as e:
        print(f"Temp save error: {e}")
        return None
