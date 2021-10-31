from cherry.models.course import Course


def test_instantiate():
    test_course = Course(name="test", course_id=34, credits=3, online=True, geneds=[])
    assert dict(test_course)
