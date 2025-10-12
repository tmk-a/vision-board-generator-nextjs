import { getUserVisions } from "@/services/visionService";
import { getAuthenticatedUser } from "../../(auth)/action";
import { Image } from "lucide-react";
import { GeneratedItemsData } from "@/types/index";
export default async function Dashboard() {
  const user = await getAuthenticatedUser();

  let generatedItems: GeneratedItemsData[] = [];
  if (user) {
    generatedItems = await getUserVisions(user.id);
  }
  return (
    <section className="space-y-4">
      <h1>Generated History</h1>
      {generatedItems.map((item) => {
        const imageUrl = item.generated_image_url || "";

        return (
          <div key={item.id} className="h-1/5 w-1/3 flex flex-col gap-4">
            <p>{item.generated_text}</p>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="vision board image"
                width={400}
                height={400}
                className="object-cover"
              />
            ) : (
              <Image />
            )}
          </div>
        );
      })}
    </section>
  );
}
