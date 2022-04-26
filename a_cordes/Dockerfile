FROM python:3.9
LABEL maintainer="Felipe Bogaerts de Mattos"

ENV PYTHONUNBUFFERED 1

RUN pip3 install --upgrade pip setuptools wheel
COPY ./requirements.txt /requirements.txt
RUN pip3 install -r /requirements.txt

WORKDIR /usr/app
COPY ./ ./

RUN chmod +x ./scripts/*

RUN useradd admin
RUN chown -R admin:admin /usr/app
USER admin

EXPOSE 8000

ENTRYPOINT ["sh", "./scripts/entrypoint.sh"]