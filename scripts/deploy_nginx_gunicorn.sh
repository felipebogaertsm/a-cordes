# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

#!/bin/bash -v

# Deactivating Nginx:
sudo systemctl stop nginx
sudo systemctl stop a_cordes_gunicorn.service

# Moving important files to the user folder
cd /home/felipe
source /home/felipe/env/bin/activate

# Git pulling
cd /home/felipe
sudo rm -rf /home/felipe/A-Cordes
git clone https://felipebogaertsm@github.com/felipebogaertsm/A-Cordes.git

sudo chown -R felipe:www-data /home/felipe/A-Cordes/

# Installing requirements:
pip3 install -r /home/felipe/A-Cordes/requirements.txt

# Collecting static files for Django:
cd /home/felipe/A-Cordes/a_cordes
python3 /home/felipe/A-Cordes/a_cordes/manage.py collectstatic --noinput
python3 /home/felipe/A-Cordes/a_cordes/manage.py migrate --noinput

cd /home/felipe

# Starting Nginx server and Gunicorn service
sudo systemctl start nginx
sudo systemctl start a_cordes_gunicorn.service

# Restarting and refreshing the server
sudo systemctl restart nginx
sudo systemctl restart a_cordes_gunicorn.service
