# Use Python 3.12.2 (consider a more recent version for security)
FROM python:3.12.2

# Create a working directory for the application
WORKDIR /app

# Copy requirements.txt and application files
COPY requirements.txt .
COPY DeploySpeechML/* .  # Assuming your model.py is in DeploySpeechML

# Install dependencies using pip
RUN pip install -r requirements.txt

# Set the FLASK_APP environment variable (recommended)
ENV FLASK_APP=model.py

# Expose the port where the Flask app runs (default is 5000)
EXPOSE 5000

# Set the command to execute when running the container
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]