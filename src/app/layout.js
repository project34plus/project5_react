import Header from './commons/components/Header';
import Footer from './commons/components/Footer';

export const metadata = {
  title: '@NonNull',
  description: '논문을 널위해 준비했어..',
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
