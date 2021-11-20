from pydantic import BaseModel, validator
from typing import List


class UserPreferences(BaseModel):
    """
    User preferences model

    Attributes:
    """

    gpa: int  # gpa
    rmp: int  # rate my professor
    requirements: List[str]  # requirements

    @validator("requirements")
    def validate_requirements(cls, reqs):
        assert len(reqs) > 0, "must contain at least 1 requirement"
        return reqs
