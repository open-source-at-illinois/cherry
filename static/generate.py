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

    return (raw_total, num_people, raw_total / num_people)

def write_data(data: pd.DataFrame, year_term: str, loc: str):
    if not os.path.isdir(f"{loc}"):
        os.mkdir(f"{loc}")

    data.to_json(f"{loc}/index.json", orient="records")

    if not os.path.isdir(f"{loc}/summary"):
        os.mkdir(f"{loc}/summary/")

    with open(f"{loc}/summary/index.json", "w") as f:
        summary = {
            "numberOfCourses": len(data),
            "yearTerm": year_term,
            "unweightedCourseMeanGPA": data["GPA"].mean(),
            "unweightedCourseMedianGPA": data["GPA"].median(),
            "weightedCourseMeanGPA": data["GPA"].rmul(data["size"]).sum() / data["size"].sum()
        }
        json.dump(summary, f)


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

    for year in tqdm.tqdm(set(courses["YearTerm"])):
        year_data = courses[courses["YearTerm"] == year]
        print(year, len(year_data))

        if not os.path.isdir(f"build/{year}"):
            os.mkdir(f"build/{year}")

        page_num = 0
        while page_num*100 < len(year_data):
            page = year_data.iloc[[page_num*100 + x for x in range(100) if page_num*100 + x < len(year_data)]]
            write_data(page, year, f"build/{year}/{page_num}")
            page_num += 1


        write_data(year_data, year, f"build/{year}")

        if year == "2021-sp":  # most recent
            write_data(year_data, year, f"build")

if __name__  == "__main__":
    generate()
