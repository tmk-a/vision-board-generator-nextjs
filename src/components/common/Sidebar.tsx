import { ConversationData } from "../../types/index";
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "../ui/button";
import { logout } from "@/app/(auth)/action";
import { Plus } from "lucide-react";

interface AppSidebarProps {
  conversations: ConversationData[];
}

const AppSidebar = ({ conversations }: AppSidebarProps) => {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href={"/"}>
          <h1 className="text-xl font-bold">Vision Board Generator</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link href={"/chat"}>Chat List</Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuButton asChild>
                <Button asChild>
                  <Link href={"/chat/new"}>
                    <Plus />
                    Create New
                  </Link>
                </Button>
              </SidebarMenuButton>
              <div className="flex flex-col w-full h-full p-4 overflow-y-auto">
                {conversations.length === 0 ? (
                  <span>Not found</span>
                ) : (
                  conversations.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton asChild>
                        <Link href={`/chat/${item.id}`}>
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                )}
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link href={"/dashboard"}>Dashboard</Link>
          </SidebarGroupLabel>
        </SidebarGroup>
        <Button onClick={logout}>Logout</Button>
      </SidebarContent>
      {/* TODO: add footer */}
    </Sidebar>
  );
};

export default AppSidebar;
