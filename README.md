Journ AI
========

**Trello board:** [Trello Journ AI project](https://trello.com/)

**Backend repository:** [journai-backend](https://github.com/SilvinaFigueroa/journai-backend)


Purpose
-------

Journ AI is a web application designed to help users journal their thoughts and emotions and gain meaningful insights through AI analysis.

Project Description
-------------------

Journaling involves writing down thoughts and feelings to understand them better. It provides a safe space for expressing emotions without judgment and helps users process feelings, gain clarity, and improve mental health.

Value Proposition
-----------------

Journ AI allows users to gain insights from their data over time, empowering them to compare thoughts and feelings and aggregate data points to find correlations. Examples of insights include identifying the happiest day of the week, understanding stress triggers, and assessing the impact of weather on mood.

Project MVP (Minimum Viable Product)
------------------------------------

### Home Page

-   Introduction to Journ AI and its features.
-   User-friendly interface with an overview of the application.

### Login

-   Secure user authentication.
-   Account creation.

### Journal Entry

-   Interface for users to write and manage their journal entries.
-   Options to tag entries with emotions or specific events.

### Dashboard with Data Insights

-   Data insights based on journal entries.
-   Analysis to identify patterns such as the happiest day of the week, stress factors, and weather impact on mood.

Technical Implementation
------------------------

### System Architecture

-   **Model-View-Controller (MVC) Architecture**

### Backend (Controller)

-   **Server:** Node.js with Express.js

-   **Dependencies:**

    -   `bcryptjs`: Password hashing.
    -   `cors`: Enabling Cross-Origin Resource Sharing.
    -   `dotenv`: Managing environment variables.
    -   `express`: Web framework for Node.js.
    -   `express-validator`: Validation of incoming request data.
    -   `jsonwebtoken`: For generating and verifying JSON Web Tokens.
    -   `mongoose`: For MongoDB object modeling.
-   **Database:** MongoDB

    -   **Schema Modeling:** Mongoose

### Frontend (View)

-   **Client:** React
-   **Dependencies:**
    -   `axios`: Making HTTP requests to the backend API.
    -   `react-cookie`: Managing cookies in React applications.
    -   `react-dom`: Managing the DOM in React applications.
    -   `react-router-dom`: Routing and navigation in React applications.
    -   `react-markdown`: Format Gemini API response message.
    -   `jwt-decode`: Decode token to get payload on Frontend.

### API Integration

-   **AI Implementation:**
    -   **Gemini 1.5 Pro:** Used for analyzing journal entries and providing personalized recommendations to enhance the user's wellbeing.
-   **Weather API:** [Weather API](https://www.weatherapi.com/)
    -   Weather information is included in journal entries when saved, enabling correlations between weather and mood.

User Stories
------------

1.  **As a visitor,** I want to view an introduction to Journ AI and its features so that I can understand what the application offers.
2.  **As a visitor,** I want a user-friendly interface on the home page so that I can easily navigate and learn about the application.
3.  **As a user,** I want to securely log in to Journ AI so that I can access my journal and data insights.
4.  **As a new user,** I want to create an account on Journ AI so that I can start journaling and accessing data insights.
5.  **As a user,** I want to write and manage my journal entries so that I can document my thoughts and feelings.
6.  **As a user,** I want to tag my journal entries with emotions or specific events so that I can categorize and reflect on them later.
7.  **As a user,** I want to view data insights based on my journal entries so that I can understand patterns in my thoughts and feelings.

CRUD Operation
--------------

### Users

-   **Create:**
    -   Mandatory: First Name, Last Name, email, password, location.
    -   The location will be used to fetch data from the weather API on each journal entry.
-   **Read:**
    -   First Name, Last Name, email, location.
    -   Journal entries.
-   **Update:**
    -   Email can't be updated since it's used as a reference to link journal entries.
    -   The rest of the user properties can be updated.
-   **Delete:**
    -   Account users can be deleted
    -   Journal entries associated with the user are deleted.

### Journal

-   **Create:**
    -   **User input:**
        -   Journal content - mandatory.
        -   Input mood 
        -   Location (default value: user location).
    -   **Fetch data:**
        -   dateTime.
        -   Weather data (API fetch).
        -   User from logged user.
-   **Read:**
    -   Fetch journal entries per user.
    -   Display all the data.
-   **Update:**
    -   Fields that can be updated:
        -   Input mood.
        -   Location (default value: user location).
        -   Journal content.
-   **Delete:**
    -   Search journal by user email and delete.

Next Project Iterations
-----------------------

### Additional Features

-   Motivational Phrases.
-   Curiosities about the day.
-   Recommendations for the day.

* * * * *

Expanded Use Case: Time Management and Work Tracking
----------------------------------------------------

The Journ AI platform can also be implemented to manage time and track work. Users can input the work they have accomplished daily, such as meetings, deliverables, documents, and other tasks. Periodically, users can receive a summary of their performance and the work completed. This summary can serve as a valuable data point for creating performance reviews, promotion documents, or updating resumes, helping keep accomplishments and metrics up to date.
