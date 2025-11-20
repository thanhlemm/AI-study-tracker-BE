# AI Study Tracker Backend

## Overview

This repository hosts the backend for the **AI Study Tracker** application, built with NestJS. The app is an AI-powered study management tool designed for users preparing for exams like IELTS, TOEIC, HSK, TOPIK, or any custom subjects. Users can configure their own study areas, track sessions, and receive AI-driven insights to analyze performance weaknesses and generate personalized study schedules.

**Important Note:** This project is currently in the conceptual and planning stage. It represents an idea for a backend implementation and has not been fully developed or completed yet. The code here may include initial setups, prototypes, or placeholders, and contributions or expansions are welcome as the project progresses.

## ⚙️ Key Features (Planned)

The backend will support the following core functionalities:

### 1. Study Management Structure
- **Study Areas**: Users can create customizable fields of study (e.g., IELTS, TOEIC, JavaScript Programming).
- **Skills/Sections**: Nested under Study Areas, allowing users to define sub-sections (e.g., Listening, Reading for IELTS; Chapters for programming subjects).
- **Sessions/Logs**: Users log individual study sessions with details like date, duration, content, scores, difficulty level, and notes. This data serves as input for AI analysis.

All configurations are user-driven—no hardcoded structures—to allow flexibility for any learning domain.

### 2. AI-Powered Insights
- **Performance Analysis**: AI engine processes session data to identify weaknesses, such as low-scoring sections, inconsistent study habits, or recurring issues from notes.
  - Examples of AI outputs:
    - "Your weakest area is IELTS Reading – Matching Headings, with low scores in the last 3 sessions."
    - "You skip studies on Thursdays and Fridays – suggest shifting Listening practice to these days."
    - "Notes indicate struggles with Grammar Tenses – recommend 30 minutes daily on this topic."
- Integration: Backend will handle data aggregation and API calls to an AI service (e.g., OpenAI or a custom model) to generate insights in JSON format.

### 3. Smart Study Scheduling
- AI-generated personalized schedules based on user goals, available time, weak areas, and study frequency.
  - Example schedule:
    - Monday: Listening – 45 minutes
    - Tuesday: Reading – 60 minutes
    - Thursday: Writing Task 2 – 40 minutes
    - Sunday: Mock Test
- Workflow: Frontend sends study data to backend; backend processes via AI and returns a JSON schedule.

### 4. Core Backend Capabilities
- **Authentication**: User registration, login, and JWT-based auth for secure access.
- **CRUD Operations**: Full create/read/update/delete support for study entities.
- **Data Storage**: Persistent storage for user data, sessions, and AI outputs.
- **API Endpoints**: RESTful APIs for frontend integration (e.g., Next.js).

## Tech Stack
- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL with TypeORM.
- **Authentication**: JWT with libraries `@nestjs/passport`.
- **AI Integration**: External AI APIs (e.g., OpenAI) for analysis and scheduling.
- **Other**: Validation with class-validator, error handling, and logging.

## Installation (Prototype Setup)

1. Clone the repository:
   ```
   git clone https://github.com/thanhlemm/AI-study-tracker-BE
   cd ai-study-tracker-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables: Create a `.env` file in the root directory
 
## Running the Project

- Development mode:
  ```
  npm run start:dev
  ```

- Production mode:
  ```
  npm run start:prod
  ```

The server will run on `http://localhost:8080` by default.
