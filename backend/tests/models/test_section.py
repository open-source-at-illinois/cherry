from cherry.models.section import Section
from cherry.models.instructor import Instructor


def test_instantiate():
    test_section = Section(
        name="test",
        course_id=34,
        credits=3,
        online=True,
        geneds=[],
        crn=0,
        section_id="AD1",
        instructor=Instructor(name="not a person"),
    )
    assert dict(test_section)

    test_section_optional = Section(
        name="test",
        course_id=34,
        credits=3,
        online=True,
        geneds=[],
        crn=0,
        section_id="AD1",
        instructor=Instructor(name="not a person"),
        is_open=True,
        location="nowhere",
        time="never",
    )
    assert dict(test_section_optional)
