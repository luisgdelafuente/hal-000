// app/admin/login/layout.tsx
import React from 'react';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout should be minimal to ensure it doesn't inherit other styles or structures.
  // The root layout provides <html> and <body>.
  return <main>{children}</main>;
}
