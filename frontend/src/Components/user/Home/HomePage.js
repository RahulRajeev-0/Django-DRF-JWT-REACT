// HomePage.js

import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css'; // Custom styles

const HomePage = () => {
  return (
    <div className="containerfluid">
      <header className="header">
        <h1>Welcome to My Awesome Website</h1>
        <p>Your One-Stop Destination for Exciting Content</p>
      </header>

      <section className="main-content">
        <div className="row">
          <div className="col-md-6">
            <h2>About Us</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              ac libero turpis. Sed gravida vehicula nisl, nec aliquet mauris
              ultricies in.
            </p>
          </div>
          <div className="col-md-6">
            <h2>Our Services</h2>
            <ul>
              <li>Web Development</li>
              <li>Mobile App Development</li>
              <li>UI/UX Design</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 My Awesome Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
