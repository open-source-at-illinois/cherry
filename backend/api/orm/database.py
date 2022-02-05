from ..app import db
from sqlalchemy import Float, create_engine
from sqlalchemy.orm import Session, relationship, sessionmaker, declarative_base
from sqlalchemy import Column, ForeignKey, Integer, String, create_engine
from sqlalchemy import Table
from pydantic import BaseModel

Base = db.declarative_base()

geneds_course_association_table = Table('geneds_course_association', Base.metadata,
    Column('gened_id', ForeignKey('geneds.id'), primary_key=True),
    Column('course_id', ForeignKey('courses.id'), primary_key=True)
)
instructors_sections_association_table = Table('instructors_section_association', Base.metadata,
    Column('instructor_id', ForeignKey('instructors.id'), primary_key=True),
    Column('sections_id', ForeignKey('sections.id'), primary_key=True)
)

class GenEd(Base):
    __tablename__ = "geneds"
    id = Column(Integer, primary_key=True)
    abbr = Column(String)

    courses = relationship(
        "Course",
        secondary=geneds_course_association_table,
        back_populates="geneds"
    )

class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True)
    number = Column(String)
    gpa = Column(Float)
    year = Column(Integer)
    term = Column(String)

    geneds = relationship(
        "GenEd",
        secondary=geneds_course_association_table,
        back_populates="courses"
    )
    sections = relationship("Section", back_populates="course")

    def to_dict(self):
        return {
            "id": self.id,
            "number": self.number,
            "gpa": self.gpa,
            "year": self.year,
            "term": self.term
        }

class Instructor(Base):
    __tablename__ = "instructors"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    sections = relationship(
        "Section",
        secondary=instructors_sections_association_table,
        back_populates="instructors"
    )

class Section(Base):
    __tablename__ = "sections"
    id = Column(Integer, primary_key=True)
    crn = Column(Integer)

    course_id = Column(Integer, ForeignKey('courses.id'))
    course = relationship("Course", back_populates="sections")
    instructors = relationship(
        "Instructor",
        secondary=instructors_sections_association_table,
        back_populates="sections"
    )


# class Database():
#     def __init__(self, loc: "sqlite+pysqlite:///build/cherry.db"):
#         self.engine = create_engine(loc, echo=True, future=True)

#     def insert

# Base.metadata.create_all(engine)
