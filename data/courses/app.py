import requests
import pandas as pd
import os

url = "https://www.ratemyprofessors.com/graphql"
headers = {"Authorization": "Basic dGVzdDp0ZXN0"}

# Get the total number of teachers at U of I
payload = {
  "query": """query TeacherSearchPaginationQuery(
    $query: TeacherSearchQuery!
  ) {
  search: newSearch {
      ...TeacherSearchPagination_search_1jWD3d
    }
  }
  fragment TeacherSearchPagination_search_1jWD3d on newSearch {
  teachers(query: $query) {
      resultCount
    }
  }
  """
  ,
  "variables": {
      "query": {
          "text": "",
          "schoolID": "U2Nob29sLTExMTI="
      }
  }
}

total_res = requests.post(url, json=payload, headers=headers)
teacher_count = total_res.json()['data']['search']['teachers']['resultCount']

print(f'There are {teacher_count} teachers at U of I. Getting info on these teachers...')

# Get data on all teachers
payload = {
  "query": """query TeacherSearchPaginationQuery(
    $count: Int!
    $query: TeacherSearchQuery!
  ) {
    search: newSearch {
      ...TeacherSearchPagination_search_1jWD3d
    }
  }
  fragment TeacherSearchPagination_search_1jWD3d on newSearch {
    teachers(query: $query, first: $count) {
      edges {
        node {
          ...TeacherCard_teacher
          __typename
        }
      }
      resultCount
    }
  }
  fragment TeacherCard_teacher on Teacher {
    avgRating
    numRatings
    ...CardFeedback_teacher
    ...CardName_teacher
  }
  fragment CardFeedback_teacher on Teacher {
    wouldTakeAgainPercent
    avgDifficulty
  }
  fragment CardName_teacher on Teacher {
    firstName
    lastName
  }"""
  ,
  "variables": {
    "count": teacher_count,
    "query": {
      "text": "",
      "schoolID": "U2Nob29sLTExMTI="
    }
  }
}

print('Processing data...')

data_res = requests.post(url, json=payload, headers=headers)
data_list = data_res.json()['data']['search']['teachers']['edges']

data_formatted = []
for entry in data_list:
  data_formatted.append(entry['node'])

if not os.path.isdir('./ratemyprofessor'):
    os.mkdir('./ratemyprofessor')

pd.DataFrame(data_formatted).to_csv('./ratemyprofessor/data.csv')

print('The data has been saved to data.csv!')