# -*- coding: utf-8 -*-
# Copyright © Felipe Bogaerts de Mattos. All rights reserved.
# Contact me at felipe.bogaerts@engenharia.ufjf.br

# !/bin/bash

# Deactivating Nginx:
sudo systemctl stop nginx

# Moving important files to the user folder
cd ~/
source /home/felipe/env/bin/activate


# Deleting the project folder
sudo rm -rf ~/A-Cordes/

# Getting updated version from GitHub
git clone https://github.com/felipebogaertsm/A-Cordes.git

# Removing dev settings.py
sudo rm -rf ~/A-Cordes/a_cordes_backend/a_cordes_backend/settings.py

# Moving important files from user folder to their respective folders
sudo mv ~/A-Cordes/a_cordes_backend/a_cordes_backend/settings_prod.py ~/A-Cordes/a_cordes_backend/a_cordes_backend/settings.py

sudo chown -R felipe:www-data ~/A-Cordes/

cd ~

# Starting Nginx server
sudo systemctl start nginx

# Restarting gunicorn.service
sudo systemctl restart a_cordes_gunicorn.service

# Restarting and refreshing the server
sudo systemctl restart nginx
