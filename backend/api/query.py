import itertools
from functools import reduce
import ast
from unittest import result
import pandas as pd
import tqdm
import os
from typing import List
from .write import write_data
from .utils import gpa_calculate
from .orm.database import *


def geneds_filter(db, year, term, geneds: List[str], page=0, per_page=100):
    course_id_list = []
    with db.session() as session:
        query = session.query(Course)
        if len(geneds) != 0:
            mapping = {}
            for item in session.query(GenEd):
                mapping[item.abbr] = item.id
            # gened_ids = reduce(lambda x, y: x.intersects(y), [session.query(GenEd).where(gened.abbr == gened) for gened in geneds])

            # gened_queries = [
            #     session.query(Course).select_from(geneds_course_association_table).where(GenEd.id == mapping[gened]) 
            #     for gened in geneds
            # ]
            # if len(gened_queries) > 1:
            #     gened_filter = reduce(lambda x, y: x.intersection(y))
            # else:
            #     gened_filter = gened_queries[0]

            # query = query.select_from(gened_filter)
            # # query = query.join(gened_filter, Course.id)

            # print(gened_filter)

            for i in range(len(geneds)):
                
                gened_query = session.query(geneds_course_association_table.columns.course_id).select_from(geneds_course_association_table).where(geneds_course_association_table.columns.gened_id == mapping[geneds[i]])
                if i == 0:
                    course_id_list = [x[0] for x in gened_query.all()]
                else:
                    old_course_id_list = course_id_list
                    new_course_id_list = [x[0] for x in gened_query.all()]
                    course_id_list = [value for value in old_course_id_list if value in new_course_id_list]

        
        
        
        # result = query.where(Course.year == int(year)).where(Course.term == str(term)).order_by(Course.gpa.desc()).paginate(page, per_page, False)
        query = query.where(Course.year == int(year)).where(Course.term == str(term)).order_by(Course.gpa.desc())
        result = session.query(Course).where(Course.year == int(year)).where(Course.term == str(term)).filter(Course.id.in_(course_id_list)).order_by(Course.gpa.desc()).paginate(page, per_page, False)
        # 
        
        # result = session.query(Course)


    return (result.total, [x.to_dict() for x in result.items])
