import Header from "../common/Header";
import { getUserConversations } from "../../app/(main)/chat/action";
import AppSidebar from "../common/Sidebar";
import { ConversationData } from "../../types/index";
import { getAuthenticatedUser } from "../../app/(auth)/action";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function LoggedInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let conversationList: ConversationData[] = [];
  const user = await getAuthenticatedUser();

  if (user) {
    conversationList = await getUserConversations();
  }
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
