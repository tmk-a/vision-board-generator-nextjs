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
              {conversations.length === 0 ? (
                <span>Not found</span>
              ) : (
                conversations.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={`/${item.id}`}>
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
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
    </Sidebar>
  );
};

export default AppSidebar;
