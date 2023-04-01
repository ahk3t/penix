import os
import sys
import django
import pathlib
import pandas as pd
import sqlalchemy
import json
from sqlalchemy import create_engine, URL

sys.path[0] = str(pathlib.Path(sys.path[0]).parent)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()
from base.models.products import TurnoverMember

metadata = json.load(open("./metadata.json"))
dbcfg = metadata["database-default"]
engine = create_engine(
    URL.create(
        "postgresql+psycopg2",
        username=dbcfg["USER"],
        password=dbcfg["PASSWORD"],
        host=dbcfg["HOST"],
        database=dbcfg["NAME"],
        port=dbcfg["PORT"],
    )
)


CHUNKSIZE=1000000
DATASETS = {
    "turnovermember": "Справочник участников оборота товаров.csv",
    "product": "Справочник продукции.csv",
    "salepoint": "Справочник торговых точек.csv",
    # "productintro": "Данные о вводе товаров в оборот с 2021-11-22 по 2022-11-21.csv",
    # "productmovement": "Данные о перемещениях товаров между участниками с 2021-11-22 по 2022-11-21.csv",
    # "productwithdrawal": "Данные о выводе товаров из оборота с 2021-11-22 по 2022-11-21.csv",
}


def fill_table(table, csv_path):
    reader = pd.read_csv(csv_path, chunksize=CHUNKSIZE)
    for df in reader:
        df.rename(columns={"id_sp_": "id_sp"}, inplace=True)
        df.to_sql(table, engine, if_exists="append", index=False, chunksize=CHUNKSIZE)


def test_run():
    print(TurnoverMember.objects.all()[:10])


for table_name, csv_name in DATASETS.items():
    fill_table("base_" + table_name, "./.data/" + csv_name)

# test_run()
