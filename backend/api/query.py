import itertools
import ast
import pandas as pd
import tqdm
import os
from typing import List
from .write import write_data
from .utils import gpa_calculate
from .orm.database import *


def geneds_filter(db, year, term, geneds: List[str], page=0, per_page=100):
    if len(geneds) == 0:
        with db.session() as session:
            stmt = session.query(Course).where(Course.year == int(year)).where(Course.term == str(term)).order_by(Course.gpa.desc())
            results = stmt.paginate(page, per_page, False)
    else:
        for gened in geneds:
            with db.session() as session:
                stmt = session.query(Course).select_from(GenEd).where(GenEd.abbr == gened).where(Course.year == int(year)).where(Course.term == str(term)).order_by(Course.gpa.desc())
                results = stmt.paginate(page, per_page, False)

    def results_generator():
        for result in results.items:
            yield result.to_dict()

    return (results.total, results_generator())
