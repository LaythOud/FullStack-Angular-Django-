FROM python:3.9

WORKDIR /app

COPY ./opaala/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY ./opaala /app

EXPOSE 8000

Run python manage.py migrate
RUN python manage.py loaddata books

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]