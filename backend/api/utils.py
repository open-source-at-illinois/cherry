from typing import Optional

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

GENEDS_TABLE = {
    'Advanced Composition': "AC",
    'Composition I': "C",
    'Cultural Studies - Non-West': "NWC",
    'Cultural Studies - US Minority': "USMC",
    'Cultural Studies - Western': "WCC",
    'Humanities – Hist & Phil': "HA",
    'Humanities – Lit & Arts': "HA",
    'Nat Sci & Tech - Life Sciences': "NST",
    'Nat Sci & Tech - Phys Sciences': "NST",
    'Quantitative Reasoning I': "QRA",
    'Quantitative Reasoning II': "QRB",
    'Social & Beh Sci - Beh Sci': "SBS",
    'Social & Beh Sci - Soc Sci': "SBS",
}

def gpa_calculate(row: dict) -> float:
    num_people = 0
    raw_total = 0
    for letter, value in GPA_TABLE.items():
        num_people += row[letter]
        raw_total += row[letter] * value

    return (raw_total, num_people, raw_total / num_people)

def geneds_parse(gened_string: str) -> Optional[str]:
    return GENEDS_TABLE.get(gened_string.rstrip())
