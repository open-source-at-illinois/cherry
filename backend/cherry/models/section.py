from pydantic import BaseModel
from typing import Optional, List
from cherry.models.course import Course
from cherry.models.instructor import Instructor


class Section(Course):
    """
    Course sections model

    Attributes:
        crn (int): The course reference number of the section. E.g. `30107`.
        name (str): The name of the course. E.g. `Intro Asian American Studies`.
        section_id (str): The section identifier for each class. E.g. `AD1`.
        course_id (str): The unique identifier for each course, E.g. `AAS 100`.
        instructor (Instructor): The instructor of the class.
        credits (int): The number of credits given for taking the class. E.g. `3`
        online (bool): Is the course online or in-person?
        geneds (List[str]): A list of the geneds the class fulfills.

        time (Optional[str]): The meeting time. E.g. `09:00 AM - 09:50 AM`.
        is_open (Optional[bool]): The status of the course's registration.
        location (Optional[str]): The location of the class.
    """

    crn: int
    section_id: str
    instructor: Instructor

    time: Optional[str]
    is_open: Optional[bool]
    location: Optional[str]
