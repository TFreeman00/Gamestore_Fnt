# Gamestore_Fnt

Environment Variables Needed
Create .env file in the root directory of the project
Create the following .env variables:
VITE_URL="https://gamestore-bck.onrender.com"

Frontend
npm run dev: This will start the frontend React Application on http://localhost:5432/, but check your terminal after running the command to verify.
Follow the link to the deployed application via Netlify:(https://vgstore.netlify.app/)

Need to import environment variables and VITE_URL for Netlify to work properly
The deployed reposity is forked under mrkrye, so edits made to this frontend repository may not see update as it is not linked directly

Backend
Follow the link to the back_end:"https://github.com/TFreeman00/Gamestore_Bck"

1. Project Setup:

Create a new React project using Vite: npm create vite@latest my-store.
Install additional dependencies:
react-router-dom for routing between different sections of your store.
axios or a similar library for making API requests to your backend.
Any other UI component libraries you might choose (e.g., react-bootstrap, material-ui).


2. Component Structure:

Define the main components for your store layout, such as:
App: Overall root component.
Header: Navigation bar with search, filters, etc.
MainContent: Displays game listings, product details, etc.
GameCard: Individual component for displaying a game's information.
Others depending on your features (e.g., Cart, Wishlist, UserDashboard).


3. Data Fetching and Display:

Use axios or similar to fetch data from your backend API (e.g., game listings, genres, details).
Implement state management (e.g., React Context or Redux) to store and manage fetched data across components.
Create React components to display the fetched data attractively using Tailwind CSS for styling.
Consider using UI component libraries or design frameworks for faster development.
4. User Interaction:

Implement user interactions like:
Search functionality with filtering based on genres, platforms, etc.
Sorting options by price, release date, rating, etc.
Adding games to cart and managing checkout process.
Wishlisting functionality (if applicable).
User account management (if applicable).


5. Styling with Tailwind CSS:

Leverage Tailwind CSS's utility classes to style your components quickly and responsively.
Customize the Tailwind configuration to fit your store's brand and design.
Use pre-built Tailwind components or create your own for reusable styling.


Additional Resources:

Vite documentation: https://vitejs.dev/
React Router documentation: https://react.dev/
Tailwind CSS documentation: https://tailwindcss.com/
