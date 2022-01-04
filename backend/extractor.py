import openpyxl
import unicodedata
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()
from words import models


def convert_data():
    data = openpyxl.load_workbook(
        "/Users/gimdongmin/Desktop/memorize_english/datas/TOEIC 토익 빈출 영어단어정리 327.xlsx"
    )
    ws = data.active
    words = ws["B"] + ws["E"]
    meaning = ws["C"] + ws["F"]
    title = ws.cell(row=1, column=1).value
    all_value = []
    for i in range(len(words)):
        if str(words[i].value) != "None" or str(meaning[i].value) != "None":
            all_value.append(
                (
                    unicodedata.normalize("NFKD", str(words[i].value)),
                    unicodedata.normalize("NFKD", str(meaning[i].value)),
                )
            )
    models.Word.objects.create(title=title, content=all_value)


convert_data()
