import { Button } from "@/components/ui/button";
import { Menu, Bell, User } from "lucide-react";

interface TopbarProps {
  toggleSidebar: () => void;
  showSidebar: boolean;
}

export default function Topbar({ toggleSidebar, showSidebar }: TopbarProps) {
  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </Button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          <div className="flex items-center space-x-2">
            <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white text-xl font-bold">G</span>
            </span>
            <span className="text-gray-900 font-semibold text-lg">GenAI Analytics</span>
          </div>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-500">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="ml-3 relative">
            <div>
              <Button variant="ghost" size="icon" className="max-w-xs flex items-center text-sm rounded-full">
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                  <User className="h-5 w-5" />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
