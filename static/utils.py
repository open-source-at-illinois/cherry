GPA_TABLE = {
    "A+": 4,
    "A": 4,
    "A-": 3.67,
    "B+": 3.33,
    "B": 3,
    "B-": 2.67,
    "C+": 2.33,
    "C": 2,
    "C-": 1.67,
    "D+": 1.33,
    "D": 1.0,
    "D-": 0.67,
    "F": 0
}

def gpa_calculate(row: dict) -> float:
    num_people = 0
    raw_total = 0
    for letter, value in GPA_TABLE.items():
        num_people += row[letter]
        raw_total += row[letter] * value

    return (raw_total, num_people, raw_total / num_people)