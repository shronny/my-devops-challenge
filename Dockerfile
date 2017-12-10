FROM python:3-onbuild
COPY src/ /usr/src/app
CMD ["python", "app.py"]