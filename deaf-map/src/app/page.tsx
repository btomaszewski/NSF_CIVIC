import AccessDenied from "@/components/Pages/Access/AcessDenied";
import Home from "@/components/Pages/Home/Home";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();
  return <Home />;
}
