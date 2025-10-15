import { getUserVisions } from "@/services/visionService";
import { getRequiredUserId } from "../../(auth)/action";
import { GeneratedItemsData } from "@/types/index";
import Card from "@/components/features/dashboard/Card";
import { formatDate, convertDateToLocal } from "@/services/date";

export default async function Dashboard() {
  const userId = await getRequiredUserId();
  const generatedItems: GeneratedItemsData[] = await getUserVisions(userId);

  return (
    <section className="space-y-4">
      <h1>Generated History</h1>
      {generatedItems.length === 0
        ? null
        : generatedItems.map((item) => {
            const imageUrl = item.generated_image_url || undefined;
            const editDate = formatDate(convertDateToLocal(item.created_at));
            return (
              <Card
                key={item.id}
                data={item}
                imageUrl={imageUrl}
                editDate={editDate}
              />
            );
          })}
    </section>
  );
}
