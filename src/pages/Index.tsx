
import { useState } from 'react';
import { AuthPage } from '@/components/chat/AuthPage';
import { ChatApp } from '@/components/chat/ChatApp';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return <ChatApp user={currentUser} onLogout={handleLogout} />;
};

export default Index;
