sudo docker build -t felipebogaertsm/a_cordes_backend:latest a_cordes/
sudo docker push felipebogaertsm/a_cordes_backend:latest

sudo docker build -t felipebogaertsm/a_cordes_frontend:latest frontend/
sudo docker push felipebogaertsm/a_cordes_frontend:latest
