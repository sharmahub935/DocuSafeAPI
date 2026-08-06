# Database Design - GymTrackerAPI

## Database Technology
MySQL

## Reason for Choosing MySQL
MySQL is reliable, easy to use, supports relationships between tables, and integrates well with TypeScript and Express.

## Users Table

| Field | Data Type | Description |
|---------|---------|---------|
| user_id | INT | Primary Key |
| first_name | VARCHAR(50) | User First Name |
| last_name | VARCHAR(50) | User Last Name |
| email | VARCHAR(100) | User Email |
| password | VARCHAR(255) | User Password |

## Workouts Table

| Field | Data Type | Description |
|---------|---------|---------|
| workout_id | INT | Primary Key |
| user_id | INT | Foreign Key |
| workout_name | VARCHAR(100) | Workout Name |
| duration | INT | Duration in Minutes |
| workout_date | DATE | Workout Date |

## Progress Table

| Field | Data Type | Description |
|---------|---------|---------|
| progress_id | INT | Primary Key |
| user_id | INT | Foreign Key |
| weight | DECIMAL(5,2) | User Weight |
| bmi | DECIMAL(4,2) | BMI |
| recorded_date | DATE | Record Date |

## Relationships

- One user can have many workouts.
- One user can have many progress records.
- Workouts are linked to Users through user_id.
- Progress is linked to Users through user_id.