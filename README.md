# The Productivity Method

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
 user_type ||--o{ user_board : ""
 board ||--o{ user_board : ""
 board ||--o{ job : ""
 job ||--|| tick : ""
 job ||--|| task : ""
 job ||--|| project : ""
 project ||--o{ task : ""

    user {
        serial id PK
        varchar email_address
        varchar first_name
        varchar last_name
        varchar password
        date date_of_birth
        timestamp created
        timestamp last_modified
    }
    
    user_board {
        integer user FK
        integer board FK
        integer type FK
    }
    
    user_type {
        serial id PK
        boolean read
        boolean write
        boolean owner
    }
    
    board {
        serial id PK
        string name
        timestamp created
        timestamp last_modified
    }
    
    job {
        serial id PK
        integer board FK
        varchar title
        varchar description
        varchar status
        date completion_date
        timestamp created
        timestamp last_modified
    }
    
    tick {
        serial id PK
        integer job FK
    }
    
     task {
        serial id PK
        integer job FK
        integer project FK
    }
    
     project {
        serial id PK
        integer job FK
    }

```
