# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

#!/bin/bash -v

# Services:
sudo systemctl start docker
sudo systemctl stop a_cordes.service

# Moving important files to the user folder
cd /home/admin
source /home/admin/.venvs/a_cordes/bin/activate

# Git pulling
cd /home/admin/projects
sudo rm -rf /home/admin/projects/A-Cordes
sudo git clone https://felipebogaertsm@github.com/felipebogaertsm/A-Cordes.git

# Setting environment variables:
set -a
source /home/admin/.envs/.a_cordes
set +a

sudo chown -R admin:www-data /home/admin/projects/A-Cordes/

cd /home/admin

# Starting Nginx server and Gunicorn service
sudo systemctl restart docker
sudo systemctl restart a_cordes.service
