# backend/extensions/cloudinary.py
# import cloudinary
# import os

def init_cloudinary(app):
    import cloudinary

    cloudinary.config(
        cloud_name=app.config.get("CLOUDINARY_CLOUD_NAME"),
        api_key=app.config.get("CLOUDINARY_API_KEY"),
        api_secret=app.config.get("CLOUDINARY_API_SECRET"),
        secure=True
    )