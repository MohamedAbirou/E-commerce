import db from "@/lib/prismadb";
import { SizeColumn } from "./_components/columns";
import { format } from "date-fns";
import { SizeClient } from "./_components/size-client";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const { storeId } = params;

  const sizes = await db.size.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
