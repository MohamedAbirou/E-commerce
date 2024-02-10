import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import db from "@/lib/prismadb";
import { Navbar } from "@/components/navbar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();
  const { storeId } = params;

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await db.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  const stores = await db.store.findMany({
    where: {
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar stores={stores} />
      {children}
    </>
  );
}
