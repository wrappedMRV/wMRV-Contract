import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import type {Metadata} from 'next';

// Dynamically import Navbar and Footer without server-side rendering
const Navbar = dynamic(() => import('./NavBar'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });

type LayoutProps = {
  children: React.ReactNode; // Ensures that children is a valid React node
  metadata: Metadata; // Include metadata in the layout props
};



 const metadata: Metadata = {
  title: 'Default Title', // Default title for all routes
  description: 'Default description for the website', // Default description
  // You can include other metadata like openGraph, twitter, etc.
};

const Layout: React.FC<LayoutProps> = ({ children}) => {
  return (
    <>
    
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
