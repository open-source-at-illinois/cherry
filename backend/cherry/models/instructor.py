from pydantic import BaseModel
from typing import Optional, List


class Instructor(BaseModel):
    """
    Course sections model. Currently just a light wrapper around a str.

    Attributes:
        name (str): The name of the instructor.
    """

    name: str

    # departments: List[str]

    # courses_taught: List[int]

    # would_take_again: Optional[int]
    # rate_my_prof: Optional[int]
    # reviews: Optional[int]
