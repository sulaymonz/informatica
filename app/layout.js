import './globals.css';
import ReduxProvider from './ReduxProvider';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Informatica',
  description:
    'Computer Science website with exercises for primary school students.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-black bg-white">
        <ReduxProvider>
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
