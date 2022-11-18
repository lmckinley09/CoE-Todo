# CoE-Todo

## What is the application?

A digital interpretation of the Productivity Method by Grace Beverley. This productivity app will allow the user to track jobs to do under the 3 main categories.

- Quick Ticks => 5 minutes or less
- Tasks => 5-30 minutes
- Projects => collection of tasks 

By breaking up tasks onto a visual board rather than a single list, which can be daunting, this reduces the pressure to follow tasks in order and can allow for grouping or potentially sharing boards among other users. The user can choose to select 3 non-negotiable tasks they aim to complete in the day.

## Why

The aim is to provide accountabilty to users, with a variation on task management they may be familiar in other applications. Organising work into categories and prioritising work can aid in reducing the stress of users.

## Domain Model

```mermaid
erDiagram
 USERS ||--o{ BOARDS : owns
 USERS ||--o{ SHARED_BOARDS : views
 BOARDS ||--o{ SHARED_BOARDS : exists
 BOARDS ||--o{ TICKS : contains
 BOARDS ||--o{ TASKS : contains
 BOARDS ||--o{ PROJECTS : contains
```
