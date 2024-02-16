import db from "@/lib/prismadb";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const { storeId } = params;
  const store = await db.store.findFirst({
    where: {
      id: storeId,
    },
  });

  return <div>{store?.name}</div>;
};

export default DashboardPage;
