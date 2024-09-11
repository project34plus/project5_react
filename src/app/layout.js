export const metadata = {
  title: "제목",
  description: "설명",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <h1>상단</h1>
        <main>{children}</main>
        <h1>하단</h1>
      </body>
    </html>
  );
}
