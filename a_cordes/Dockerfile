FROM python:3.9
LABEL maintainer="Felipe Bogaerts de Mattos"

ENV PYTHONUNBUFFERED 1

RUN pip3 install --upgrade pip setuptools wheel
COPY ./requirements.txt /requirements.txt
RUN pip3 install -r /requirements.txt

RUN mkdir /app
COPY . /app
WORKDIR /app
COPY ./scripts /scripts

RUN chmod +x /scripts/*

EXPOSE 8000

COPY ./scripts/entrypoint.sh /scripts
ENTRYPOINT ["sh", "/scripts/entrypoint.sh"]