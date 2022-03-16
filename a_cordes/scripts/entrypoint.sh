# -*- coding: utf-8 -*-
# Licensed as the GNU General Public License as published by the Free Software
# Foundation, version 3.
# Author: Felipe Bogaerts de Mattos
# Contact me at felipe.bogaerts@engenharia.ufjf.br

#!/bin/bash

set -e

python3 manage.py migrate --noinput
python3 manage.py collectstatic --noinput

echo "STARTING GUNICORN SERVER..."
gunicorn a_cordes.wsgi:application --bind :8080
