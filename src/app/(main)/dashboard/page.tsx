import { getUserVisions } from "@/services/visionService";
import { getRequiredUserId } from "../../(auth)/action";
import { GeneratedItemsData } from "@/types/index";
import Card from "@/components/features/dashboard/Card";

export default async function Dashboard() {
  const userId = await getRequiredUserId();
  const generatedItems: GeneratedItemsData[] = await getUserVisions(userId);

  return (
    <section className="space-y-4">
      <h1>Generated History</h1>
      {generatedItems.length === 0
        ? null
        : generatedItems.map((item) => <Card key={item.id} data={item} />)}
    </section>
  );
}
