import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light text-center py-4 mt-auto fixed-bottom">
      <p>© {new Date().getFullYear()} Lokesh Bhangale. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
