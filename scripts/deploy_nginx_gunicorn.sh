# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

#!/bin/bash -v

# Deactivating Nginx:
sudo systemctl stop nginx
sudo systemctl stop a_cordes.service

# Moving important files to the user folder
cd /home/admin
source /home/admin/.venvs/a_cordes/bin/activate

# Git pulling
cd /home/admin/projects
sudo rm -rf /home/admin/projects/A-Cordes
git clone https://felipebogaertsm@github.com/felipebogaertsm/A-Cordes.git

sudo chown -R admin:www-data /home/admin/projects/A-Cordes/

# Installing requirements:
pip3 install -r /home/admin/projects/A-Cordes/requirements.txt

# Collecting static files for Django:
cd /home/admin/projects/A-Cordes/a_cordes
python3 /home/admin/projects/A-Cordes/a_cordes/manage.py collectstatic --noinput
python3 /home/admin/projects/A-Cordes/a_cordes/manage.py migrate --noinput

cd /home/admin

# Starting Nginx server and Gunicorn service
sudo systemctl start nginx
sudo systemctl start a_cordes.service

# Restarting and refreshing the server
sudo systemctl restart nginx
sudo systemctl restart a_cordes.service
