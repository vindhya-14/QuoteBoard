
import '../styles/globals.css';

export const metadata = {
  title: 'QuoteBoard',
  description: 'A simple quote board built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
