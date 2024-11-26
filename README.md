# Women Streetwear E-commerce

landing page preeview: https://ibb.co/17jgb25

This is a fully responsive eCommerce web application for a women built using **React.js** **Redux-Toolkit** and **MUI**. It provides users with a smooth and interactive interface to browse, search, and purchase women streetwear online.

## Features

- **Product Listing**: View a collection of shoes with images, prices, and descriptions.
- **Search Functionality**: Easily search for specific shoes by keywords in dashboard.
- **Responsive Design**: Optimized for all screen sizes with mobile-first design using Tailwind CSS.
- **Shopping Cart**: Add shoes to a shopping cart and adjust quantities.
- **Order History**: Use can check order history in his dashboard page.
- **Authentication**: User login and registration with authentication handling .

## Tech Stack

- **React.js**: Front-end framework used for building the user interface.
- **Redux Toolkit**: Centralized storage for reusability.
- **Tailwind CSS**: Utility-first CSS framework for designing responsive layouts quickly.
- **React Router**: For navigating between pages.
- **Axios/Fetch API**: To make API calls to backend services .

## Installation and Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/sumanhax/streetwear-localdb.git
    ```

2. Navigate into the project directory:

    ```bash
    cd streetwear-localdb
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Run the development server:

    ```bash
    npm start
    ```

    The app should now be running on `http://localhost:3000`.

## Folder Structure

```plaintext
├── public
├── src
│   ├── components     # Reusable UI components (e.g., Navbar, Footer, ProductCard)
│   ├── context        # Global state (e.g., cart context)
│   ├── utils          # Helper functions
│   ├── App.js         # Main app component
│   └── index.js       # Entry point
├── package.json
└── README.md
