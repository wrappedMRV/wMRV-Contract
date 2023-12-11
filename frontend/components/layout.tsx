import React from 'react';
import Head from 'next/head';
import type {Metadata} from 'next';
import NavBar from '@/../../components/NavBar';
import Footer from '@/../../components/Footer';
// Dynamically import Navbar and Footer without server-side rendering


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
    
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
