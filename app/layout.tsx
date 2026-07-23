import type { Metadata, Viewport } from "next";
import "./globals.css";

const assetBasePath = process.env.GITHUB_ACTIONS === "true"
  ? "/haydi-yazalim-bilingual-game"
  : "";

export const metadata: Metadata = {
  title: "Haydi Yazalım! | Let’s Write!",
  description:
    "Türkçe ve İngilizce oynanabilen, resimli ve animasyonlu yaratıcı yazma oyunu.",
  applicationName: "Haydi Yazalım!",
  manifest: `${assetBasePath}/manifest.webmanifest`,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Haydi Yazalım!",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: `${assetBasePath}/favicon.svg`,
    shortcut: `${assetBasePath}/favicon.svg`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#7456d8",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
