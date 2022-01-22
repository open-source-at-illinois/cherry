import pandas as pd
from typing import Iterable, List
from bs4 import BeautifulSoup
import itertools
import re
import os
import tqdm
import multiprocessing

def get_course_number(soup):
    query = soup.body.find("div", class_="cis-title-wrapper").find("p", class_="cis-section-title")
    if query is None:
        return None
    return query.text

def get_course_name(soup):
    query = soup.body.find("p", class_="cis-section-course")
    if query is None:
        return None
    return query.text

def get_credit_hours(soup):
    # getting number of credits
    for elem in soup(text=re.compile(r'.hour.')):
        if "Credit:" in str(elem.parent):
            credits = elem
            credits = credits.lower()
            # handling cases of "3 OR 4 hours"
            credits = list(map(lambda s: s.strip(), credits.split("or")))
            credits = [i[0] for i in credits]
            # separating multiple possible hours with semicolon
            # second value usually for honors course
            credits = ';'.join(credits)
            return credits

def get_geneds(soup) -> List[str]:
    # getting gen eds satisfied
    geneds = None
    for elem in soup(text=re.compile(r'.General Education.')):
        geneds = [i.text for i in elem.parent.parent.find_all("p")]
    return geneds

def parse_entry(loc: str):
    with open(loc) as fin:
        try:
            soup = BeautifulSoup(fin, "html.parser")
        except:
            raise IOError(f"Unable to read file: " + loc)
    # each section of each course is a separate entry
    course_data = []
    if soup.body == None:
        return []
    course_num = get_course_number(soup)
    course_name = get_course_name(soup)
    credits = get_credit_hours(soup)        
    geneds = get_geneds(soup)
    
    # The only table on the page is the one with section info
    section_table = soup.find("table")
    labels = [i.text for i in section_table.find_all("th")]
    # if "Subject Code" in labels:
        # print(course_num)
    non_header_rows = section_table.find_all("tr")[1:]
    for row in non_header_rows:
        skip = False
        entry = {}
        section_info = row.find_all("td")
        for (counter, dat) in enumerate(section_info):
            if "Degree Notes:" in dat.text: # don't want row with "degree notes" (repetitive data about gen eds)
                skip = True
                continue
            entry[labels[counter]] = dat.text.strip().replace("\n", "")
        if skip: # if the current row is a "degree notes" column don't create an entry
            continue
        entry["Course Number"] = course_num
        entry["Course Name"] = course_name
        entry["Number of Credits"] = credits
        entry["GenEds Satisfied"] = geneds
        entry["loc"] = loc
        course_data.append(entry)
    return course_data

def xml_iter(data_dir: str = "data/courses/") -> Iterable[str]:
    course_data = []
    for (curr_dir, subdirs, filenames) in os.walk(data_dir):
        for f in filenames:
            path = os.path.join(curr_dir, f)
            if path.endswith("schedule.html") or path.count("/") != 9:
                continue
            if not path.endswith("html"):
                continue
            yield path

def parse_explorer(data_dir: str = "data/courses/") -> pd.DataFrame:
    # read/process html files
    with multiprocessing.Pool(multiprocessing.cpu_count()) as p:
        files = list(tqdm.tqdm(xml_iter(data_dir=data_dir)))
        rows = itertools.chain.from_iterable(p.map(parse_entry, files))

    course_df = pd.DataFrame(data=rows)

    course_df["year"] = course_df["loc"].apply(lambda x: x.split("/")[-4])
    course_df["term"] = course_df["loc"].apply(lambda x: x.split("/")[-3])
    course_df["dept"] = course_df["loc"].apply(lambda x: x.split("/")[-2])
    course_df["Course Number"] = course_df["dept"] + " " + course_df["loc"].apply(lambda x: x.split("/")[-1].split(".")[0])
    course_df["YearTerm"] = course_df["year"].astype(str) + "-" + course_df["term"].apply(lambda x: x[:2])

    return course_df
    