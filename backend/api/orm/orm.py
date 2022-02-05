from pydantic import BaseModel
from typing import List

from db.database import Base
class GenEd(BaseModel):
    __tablename__ = "geneds"
    id: int
    abbr: str
    # courses: List[Course]

    class Config:
        orm_mode = True

class Course(Base):
    __tablename__ = "courses"
    id: int
    course_number: str
    geneds: List[GenEd]

    class Config:
        orm_mode = True

class Instructor(Base):
    __tablename__ = "instructors"
    id: int
    name: str

    class Config:
        orm_mode = True

class Section(Base):
    __tablename__ = "sections"
    id: int
    crn: int
    year: int
    term: str

    course_id: int
    course: Course
    instructors: List[Instructor]

    class Config:
        orm_mode = True
