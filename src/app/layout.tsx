import "./globals.css";
import "./family.css";
import { Noto_Sans } from "next/font/google";
import QueryProvider from "@/providers/QueryProvider";
import dynamic from "next/dynamic";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { SessionProvider } from "@/providers/SessionProvider";
import { getSession } from "@/actions/auth.action";
import Footer from "@/components/Footer/Footer";
const ProgressBar = dynamic(() => import("@/components/ProgressBar"), {
  ssr: false,
});

const notoSans = Noto_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "devanagari"],
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const session = await getSession();
  const lang = params.lang || "np";
  return (
    <html className="scroll-smooth" lang="en">
      <body
        className={cn(
          notoSans.className,
          "bg-gray-100  min-h-screen flex flex-col"
        )}
      >
        <QueryProvider>
          <SessionProvider session={session}>
            <ProgressBar />
            <div className=" flex-1">{children}</div>
            <Toaster position="bottom-right" richColors />
          </SessionProvider>
        </QueryProvider>

        <Footer />
      </body>
    </html>
  );
}
