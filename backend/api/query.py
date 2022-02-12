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
            stmt = session.query(Course).where(Course.year == int(year)).where(Course.term == str(term)).order_by(Course.gpa.desc())
        else:
            gened_queries = [session.query(GenEd).where(GenEd.abbr == gened) for gened in geneds]
            # gened_filter = reduce(lambda x, y: x.union(y), gened_queries)
            # gened_filter = reduce(lambda x, y: x and y, gened_queries)
            gened_filter = reduce(lambda x, y: db._and(x, y), gened_queries)

            stmt = session.query(Course).select_entity_from(gened_filter).where(Course.year == int(year)).where(Course.term == str(term)).order_by(Course.gpa.desc())


        print(stmt)
        result = stmt.paginate(page, per_page, False)

        # debug
        for result in session.query(Course).where(Course.number == "BADM 590"):
            print(result)
            print(result.to_dict())
            print(result.sections)

    return (result.total, [x.to_dict() for x in result.items])
