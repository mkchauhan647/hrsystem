import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// wrap with context provider 
// wrap with context provider

import {FirebaseProvider} from '@/firebaseConfig/'
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        
        <FirebaseProvider>
        {children}
          
      </FirebaseProvider>
        
      </body>
    </html>
  );
}
