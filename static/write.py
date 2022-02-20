import pandas as pd
import os
import json

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

