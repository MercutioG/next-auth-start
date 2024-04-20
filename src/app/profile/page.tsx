import UserInfo from "@/components/UserInfo";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const authSession = await getServerAuthSession();
  if(!authSession) redirect('/');

  return (  
  <main className="flex items-center justify-center h-screen">
    {authSession?.user && <UserInfo user={authSession?.user} />}
  </main>
  );
}