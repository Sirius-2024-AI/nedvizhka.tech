#
FROM python:3.12

#
WORKDIR /app

#
COPY . .

#
RUN pip install --upgrade -r /app/requirements.txt


#
CMD ["fastapi", "run", "main.py", "--port", "7777", "--host", "0.0.0.0"]