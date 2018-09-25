# lms-app
Learning Managemnent System Application

## Purpose
This application is designed for **Budapest University of Technology and Economics**. The main goal of this application to automate administrative, repetitive and some unique tasks for tutors and students during semesters, like
- file upload for students,
- review/rate for tutors,
- thesis topic management (publish, apply, classify),
- student progress management.

## Architecture
- Framework: [Meteor](https://meteor.com)
- DB: MongoDB
- Frontend: React
- UI: Semantic UI (React variant)

## Features
There are four user types with different (in some cases kind of overlapping) use-cases:

- Student
- Tutor (kind of admin too)
- Contact (from third-party companies)
- Consultant (from third-party companies)

Every user has to log in. Login works via local or Google account. In both cases, the application only allows login with email addresses, which have added before by an admin. The reason behind this is, the application is not for public usage.

The following subchapters briefly walk through the use-cases of every user type.

### Student use-cases
- Upload files (like home project, thesis documentation)
- Apply to published thesis topics
- Track progress

### Tutor use-cases
- Manage every kind of entity in the application DB (insert, edit, delete).
- Review student files.
- Rate students.
- Create student-thesis topic classification.
- Manage student progress.

### Contact use-cases
- Manage (insert, edit, delete) thesis topics for a specific third-party company.

### Consultant use-cases
- Review/rate thesis documentation and overall work.
