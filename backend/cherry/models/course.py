from pydantic import BaseModel
from typing import List


class Course(BaseModel):
    """
    Course model

    Attributes:
        name (str): The name of the course. E.g. `Intro Asian American Studies`.
        course_id (str): The unique identifier for each course, E.g. `AAS 100`.
        credits (int): The number of credits given for taking the class. E.g. `3`
        online (bool): Is the course online or in-person?
        geneds (List[str]): A list of the geneds the class fulfills.
    """

    name: str
    course_id: str
    credits: int
    online: bool

    geneds: List[str]
