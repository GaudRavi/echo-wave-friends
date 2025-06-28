
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChatSidebar } from './ChatSidebar';
import { ChatWindow } from './ChatWindow';
import { Menu, X } from 'lucide-react';

interface ChatAppProps {
  user: any;
  onLogout: () => void;
}

export const ChatApp = ({ user, onLogout }: ChatAppProps) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-white border-r transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:z-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <ChatSidebar 
          user={user}
          onLogout={onLogout}
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
          onCloseSidebar={() => setIsSidebarOpen(false)}
        />
      </div>
      
      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <div className="md:hidden bg-white border-b p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold">ChatApp</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
        
        {/* Chat window */}
        <div className="flex-1">
          <ChatWindow 
            selectedChat={selectedChat}
            currentUser={user}
          />
        </div>
      </div>
    </div>
  );
};
