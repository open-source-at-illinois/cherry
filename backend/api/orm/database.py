from ..app import db

geneds_course_association_table = db.Table('geneds_course_association', db.metadata,
    db.Column('gened_id', db.ForeignKey('geneds.id'), primary_key=True),
    db.Column('course_id', db.ForeignKey('courses.id'), primary_key=True)
)
instructors_sections_association_table = db.Table('instructors_section_association', db.metadata,
    db.Column('instructor_id', db.ForeignKey('instructors.id'), primary_key=True),
    db.Column('sections_id', db.ForeignKey('sections.id'), primary_key=True)
)

class GenEd(db.Model):
    __tablename__ = "geneds"
    id = db.Column(db.Integer, primary_key=True)
    abbr = db.Column(db.String)

    courses = db.relationship(
        "Course",
        secondary=geneds_course_association_table,
        back_populates="geneds"
    )

class Course(db.Model):
    __tablename__ = "courses"
    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.String)
    gpa = db.Column(db.Float)
    year = db.Column(db.Integer)
    term = db.Column(db.String)
    course_name = db.Column(db.String)

    geneds = db.relationship(
        "GenEd",
        secondary=geneds_course_association_table,
        back_populates="courses"
    )
    sections = db.relationship("Section", back_populates="course")

    def to_dict(self):
        return {
            "id": self.id,
            "number": self.number,
            "gpa": self.gpa,
            "year": self.year,
            "term": self.term,
            "course_name": self.course_name
        }

class Instructor(db.Model):
    __tablename__ = "instructors"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    sections = db.relationship(
        "Section",
        secondary=instructors_sections_association_table,
        back_populates="instructors"
    )

class Section(db.Model):
    __tablename__ = "sections"
    id = db.Column(db.Integer, primary_key=True)
    crn = db.Column(db.Integer)

    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))
    course = db.relationship("Course", back_populates="sections")
    instructors = db.relationship(
        "Instructor",
        secondary=instructors_sections_association_table,
        back_populates="sections"
    )

db.create_all()
