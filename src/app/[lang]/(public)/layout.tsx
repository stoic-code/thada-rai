import { getSession } from "@/actions/auth.action";
import Navigation from "@/components/Navigation/Navigation";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
