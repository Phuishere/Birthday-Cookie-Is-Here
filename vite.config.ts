import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    
    // List of allowed hostnames
    allowedHosts: [
      'custom-domain1.example.com',
      '.example.com', // Allows example.com and all subdomains
      '192.168.1.100', // Allows a specific IP address
      '1c7a-2405-4802-a435-26a0-4cfd-7168-f435-352.ngrok-free.app'
    ],
    // Optional: set to '0.0.0.0' or true to listen on all network interfaces, including LAN and public addresses
    host: true, 
  },
});