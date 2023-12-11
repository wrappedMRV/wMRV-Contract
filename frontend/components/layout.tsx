import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Dynamically import Navbar and Footer without server-side rendering
const Navbar = dynamic(() => import('./NavBar'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });

type LayoutProps = {
  children: React.ReactNode; // Ensures that children is a valid React node
  metadata: Metadata; // Include metadata in the layout props
};

type Metadata = {
  title: string;
  description: string;
};


const Layout: React.FC<LayoutProps> = ({ children, metadata }) => {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Other metadata elements */}
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
