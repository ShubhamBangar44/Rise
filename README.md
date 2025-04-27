# PrakashMart - Quick Grocery Delivery

A modern e-commerce application for quick grocery delivery, built with HTML, CSS, JavaScript, and Node.js.

## Features

- Modern, responsive design
- Product listing with search and category filtering
- Shopping cart functionality with local storage
- Real-time cart updates
- Order processing
- Mobile-friendly interface

## Project Structure

```
prakashmart/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── backend/
│   ├── server.js
│   └── package.json
└── README.md
```

## Setup Instructions

1. Clone the repository
2. Navigate to the project directory
3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
5. Open the `public/index.html` file in your web browser

## Backend API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/orders` - Submit an order

## Technologies Used

- Frontend:
  - HTML5
  - CSS3 (with CSS Variables)
  - JavaScript (ES6+)
  - Font Awesome for icons
- Backend:
  - Node.js
  - Express.js
  - CORS
  - Body-parser

## Features in Detail

### Frontend
- Responsive design that works on all devices
- Modern UI with smooth animations
- Real-time search and filtering
- Persistent cart using localStorage
- Toast notifications for user feedback
- Clean and intuitive navigation

### Backend
- RESTful API
- CORS enabled for frontend access
- Sample product data
- Basic order processing
- Error handling

## Future Improvements

- User authentication
- Database integration
- Payment gateway
- Product reviews and ratings
- Admin dashboard
- Order tracking
- Push notifications
- Offline support with Service Workers 