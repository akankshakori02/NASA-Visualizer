# NASA-Visualizer
NASA-Visualizer is a React and Node.js application that fetches and visualizes data from NASA’s public APIs.
It provides an interactive and user-friendly interface to explore space-related data such as imagery, asteroid information, and more.

---

## 💻 Tech Stack

- **Frontend:** React, React Router, Axios  
- **Backend:** Node.js, Express, Axios  
- **APIs:** NASA Open APIs ([https://api.nasa.gov](https://api.nasa.gov))  

---

## 🔧 Setup & Installation


## Prerequisites
Node.js
npm or yarn

# Installation
## Clone repository
`git clone https://github.com/akankshakori02/NASA-Visualizer.git`

## Install backend dependencies
`cd backend`
`npm install`

## Install frontend dependencies
`cd ../frontend`
`npm install`

## Set up environment variables:
Create a `.env` file in the backend directory. // already set in this repo
Add `NASA_API_KEY`=your_nasa_api_key_here. // you can set port as well

# IF RUNNING CODE LOCALLY, PLEASE ENSURE TO MAKE FOLLOWING CHANGES-
 In .frontend/.env modify -> `REACT_APP_API_URL = 'http://localhost:${serverPort}'`
 In .backend/index.js remove cors origin specified -> `app.use(cors())`

# Running the Application
## Start backend server
`cd backend`
`npm start`

## Start frontend application
`cd ../frontend`
`npm start`

Open your browser and navigate to `http://localhost:3000`


# Repository Organization
NASA-Visualizer/
├── frontend/                       # Contains all the frontend code of the React application
│   ├── public/                     # Public folder containing static assets
│   │   ├── index.html              # The main HTML file
│   ├── src/                        # Source files for the React application
│   │   ├── components/             # Reusable UI components
|   |   ├   └── charts/                   # Charts for Data Visualisation
│   │   │         ├── EpicLongitudeHistogram.tsx     # Histogram for images based on Longitude bucket
│   │   │         └── MarsCameraChart.tsx            # Barchart for Camera Photo Counts
│   │   │   ├── APOD.jsx             # Displays the Astronomy Picture of the Day
│   │   │   ├── EPIC.jsx             # Shows Earth images from the EPIC camera with lazy loading for images & Lazy loading component
│   │   │   ├── MarsRover.jsx        # Views Mars Rover photos with lazy loading for images & Lazy loading component
│   │   │   ├── Header.jsx           # Navigation header & offcanvas component with links to various data endpoints
│   │   │   ├── Footer.jsx           # Footer component with links to social media and other resources
│   │   │   └── Facts.js            # Displays random space facts in a dismissible toast component
│   │   ├── data/                   # Data utilities or constant data
│   │   │   ├── camera.types.js     # Definitions of camera types for Mars Rover photos
│   │   │   └── SpaceFacts.js       # Static data file containing space facts
│   │   ├── App.jsx                  # Main React component that wraps all other components
│   │   ├── index.js                # Entry point for the React app, sets up root component
|   |   └── index.css               # Base CSS file for the project
|   ├── .env                        # Set REACT_APP_API_URL, change to local host if running locally
│   └── package.json                # Defines dependencies, scripts, etc.
├── backend/                        # Node.js/Express server that handles backend logic
│   ├── index.js                   # Main index file, sets up endpoints and server configuration, remove cors origin specified for local run
|   ├── .env                        # Set NASA_API_KEY for server
└── README.md                       # Documentation of the project, setup, and usage instructions

# Description of Key Components
## frontend/src/components/:
APOD.jsx: Connects to NASA's APOD API to retrieve and display the astronomy picture of the day along with its description.
EPIC.jsx: Fetches and shows images of Earth using NASA's EPIC API, with options to toggle between image types.
MarsRover.jsx: Allows users to view photos from Mars rovers and includes functionality to Lazyload image and filter images by the camera used.
Header.jsx and Footer.js: Provide navigation and additional information, enhancing the site's usability and aesthetics.
Facts.jsx: Displays educational space facts, enhancing the informational value of the app.

## backend/index.js:
Sets up Express server routes to handle requests for NASA data.
Uses axios to fetch data from NASA's APIs and serves it to the frontend, abstracting API logic from the client side.

# Deployment
Live: https://nasa-visualizer-rust.vercel.app
Server Deployed: https://nasa-visualizer.onrender.com  (If required)
GitHub: https://github.com/akankshakori02/NASA-Visualizer

