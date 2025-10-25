import { ConversationData } from "../../types/index";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import UserAvatar from "./UserAvatar";

interface AppSidebarProps {
  conversations: ConversationData[];
  user: { name: string | undefined; imageUrl: string | undefined };
}

const AppSidebar = ({ conversations, user }: AppSidebarProps) => {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href={"/"}>
          <h1 className="text-xl font-bold">Vision Board Generator</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel>Chat List</SidebarGroupLabel>
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
              <div className="flex flex-col w-full h-96 pt-4 overflow-y-scroll">
                {conversations.length === 0 ? (
                  <span>Not found</span>
                ) : (
                  conversations.map((item) => (
                    <SidebarMenuItem
                      key={item.id}
                      className=" border-2 rounded-sm p-1 mb-2 hover:bg-accent"
                    >
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
      </SidebarContent>
      <SidebarFooter className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-3 items-center min-w-0 flex-1">
          <UserAvatar
            name={user.name || ""}
            imageUrl={user.imageUrl || ""}
            size="sm"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium" title={user.name}>
              {user.name}
            </p>
          </div>
        </div>
        <Button className="cursor-pointer flex-shrink-0" onClick={logout}>
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
