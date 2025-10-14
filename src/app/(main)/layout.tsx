import Header from "@/components/common/Header";
import AppSidebar from "@/components/common/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getAuthenticatedUser } from "../(auth)/action";
import { ConversationData } from "../../types/index";
import { getUserConversations } from "../../app/(main)/chat/action";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/login?redirectTo=/dashboard");
  }

  const conversationList: ConversationData[] = await getUserConversations();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <SidebarProvider>
          <div className="flex flex-col w-full">
            <Header sidebarTrigger={<SidebarTrigger />} />
            <div className="flex grow">
              <AppSidebar conversations={conversationList} />
              <div className="bg-stone-50 grow p-4">{children}</div>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </>
  );
}
