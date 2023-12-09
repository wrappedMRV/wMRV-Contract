import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import dynamic from 'next/dynamic';
const inter = Inter({ subsets: ['latin'] })

const Navbar = dynamic(() => import('@/../../components/NavBar'), { ssr: false }); // Adjust the import path as needed
const Footer = dynamic(() => import('@/../../components/Footer'), { ssr: false }); // Adjust the import path as needed

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode // Making children optional
}) {
  return (
    <>
      <Navbar />
      <main>
      {children}
      </main> {/* Children are rendered here */}
      <Footer />
    </>
  );
}