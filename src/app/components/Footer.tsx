import React from 'react';
import { IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 gap-8">
          {/* Columna 1 */}
          <div>
            <h4 className="font-bold mb-4">Fingertipe</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Examples</a></li>
              <li><a href="#" className="hover:underline">Pricing</a></li>
              <li><a href="#" className="hover:underline">Updates</a></li>
            </ul>
          </div>

          {/* Columna 4 */}
          <div className="flex flex-col space-y-4">
            <p>
              <span role="img" aria-label="location">📍</span> 7480 Mockingbird Hill, undefined
            </p>
            <p>
              <span role="img" aria-label="phone">📞</span> (239) 555-0108
            </p>
            <div className="flex space-x-2">
              <IconButton className="text-white">
                <Twitter />
              </IconButton>
              <IconButton className="text-white">
                <Facebook />
              </IconButton>
              <IconButton className="text-white">
                <LinkedIn />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
