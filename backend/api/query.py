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
        query = session.query(Course)
        if len(geneds) != 0:
            mapping = {}
            for item in session.query(GenEd):
                mapping[item.abbr] = item.id

            # gened_ids = reduce(lambda x, y: x.intersects(y), [session.query(GenEd).where(gened.abbr == gened) for gened in geneds])

            gened_queries = [
                session.query(Course).select_from(geneds_course_association_table).where(GenEd.id == mapping[gened]) 
                for gened in geneds
            ]
            if len(gened_queries) > 1:
                gened_filter = reduce(lambda x, y: x.intersection(y))
            else:
                gened_filter = gened_queries[0]

            query = query.select_from(gened_filter)
            # query = query.join(gened_filter, Course.id)

            print(gened_filter)
            print(query)

        result = query.where(Course.year == int(year)).where(Course.term == str(term)).order_by(Course.gpa.desc()).paginate(page, per_page, False)

    return (result.total, [x.to_dict() for x in result.items])
