from cherry.models.user_preferences import UserPreferences

def test_user_preferences():
    prefs = UserPreferences(gpa=3.7, rmp=10, requirements=["us"])
    assert dict(prefs)

