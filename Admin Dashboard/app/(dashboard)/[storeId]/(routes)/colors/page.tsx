import db from "@/lib/prismadb";
import { format } from "date-fns";
import { ColorClient } from "./_components/color-client";
import { ColorColumn } from "./_components/columns";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const { storeId } = params;

  const colors = await db.color.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
