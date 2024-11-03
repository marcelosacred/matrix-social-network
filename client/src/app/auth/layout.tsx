import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Matrix | Authentication",
    template: "%s | Matrix",
  },
  description: "Authenticate to access Matrix",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="bg-image" />
      <div className="content-wrapper">
        {children}
      </div>
    </div>
  );
}