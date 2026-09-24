# 🌤️ Full Stack Weather App

A full-stack weather forecasting web application built using **React (Vite)** on the frontend and **Node.js, Express, & MongoDB** on the backend. The app features user authentication, bcrypt password security, and real-time weather forecasting using the **Open-Meteo API**.

---

## ✨ Features

- 🔐 **User Authentication:** Secure Signup & Login with JWT / bcrypt password hashing.
- 🌡️ **Real-Time Weather:** Current weather conditions, hourly forecasts, and multi-day forecasts for any city.
- ⭐ **Favorite Cities (Protected):** Save and manage your favorite cities. *(Note: Users must be logged in to save or manage favorite cities).*
- 🎨 **Responsive UI:** Clean and modern interface built with React.

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- CSS / Tailwind CSS
- Axios / Fetch API

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- Bcrypt (Password Hashing)
- JSON Web Token (JWT)

**API:**
- [Open-Meteo Weather API](https://open-meteo.com/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your machine
- MongoDB running locally or a MongoDB Atlas URI

### 1. Setup Backend
```bash
cd backend
npm install
npm start