import pandas as pd
import json
import tqdm
import os
import shutil

GPA_TABLE = {
    "A+": 4,
    "A": 4,
    "A-": 3.67,
    "B+": 3.33,
    "B": 3,
    "B-": 2.67,
    "C+": 2.33,
    "C": 2,
    "C-": 1.67,
    "D+": 1.33,
    "D": 1.0,
    "D-": 0.67,
    "F": 0
}

def gpa_calculate(row: dict) -> float:
    num_people = 0
    raw_total = 0
    for letter, value in GPA_TABLE.items():
        num_people += row[letter]
        raw_total += row[letter] * value

    return raw_total / num_people

def generate():
    courses = pd.read_csv("data/datasets/gpa/uiuc-gpa-dataset.csv")

    if not os.path.isdir("build"):
        os.mkdir("build")

    gpas = []
    for _, row in courses.iterrows():
        gpas.append(gpa_calculate(row))

    courses["GPA"] = gpas
    courses = courses.sort_values("GPA", ascending=False)
    courses["GPA"] = courses["GPA"].round(3)

    for year in tqdm.tqdm(set(courses["YearTerm"])):
        year_data = courses[courses["YearTerm"] == year]
        print(year, len(year_data))

        if not os.path.isdir(f"build/{year}"):
            os.mkdir(f"build/{year}")

        page_num = 0
        while page_num*100 < len(year_data):
            if not os.path.isdir(f"build/{year}/{page_num}"):
                os.mkdir(f"build/{year}/{page_num}")

            page = year_data.iloc[[page_num*100 + x for x in range(100) if page_num*100 + x < len(year_data)]]
            page.to_json(f"build/{year}/{page_num}/courses.json", orient="records")

            page_num += 1


        year_data.to_json(f"build/{year}/courses.json", orient="records")
    shutil.copy("build/2021-sp/courses.json", "build/courses.json")

if __name__  == "__main__":
    generate()
