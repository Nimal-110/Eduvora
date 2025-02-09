import Navbar from "@/app/components/Navbar";
import "@/public/styles/globals.css";

export default function Layout({ children }) {
  return (
    <>
      {/* Root HTML and body tags are required in the root layout */}
      <html lang="en">
        <body className="bg-gradient-to-r from-blue-500 to-violet-600">
          {/* Navbar for app header */}
          <Navbar />
          
          {/* Main content section */}
          <main className="p-6 bg-white shadow-md rounded-lg">
            {children}
          </main>
        </body>
      </html>
    </>
  );
}
