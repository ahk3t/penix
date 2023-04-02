import os
import sys
import django
import pathlib
import pandas as pd
import json
from sqlalchemy import create_engine, URL


sys.path[0] = str(pathlib.Path(sys.path[0]).parent)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

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


def _prepare_products(df):
    df["volume"] = pd.to_numeric(
        df["volume"]
        .str.replace(",", ".")
        .str.replace(r"[^0-9\.]+", "", regex=True)
        .str.strip("."),
        downcast="float",
        errors="coerce",
    )
    return df


member_inns = pd.read_csv("./.data/TurnoverMember.csv", usecols=["inn"])["inn"]
def _check_member_inn(*columns):
    def wrapper(df):
        for col in columns:
            df = df[df[col].isin(member_inns)]
        return df
    return wrapper


point_df = pd.read_csv("./.data/SalePoint.csv", usecols=["id_sp_", "inn"])
point_ids = _check_member_inn("inn")(point_df)["id_sp_"]
def _check_point_id(df):
    return df[df["id_sp"].isin(point_ids)]


CHUNKSIZE = 1000000
DATASETS = (
    ("turnovermember", "TurnoverMember.csv"),
    # ("product", "Product.csv", _prepare_products),
    ("salepoint", "SalePoint.csv", _check_member_inn("inn")),
    # ("productintro", "ProductIntro.csv", _check_member_inn("inn")),
    # ("productmovement", "ProductMovement.csv", _check_member_inn("sender_inn", "receiver_inn")),
    # ("productwithdrawal", f"ProductWithdrawal6.csv", _check_point_id)
    # *tuple(("productwithdrawal", f"ProductWithdrawal{i}.csv") for i in range(1, 7)),
)


def fill_table(table, csv_path, transform=None):
    reader = pd.read_csv(csv_path, chunksize=CHUNKSIZE)
    for df in reader:
        df.rename(columns={"id_sp_": "id_sp"}, inplace=True)
        if transform:
            df = transform(df)
        df.to_sql(
            table,
            engine,
            if_exists="append",
            index=False,
            chunksize=CHUNKSIZE,
        )


if __name__ == "__main__":
    for table_name, csv_name, *args in DATASETS:
        transformer = args[0] if len(args) > 0 else None
        fill_table("base_" + table_name, "./.data/" + csv_name, transformer)
