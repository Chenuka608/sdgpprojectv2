FROM python:3.12.2

# Set the working directory in the container
WORKDIR /app

# Copy the contents of the DeploySpeechML directory into the container at /app
COPY DeploySpeechML/ .

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3-dev \
    build-essential \
    gfortran \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY DeploySpeechML/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port on which the Flask app runs
EXPOSE 5000

# Command to run the Flask application
CMD ["python", "model.py"]
