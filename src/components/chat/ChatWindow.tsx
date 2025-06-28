
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Smile, 
  Paperclip, 
  Phone, 
  Video, 
  MoreVertical,
  Users,
  Info
} from 'lucide-react';

interface ChatWindowProps {
  selectedChat: any;
  currentUser: any;
}

export const ChatWindow = ({ selectedChat, currentUser }: ChatWindowProps) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  // Mock messages - in real app, this would come from database
  const mockMessages = selectedChat ? [
    {
      id: '1',
      senderId: selectedChat.id === '1' ? 'john' : 'user1',
      senderName: selectedChat.id === '1' ? 'John Doe' : 'Alice',
      content: 'Hey there! How are you doing?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      type: 'text',
      isRead: true
    },
    {
      id: '2',
      senderId: currentUser.id,
      senderName: currentUser.displayName,
      content: "I'm doing great! Just working on some projects. How about you?",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
      type: 'text',
      isRead: true
    },
    {
      id: '3',
      senderId: selectedChat.id === '1' ? 'john' : 'user2',
      senderName: selectedChat.id === '1' ? 'John Doe' : 'Bob',
      content: 'Same here! Working on the new chat app feature.',
      timestamp: new Date(Date.now() - 1000 * 60 * 1),
      type: 'text',
      isRead: false
    }
  ] : [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // In real app, this would send to database
    console.log('Sending message:', message);
    setMessage('');
  };

  if (!selectedChat) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Send className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to ChatApp</h3>
          <p className="text-gray-600">Select a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white relative">
      {/* Sticky Chat Header */}
      <div className="sticky top-0 z-10 border-b p-4 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {selectedChat.type === 'direct' && (
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  selectedChat.isOnline ? 'bg-green-500' : 'bg-gray-400'
                }`} />
              )}
            </div>
            <div>
              <h3 className="font-semibold">{selectedChat.name}</h3>
              <div className="flex items-center space-x-2">
                {selectedChat.type === 'direct' ? (
                  <span className="text-sm text-gray-500">
                    {selectedChat.isOnline ? 'Online' : 'Last seen 2 hours ago'}
                  </span>
                ) : (
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{selectedChat.members} members</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Messages - with padding to account for sticky elements */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {mockMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs sm:max-w-md ${msg.senderId === currentUser.id ? 'order-2' : 'order-1'}`}>
              <Card className={`${
                msg.senderId === currentUser.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100'
              }`}>
                <CardContent className="p-3">
                  {selectedChat.type === 'group' && msg.senderId !== currentUser.id && (
                    <p className="text-xs font-medium mb-1 opacity-75">{msg.senderName}</p>
                  )}
                  <p className="text-sm">{msg.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {msg.senderId === currentUser.id && (
                      <div className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-current rounded-full opacity-60"></div>
                        <div className={`w-1 h-1 rounded-full ${msg.isRead ? 'bg-blue-300' : 'bg-gray-400'}`}></div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <Card className="bg-gray-100">
              <CardContent className="p-3">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Sticky Message Input */}
      <div className="sticky bottom-0 z-10 border-t p-4 bg-white shadow-lg">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="pr-10"
            />
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1 h-6 w-6"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          
          <Button type="submit" size="icon" disabled={!message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
