import { Link } from "@tanstack/react-router";
import { Apple, Calendar, ChevronRight, DumbbellIcon, HomeIcon, Users, type LucideIcon } from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

export function NavMain() {
  return (
    <SidebarMenu>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>

            <SidebarMenuItem key={"Home"}>
              <SidebarMenuButton asChild>
                <Link to={"/"}>
                  <HomeIcon />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem key={"Customers"}>
              <SidebarMenuButton asChild>
                <Link to={"/clients"}>
                  <Users />
                  <span>Customers</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem key={"Diets"}>
              <SidebarMenuButton asChild>
                <Link to={"/diets"}>
                  <Apple />
                  <span>Diets</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem key={"Sessions"}>
              <SidebarMenuButton asChild>
                <Link to={"/sessions"}>
                  <Calendar />
                  <span>Sessions</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem key={"Workous"}>
              <SidebarMenuButton asChild>
                <Link to={"/workouts"}>
                  <DumbbellIcon />
                  <span>Workouts</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarMenu>
  );
}
