FROM python:3.12.2

# Set the working directory in the container
WORKDIR /app

# Copy the contents of the DeploySpeechML directory into the container at /app
COPY DeploySpeechML/ .

# Install system dependencies (if needed)
# RUN apt-get update && apt-get install -y <package-name>

# Install dependencies
COPY DeploySpeechML/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

# Expose the port on which the Flask app runs
EXPOSE 5000

# Command to run the Flask application with Gunicorn
CMD exec gunicorn --bind :5000 --workers 1 --threads 8 --timeout 0 model:app
