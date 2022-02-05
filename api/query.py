import itertools
import ast
import pandas as pd
import tqdm
import os
import dataset
from write import write_data
from utils import gpa_calculate
import explorer
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from db import *

def geneds_filter(geneds):