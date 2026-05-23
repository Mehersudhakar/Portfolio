import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meher Sudhakar Abbireddi",
  description:
    "Cybersecurity engineer specializing in penetration testing, application security, and adversarial AI. 3+ years across enterprise and cloud.",
  keywords: [
    "penetration testing",
    "red team",
    "application security",
    "AI security",
    "LLM security",
    "OSCP",
    "cybersecurity engineer",
  ],
  authors: [{ name: "Meher Sudhakar Abbireddi" }],
  openGraph: {
    title: "Meher Sudhakar Abbireddi",
    description:
      "Penetration testing, application security, and adversarial AI research.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:," />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.add('light');}catch(e){}if('scrollRestoration' in history){history.scrollRestoration='manual';}if(location.hash){history.replaceState(null,'',location.pathname+location.search);}window.scrollTo(0,0);})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
