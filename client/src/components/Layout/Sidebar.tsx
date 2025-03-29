import { Link } from "wouter";
import { BarChart3, Clock, Settings, HelpCircle, User, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-gray-900">
        <div className="flex items-center h-16 px-4 bg-gray-800">
          <div className="flex items-center space-x-2">
            <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white text-xl font-bold">G</span>
            </span>
            <span className="text-white font-semibold text-lg">GenAI Analytics</span>
          </div>
        </div>
        <div className="flex flex-col flex-grow px-4 py-5">
          <div className="space-y-1">
            <Link href="/" className="flex items-center px-2 py-2 text-sm font-medium text-white bg-primary rounded-md group">
                <BarChart3 className="mr-3 h-5 w-5" />
                Dashboard
            </Link>
            <Link href="/history" className="flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 group">
                <Clock className="mr-3 h-5 w-5" />
                Query History
            </Link>
            <Link href="/settings" className="flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 group">
                <Settings className="mr-3 h-5 w-5" />
                Settings
            </Link>
            <Link href="/help" className="flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 group">
                <HelpCircle className="mr-3 h-5 w-5" />
                Help & Support
            </Link>
          </div>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-full bg-gray-700 flex items-center justify-center text-gray-300">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">John Doe</div>
              <div className="text-xs text-gray-400 truncate">john@example.com</div>
            </div>
            <button className="text-gray-400 hover:text-white">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
