import NotFoundClient from "@/components/sections/NotFoundClient";

export const metadata = {
  title: "Page Not Found | Appunni Vaidyar Parvathy",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <NotFoundClient />;
}
