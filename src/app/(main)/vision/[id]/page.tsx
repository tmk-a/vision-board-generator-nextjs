import { getVisionById } from "@/services/visionService";
import { GeneratedItemsData } from "@/types/index";
import { formatDate, convertDateToLocal } from "@/services/date";
import DetailCard from "@/components/features/dashboard/DetailCard";

interface VisionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function VisionPage({ params }: VisionPageProps) {
  const { id } = await params;

  const generatedItem: GeneratedItemsData | null = await getVisionById(id);
  if (!generatedItem) return <div>Not Found</div>;

  const imageUrl = generatedItem.generated_image_url || undefined;
  const editDate = formatDate(convertDateToLocal(generatedItem.created_at));

  return (
    <section className="space-y-4">
      <DetailCard
        item={generatedItem}
        imageUrl={imageUrl}
        editDate={editDate}
      />
    </section>
  );
}
