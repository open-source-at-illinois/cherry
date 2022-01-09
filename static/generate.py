import pandas as pd
import tqdm
import os
import dataset
from write import write_data
from utils import gpa_calculate

def generate():
    courses = pd.read_csv("data/datasets/gpa/uiuc-gpa-dataset.csv")

    if not os.path.isdir("build"):
        os.mkdir("build")

    gpas = []
    course_sizes = []
    for _, row in courses.iterrows():
        raw_total, num_people, gpa = gpa_calculate(row)
        gpas.append(gpa)
        course_sizes.append(num_people)

    courses["GPA"] = gpas
    courses["size"] = course_sizes
    courses = courses.sort_values("GPA", ascending=False)
    courses["GPA"] = courses["GPA"].round(3)

    ## Static builder
    for year in tqdm.tqdm(set(courses["YearTerm"])):
        year_data = courses[courses["YearTerm"] == year]
        print(year, len(year_data))

        if not os.path.isdir(f"build/{year}"):
            os.mkdir(f"build/{year}")

        page_num = 0
        while page_num*100 < len(year_data):  # pagination
            page = year_data.iloc[[page_num*100 + x for x in range(100) if page_num*100 + x < len(year_data)]]
            write_data(page, year, f"build/{year}/{page_num}")
            page_num += 1


        write_data(year_data, year, f"build/{year}")

        if year == "2021-sp":  # most recent
            write_data(year_data, year, f"build")
    
    ## sqlite builder
    db = dataset.connect('sqlite:///build/cherry.db')
    courses_table = db["courses"]
    for _, row in tqdm.tqdm(courses.iterrows()):
        courses_table.insert({k.replace("-", "minus").replace("+", "plus"): v for k, v in row.items()})
    db.close()

if __name__  == "__main__":
    generate()
