# CRM Frontend

Welcome to the CRM Frontend repository! This project serves as the user interface for a Customer Relationship Management (CRM) system, enabling businesses to manage customer interactions, sales pipelines, and marketing campaigns efficiently.

## Local Setup Instructions

To run the CRM Frontend locally, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/avi26704/CRM_Frontend.git
   cd CRM_Frontend
   ```

2. **Install Dependencies**

   Ensure you have [Node.js](https://nodejs.org/) installed. Then, run:

   ```bash
   npm install
   ```

3. **Start the Development Server**

   ```bash
   npm start
   ```

   This will launch the application at [http://localhost:3000](http://localhost:3000).

## Architecture Diagram

Below is a high-level architecture diagram illustrating the CRM system's components:
![alt text](<Screenshot 2025-09-15 185211.png>)

## Technologies Used

The CRM Frontend is built using modern web technologies to ensure a responsive and efficient user experience:

- **React.js**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Axios**: A promise-based HTTP client for making API requests.
- **React Router DOM**: Declarative routing for React applications.
- **React Icons**: A library of popular icons for React applications.
- **JSONWebToken (JWT)**: A library for securely handling authentication tokens.
- **Recharts**: A charting library for creating interactive and customizable charts in React applications.
- **Google OAuth**: Used for secure user authentication and login with Google accounts.

## Summary of AI Tools and Other Technologies

Currently, the frontend does not integrate AI tools directly. However, the architecture is designed to support future AI enhancements such as:

- **Chatbots**: For AI-driven support.

## Known Limitations

1. **Backend Dependency** – Requires a running backend API for full functionality.
2. **Authentication and Security** – Basic token-based authentication (JWT); advanced features not fully implemented.
3. **Data Validation** – Minimal client-side validation; backend ensures data integrity.
4. **Error Handling** – Basic error handling for API failures or network issues.
5. **Limited AI Integration** – AI features are planned but not yet implemented.
6. **Performance with Large Data** – Not optimized for extremely large datasets; rendering large tables/charts may slow the UI.

## Known Assumptions

1. **Backend API Structure** – Assumes the backend follows expected REST endpoints and response formats.
2. **Network Availability** – Assumes stable internet for API calls; offline mode not supported.
3. **Environment Variables** – Correct configuration (e.g., `REACT_APP_API_URL`) is required.
4. **Modern Browser Usage** – Assumes users access the app via modern browsers with ES6 support.
5. **Data Consistency** – Relies on backend to maintain data integrity; frontend performs only UI-level validations.
