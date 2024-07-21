#
FROM python:3.12

#
WORKDIR /app

#
COPY . .
COPY fullchain.pem /ssl/fullchain.pem
COPY privkey.pem /ssl/privkey.pem
#
RUN pip install --upgrade -r /app/requirements.txt


#
CMD ["uvicorn", "main:app", "--port", "8000", "--host", "0.0.0.0", "--ssl-certfile", "/ssl/fullchain.pem ", "--ssl-keyfile", "/ssl/privkey.pem"]