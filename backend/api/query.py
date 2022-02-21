import itertools
from functools import reduce
import ast
import pandas as pd
import tqdm
import os
from typing import List
from .write import write_data
from .utils import gpa_calculate
from .orm.database import *


def geneds_filter(db, year, term, geneds: List[str], page=0, per_page=100):
    with db.session() as session:
        if len(geneds) == 0:
            query = session.query(Course).where(Course.year == int(year)).where(Course.term == str(term)).order_by(Course.gpa.desc())
        else:
            filter_query = session.query(
                geneds_course_association_table
            ).join(
                Course,
                Course.id == geneds_course_association_table.c.course_id
            ).join(
                GenEd,
                GenEd.id == geneds_course_association_table.c.gened_id
            ).where(Course.year == int(year)
            ).where(Course.term == str(term))

            mapping = {}
            for item in session.query(GenEd):
                mapping[item.abbr] = item.id

            for gened in geneds:
                filter_query = filter_query.where(GenEd.id == mapping[gened])
            
            print(filter_query)
            query = session.query(Course).select_from(filter_query.order_by(Course.gpa.desc()))

            print(query)

        result = query.paginate(page, per_page, False)

    return (result.total, [x.to_dict() for x in result.items])
