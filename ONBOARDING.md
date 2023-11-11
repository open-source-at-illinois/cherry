# Cherry Onboarding Guide

## Github
Cherry is a monorepo that lives on Github. This means that both frontend and backend codebases are located in the same repo (in the backend and web directories)
https://github.com/open-source-at-illinois/cherry.     
Send your github username and tag an exec member on discord to be added as a contributor!

## Discord
Discord is where all communication takes place. Cherry has some special channels that you can access by clicking on the reaction in [this](https://discord.com/channels/622246265693929482/674659638918119475/904041537997008896) announcement (or @mention an exec member!). If you haven’t already, Join our discord server [here](https://discord.gg/sKYtc9QhuP).

## Calendar
Club meetings will show up on the OSAI Calendar, which you can subscribe to using [this](https://bit.ly/3AOYya8) link.

## Jira
Jira is our project management tool, where different tasks and issues will be assigned to developers. To get access to the Jira project, DM your Illinois email to an exec member!

## Meetings
Cherry has 2 kinds of meetings:
- **Project Planning Meetings** which take place during the weekly club meetings (Wednesday 5PM at Siebel 1302)
  - In these meetings, the team makes decisions on the project. (How something should look/behave etc.)
- **Standup Meetings** which are short 10 minute meetings that take place at 9 PM every Tuesday, Thursday, and Sunday.
  - In standups, everyone in the team describes 3 things:
    1. Any progress/roadblocks since the last meeting
    2. What they are working on currently
    3. What is planned to be done before the next meeting
  - These meetings ensure that everyone on the team is on the same page, and any issues are quickly addressed

## Build Guide (Backend)

### Prerequisites

Before you begin, ensure you have Python installed on your system. This guide assumes you have basic familiarity with command line operations and your operating system's package manager.

### 1. Clone the Repository

First, clone the Cherry project repository to your local machine:

```bash
git clone https://github.com/open-source-at-illinois/cherry.git
cd cherry/backend
```

### 2. Create a Python Virtual Environment

Creating a virtual environment is a good practice to manage dependencies:

```bash
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

### 3. Install Requirements

Install the required Python packages:

```bash
pip install -r requirements.txt
```

### 4. Install SQLAlchemy

#### For Ubuntu/Debian

```bash
sudo apt-get update
sudo apt-get install python3-sqlalchemy
```

#### For Fedora/Red Hat

```bash
sudo dnf install python3-sqlalchemy
```

#### For macOS

```bash
brew install sqlalchemy
```

#### For Windows

Ensure you have a package manager like Chocolatey, then:

```bash
choco install sqlalchemy
```

### 5. Run the Application

With all dependencies in place, you can now run the application:
You may need to restart your terminal to finish installing sqlalchemy

```bash
flask --app app run
```

This command starts the Flask development server and makes the Cherry backend accessible locally.

### Conclusion

Your Cherry backend setup is now complete! For further configurations and usage instructions, refer to the project documentation or contact the Cherry development team.

## Contributing
Some guidelines to follow when writing code:
- Write readable, clean code that is easy to understand. Follow good practices like writing descriptive commit messages, variable names and documentation. Write code you can be proud of!
- Use branches!
  - When working on a feature, make a new branch for that feature using the command `git checkout -b <branch name>` (or switch to an existing branch without the -b)
  - Commit frequently!
  - Make a pull request to the develop branch when done, and add your scrum master as a reviewer for the PR. Also a good idea to @ them on discord so they don’t miss it!
- Make mistakes! At OSAI, we highly encourage failure.
  - When in doubt, **ask**! Your team’s scrum master and product owner are great resources when in doubt about the project – don’t hesitate to reach out!
