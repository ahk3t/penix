#!/bin/bash
BASE_DIR=/home/ashket/projects/penix/server
source $BASE_DIR/.venv/bin/activate
exec gunicorn config.wsgi -c $BASE_DIR/etc/gunicorn.conf.py
