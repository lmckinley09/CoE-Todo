# CoE-Todo

## What is the application?

A digital interpretation of the Productivity Method by Grace Beverley. This productivity app will allow the user to track jobs to do under the 3 main categories.

- Quick Ticks => 5 minutes or less
- Tasks => 5-30 minutes
- Projects => collection of tasks 

By breaking up tasks onto a visual board rather than a single list, which can be daunting, this reduces the pressure to follow tasks in order and can allow for grouping or potentially sharing boards among other users. The user can choose to select 3 non-negotiable tasks they aim to complete in the day.

## Why

The aim is to provide accountabilty to users, with a variation on task management they may be familiar in other applications. Organising work into categories and prioritising work can aid in reducing the stress of users.

## MVP

- User account creation/login
- Create Ticks/Tasks/Projects
- Track status of tasks
- Users can share/view other users boards
- Filter tasks by project
- Simple view with 3 ticks/tasks to complete (updates on completion of task)

## Stretch Goals

- Progress Bar
- Read/Write permissions for shared boards
- Mind Mapping (Mermaid js experimental)
- View completed (inactive) tasks

## Domain Model

```mermaid
erDiagram
 USER ||--o{ BOARD : ""
 BOARD ||--o{ TICKS : ""
 BOARD ||--o{ TASKS : ""
 BOARD ||--o{ PROJECTS : ""
 PROJECTS ||--o{ TASKS : ""
```

# Entity Relationship Diagram
```mermaid
erDiagram
 user ||--o{ user_board : ""
 board ||--o{ user_board : ""
 board ||--o{ tick : ""
 board ||--o{ task : ""
 board ||--o{ project : ""
 project ||--o{ task : ""

    user {
        serial id PK
        string email_address
        string first_name
        string last_name
        string password
        date date_of_birth
        timestamp created
        timestamp last_modified
    }
    
    board {
        serial id PK
        numeric owner FK
        timestamp created
        timestamp last_modified
    }
    
    user_board {
        numeric user FK
        numeric board FK
        boolean owner 
    }
    
    tick {
        serial id PK
        numeric board FK
        string title
        string description
        string status
        date completion_date
        timestamp created
        timestamp last_modified
    }
    
     task {
        serial id PK
        numeric board FK
        numeric project FK
        string title
        string description
        string status
        date completion_date
        timestamp created
        timestamp last_modified
    }
    
      project {
        serial id PK
        numeric board FK
        string title
        string description
        string status
        date completion_date
        timestamp created
        timestamp last_modified
    }

```
