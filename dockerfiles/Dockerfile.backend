FROM ubuntu:21.10
LABEL maintainer="Felipe Bogaerts de Mattos"

ENV PYTHONUNBUFFERED 1
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get upgrade

RUN apt-get --assume-yes install python3.9 python3.9-dev python3-pip
RUN apt-get install build-essential
RUN apt-get install gcc
RUN apt-get -y install libpq-dev libgmp-dev libmpfr-dev libmpc-dev libgmp3-dev libmpfr-dev libssl-dev

RUN pip3 install psycopg2

RUN pip3 install --upgrade pip setuptools wheel
COPY ./requirements.txt /requirements.txt
RUN pip3 install -r /requirements.txt

RUN mkdir /app
COPY ./a_cordes /app
WORKDIR /app
COPY ./scripts /scripts

RUN chmod +x /scripts/*

RUN useradd user
RUN chown -R user:user /app
USER user

RUN python3 manage.py collectstatic --noinput
RUN python3 manage.py migrate --noinput

EXPOSE 8080

COPY ./scripts/entrypoint.sh /scripts
ENTRYPOINT ["sh", "/scripts/entrypoint.sh"]
