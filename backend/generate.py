from enum import unique
import itertools
import ast
from matplotlib import collections
import pandas as pd
import tqdm
import os
from api.write import write_data
from api.utils import gpa_calculate
import api.explorer
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from api.app import db
from api.orm.database import *

def generate():
    # courses = pd.read_csv("data/datasets/gpa/uiuc-gpa-dataset.csv")

    # print("Fetching listings . . .")
    # listings = explorer.parse_explorer()
    # print("Listings done!")

    # if not os.path.isdir("build"):
    #     os.mkdir("build")

    # gpas = []
    # course_sizes = []
    # for _, row in courses.iterrows():
    #     raw_total, num_people, gpa = gpa_calculate(row)
    #     gpas.append(gpa)
    #     course_sizes.append(num_people)

    # courses["GPA"] = gpas
    # courses["size"] = course_sizes
    # courses = courses.sort_values("GPA", ascending=False)
    # courses["GPA"] = courses["GPA"].round(3)

    # courses["Course Number"] = courses["Subject"].apply(lambda x: str(x).rstrip()) + " " + courses["Number"].apply(lambda x: str(x).rstrip())

    # courses = listings.merge(courses, on=["YearTerm", "Course Number"], how="left")
    # courses.to_csv("courses.csv")

    courses = pd.read_csv("courses.csv")
    print(courses.columns)

    ## sqlite builder
    with db.session() as session:
        instructor_mapping = {}
        for instructor_name in tqdm.tqdm(set(courses["Primary Instructor"].dropna())):
            instructor = Instructor(name=instructor_name)
            instructor_mapping[instructor_name] = instructor
            session.add(instructor)
        session.commit()

        gened_mapping = {}
        # for gened_abbr in tqdm.tqdm(set(itertools.chain.from_iterable(courses["geneds"].dropna()))):
        for gened_abbr in tqdm.tqdm(set(itertools.chain.from_iterable(courses["geneds"].apply(lambda x: ast.literal_eval(x)).apply(lambda x: x if isinstance(x, list) else [x]).dropna()))):
            gened = GenEd(abbr=gened_abbr)
            gened_mapping[gened_abbr] = gened
            session.add(gened)
        session.commit()

        # Aggregating
        course_mapping = {}
        course_gened_mapping = {}
        seen_courses = set()
        courses["numbernameyearterm"] = courses["Course Number"].apply(lambda x: str(x).rstrip()) + courses["Course Name"].apply(lambda x: str(x).rstrip()) + courses["year"].apply(lambda x: str(x).rstrip()) + courses["term"].apply(lambda x: str(x).rstrip())
        unique_courses = courses.sort_values("YearTerm", ascending=False).drop_duplicates(subset=["CRN", "year", "term", "Course Name"]).dropna(subset=["Course Number", "GPA"])
        agg_funcs = {}
        for col in unique_courses.columns:
            if col != "GPA":
                agg_funcs[col] = "first"
            else:
                agg_funcs[col] = "mean"

        unique_courses = unique_courses.groupby("numbernameyearterm").agg(agg_funcs)
        for _, course_info in tqdm.tqdm(unique_courses.iterrows()):
            if course_info["Course Number"] not in course_gened_mapping:
                course_gened_mapping[course_info["Course Number"]] = set()
            course_gened_mapping[course_info["Course Number"]] |= {gened_mapping[x] for x in set(course_info["geneds"]) if x in gened_mapping}

            course = Course(
                number = course_info["Course Number"],
                geneds = [gened_mapping[x] for x in set(ast.literal_eval(str(course_info["geneds"]))) if x in gened_mapping], 
                gpa=course_info["GPA"],
                year=course_info["year"],
                term=course_info["term"],
                course_name=course_info["Course Name"]
            )
            course_mapping[course_info["Course Number"]] = course
            session.add(course)
        session.commit()

        # section_mapping = {}
        for _, section_info in tqdm.tqdm(courses.dropna(subset=["Course Number", "CRN", "GPA"])[["CRN", "year", "term", "GPA", "Course Number", "Primary Instructor"]].iterrows()):
            if instructor := instructor_mapping.get(course_info["Primary Instructor"]):
                section = Section(
                    crn=section_info["CRN"],
                    # year=section_info["year"],
                    # term=section_info["term"],
                    course=course_mapping[section_info["Course Number"]],
                    instructors=[instructor]
                )
            else:
                section = Section(
                    crn=section_info["CRN"],
                    # year=section_info["year"],
                    # term=section_info["term"],
                    course=course_mapping[section_info["Course Number"]]
                )
            # section_mapping[section_info["CRN"]] = section
            session.add(section)
        session.commit()


    ## Static builder
    # for year in tqdm.tqdm(set(courses["YearTerm"])):
    #     year_data = courses[courses["YearTerm"] == year]
    #     print(year, len(year_data))

    #     if not os.path.isdir(f"build/{year}"):
    #         os.mkdir(f"build/{year}")

    #     page_num = 0
    #     while page_num*100 < len(year_data):  # pagination
    #         page = year_data.iloc[[page_num*100 + x for x in range(100) if page_num*100 + x < len(year_data)]]
    #         write_data(page, year, f"build/{year}/{page_num}")
    #         page_num += 1


    #     write_data(year_data, year, f"build/{year}")

    #     if year == "2021-sp":  # most recent
    #         write_data(year_data, year, f"build")

if __name__  == "__main__":
    db.create_all()
    generate()
