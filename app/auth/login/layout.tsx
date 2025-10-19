import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to CodeSmash and start challenging your friends in real-time coding battles.",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

