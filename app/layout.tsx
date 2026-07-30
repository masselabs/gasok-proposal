import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZKProofport for GIWA",
  description:
    "Dojang의 신뢰를 원본 지갑과 민감정보 노출 없이 활용하는 GIWA 프라이버시 인프라",
  icons: {
    icon: "/assets/zkproofport-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
