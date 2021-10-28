import pandas as pd
from bs4 import BeautifulSoup
import re
import os
import sys
from tqdm import tqdm

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

def get_geneds(soup):
    # getting gen eds satisfied
    geneds = None
    for elem in soup(text=re.compile(r'.General Education.')):
        geneds = [i.text for i in elem.parent.parent.find_all("p")]
        geneds = ';'.join(geneds)
    return geneds

def get_all_course_data(soup):
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
    if "Subject Code" in labels:
        print(course_num)
    non_header_rows = section_table.find_all("tr")[1:]
    for row in non_header_rows:
        skip = False
        entry = dict()
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
        course_data.append(entry)
    return course_data

if __name__ == "__main__":
    # user input for data directory
    # root_dir = input("Root Input Directory: ")
    # if root_dir == "": # default input data directory
    #     root_dir = "./course_data"
    # if not os.path.isdir(root_dir):
    #     print(f"Input directory \'{root_dir}\' does not exist")
    #     sys.exit(1)
    
    # Files paths in root_dir must have format root_dir/term/subject/course
    root_dir = "./course_data"
        
    # user input for output file name
    output_path = input("Enter Output Filepath: ")
    if output_path == "": 
        output_path = "./all_course_data.csv"
    if os.path.exists(output_path): # check for overwriting existing file
        confirmation = input("Overwriting existing file. OK? (Y/N) ")
        if confirmation.lower() == "n":
            sys.exit(0)
    
    # read/process html files
    course_data = []
    for (curr_dir, subdirs, filenames) in tqdm(list(os.walk(root_dir)), desc="Working..."):
        for f in filenames:
            path = os.path.join(curr_dir, f)
            if not path.endswith("html"):
                continue
            if path.count('/') + path.count('\\') < 4:
                continue
            with open(path) as fin:
                try:
                    soup = BeautifulSoup(fin, "html.parser")
                    course_data.extend(get_all_course_data(soup))
                except:
                    print(f"Unable to read file: " + path)
    # convert data to dataframe and then to csv
    course_df = pd.DataFrame(data=course_data)
    course_df.to_csv("./all_course_data.csv", encoding='utf-8', index=False)
    