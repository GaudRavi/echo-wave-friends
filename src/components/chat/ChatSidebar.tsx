import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Users, 
  MessageCircle, 
  Settings, 
  LogOut,
  X,
  MoreVertical
} from 'lucide-react';

interface ChatSidebarProps {
  user: any;
  onLogout: () => void;
  selectedChat: any;
  onSelectChat: (chat: any) => void;
  onCloseSidebar: () => void;
}

export const ChatSidebar = ({ 
  user, 
  onLogout, 
  selectedChat, 
  onSelectChat, 
  onCloseSidebar 
}: ChatSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('chats');

  // Mock data - in real app, this would come from database
  const mockChats = [
    {
      id: '1',
      type: 'direct',
      name: 'John Doe',
      lastMessage: 'Hey, how are you doing?',
      timestamp: '2 min ago',
      unread: 3,
      isOnline: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
    },
    {
      id: '2',
      type: 'group',
      name: 'Team Chat',
      lastMessage: 'Alice: The project is almost ready',
      timestamp: '1 hour ago',
      unread: 0,
      members: 5,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=team'
    },
    {
      id: '3',
      type: 'direct',
      name: 'Sarah Wilson',
      lastMessage: 'Thanks for the help!',
      timestamp: '3 hours ago',
      unread: 0,
      isOnline: false,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
    }
  ];

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header - fixed */}
      <div className="flex-shrink-0 p-4 border-b bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.displayName} />
              <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-sm">{user.displayName}</h2>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 md:hidden"
              onClick={onCloseSidebar}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      {/* Tabs - fixed */}
      <div className="flex-shrink-0 flex border-b bg-white">
        <Button
          variant={activeTab === 'chats' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('chats')}
          className="flex-1 rounded-none"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Chats
        </Button>
        <Button
          variant={activeTab === 'users' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('users')}
          className="flex-1 rounded-none"
        >
          <Users className="h-4 w-4 mr-2" />
          Users
        </Button>
      </div>
      
      {/* New Chat Button - fixed */}
      <div className="flex-shrink-0 p-4 border-b bg-white">
        <Button className="w-full" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>
      
      {/* Chat List - scrollable */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <Card 
            key={chat.id}
            className={`m-2 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedChat?.id === chat.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => onSelectChat(chat)}
          >
            <CardContent className="p-3">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={chat.avatar} alt={chat.name} />
                    <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {chat.type === 'direct' && (
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      chat.isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500 flex-shrink-0">{chat.timestamp}</span>
                  </div>
                  <p className="text-xs text-gray-600 truncate mt-1">{chat.lastMessage}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      {chat.type === 'group' && (
                        <Badge variant="secondary" className="text-xs">
                          <Users className="h-3 w-3 mr-1" />
                          {chat.members}
                        </Badge>
                      )}
                    </div>
                    {chat.unread > 0 && (
                      <Badge className="bg-blue-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
