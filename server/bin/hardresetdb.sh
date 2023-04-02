#!/bin/bash

BASE_DIR=$(dirname $(dirname "$(readlink -f "$0")"))

function check_bin() {
    local bin=$1
    if ! command -v $bin &> /dev/null; then
        echo "\"$bin\" command could not be found"
        exit
    fi
}

function reset_db() {
    psql -d znak -f $BASE_DIR/bin/resetdb.sql
    rm -rf $BASE_DIR/base/migrations
    python $BASE_DIR/manage.py makemigrations base
    python $BASE_DIR/manage.py migrate
    python $BASE_DIR/bin/initdb.py
}

check_bin psql
check_bin python
reset_db
