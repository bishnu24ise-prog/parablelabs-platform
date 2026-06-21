import "./globals.css";

export const metadata = {
  title: "ParableLabs Talent Platform UI Playground",
  description: "Preview of all converted Stitch UI components",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased dark" suppressHydrationWarning>
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap" 
          rel="stylesheet" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0b0d12] text-white">
        {children}
      </body>
    </html>
  );
}
