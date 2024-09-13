import Header from "./commons/components/Header";

export const metadata = {
  title: "NonNull",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
      <Header />
        <main>{children}</main>
        <h1>하단</h1>
      </body>
    </html>
  );
}
