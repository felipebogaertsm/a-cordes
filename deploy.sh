# -*- coding: utf-8 -*-
# Copyright © Felipe Bogaerts de Mattos. All rights reserved.
# Contact me at felipe.bogaerts@engenharia.ufjf.br

# !/bin/bash

# Deactivating Nginx
sudo systemctl stop nginx

# Moving important files to the user folder
cd /home/felipe
sudo mv /home/felipe/A-Cordes/a_cordes_backend/static ~/

# Activating venv
source /home/felipe/env/bin/activate

# Deleting the project folder
sudo rm -rf /home/felipe/A-Cordes/

# Getting updated version from GitHub
git clone https://github.com/felipebogaertsm/A-Cordes.git

# Removing dev settings.py
sudo rm -rf /home/felipe/A-Cordes/a_cordes_backend/a_cordes_backend/settings.py
# Removing dev static files
sudo rm -rf /home/felipe/A-Cordes/a_cordes_backend/static

# Moving important files from user folder to their respective folders
sudo mv /home/felipe/A-Cordes/a_cordes_backend/a_cordes_backend/settings_prod.py /home/felipe/A-Cordes/a_cordes_backend/a_cordes_backend/settings.py
sudo mv /home/felipe/static /home/felipe/A-Cordes/a_cordes_backend/

# Changing ownership of the new project folder
sudo chown -R felipe:www-data ~/A-Cordes/

# Change working directory
cd ~/

# Starting Nginx server
sudo systemctl start nginx

# Restarting gunicorn.service
sudo systemctl restart a_cordes_gunicorn.service

# Restarting and refreshing the server
sudo systemctl restart nginx
