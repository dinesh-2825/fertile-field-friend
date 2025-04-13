
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Sidebar as SidebarComponent, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { 
  Home, 
  Droplet, 
  SunMedium, 
  SeedingIcon, 
  AlertCircle, 
  Settings, The2, 
  Bell 
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { title: 'Dashboard', icon: Home, path: '/' },
    { title: 'Irrigation', icon: Droplet, path: '/irrigation' },
    { title: 'Weather', icon: SunMedium, path: '/weather' },
    { title: 'Crops', icon: SeedingIcon, path: '/crops' },
    { title: 'Alerts', icon: AlertCircle, path: '/alerts' },
    { title: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      <SidebarComponent>
        <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
          <h1 className="text-lg font-bold text-sidebar-foreground flex items-center gap-2">
            <SeedingIcon className="h-6 w-6" />
            <span>FarmSmart</span>
          </h1>
        </div>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Farm Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.path}
                        className={({ isActive }) => 
                          isActive ? "text-sidebar-primary-foreground bg-sidebar-primary" : ""
                        }
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </SidebarComponent>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <SidebarTrigger />
      </div>
    </>
  );
};

export default Sidebar;
