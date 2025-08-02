import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Index() {
  const [selectedChat, setSelectedChat] = useState(0)
  const [messageText, setMessageText] = useState('')
  const [isOfflineMode, setIsOfflineMode] = useState(false)
  const [taiGaMode, setTaiGaMode] = useState(false)

  // Демо-данные для чатов
  const chats = [
    {
      id: 1,
      name: "Алексей Медведев",
      lastMessage: "Завтра выезжаем на Байкал 🏔️",
      time: "15:42",
      avatar: "🐻",
      status: "онлайн",
      unread: 2
    },
    {
      id: 2,
      name: "Группа: Охотники",
      lastMessage: "Кто знает хорошие места возле Томска?",
      time: "14:20",
      avatar: "🦌",
      status: "в тайге",
      unread: 0
    },
    {
      id: 3,
      name: "Мария Снежная",
      lastMessage: "Прогноз: завтра -35°C ❄️",
      time: "12:15",
      avatar: "❄️",
      status: "оффлайн",
      unread: 0
    }
  ]

  // Демо-сообщения
  const messages = [
    {
      id: 1,
      sender: "Алексей Медведев",
      text: "Привет! Как дела? Готовишься к поездке?",
      time: "15:40",
      isMine: false,
      avatar: "🐻"
    },
    {
      id: 2,
      sender: "Я",
      text: "Все отлично! Собрал рюкзак, проверил снаряжение 🎒",
      time: "15:41",
      isMine: true,
      avatar: "🚀"
    },
    {
      id: 3,
      sender: "Алексей Медведев", 
      text: "Завтра выезжаем на Байкал 🏔️ Погода будет хорошая, -20°C",
      time: "15:42",
      isMine: false,
      avatar: "🐻"
    }
  ]

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // В реальном приложении здесь была бы отправка сообщения
      console.log('Отправка сообщения:', messageText)
      setMessageText('')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Заголовок приложения */}
      <header className="siberian-gradient p-6 text-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">❄️</div>
              <div>
                <h1 className="text-2xl font-bold text-white">SibCHAT</h1>
                <p className="text-blue-100 text-sm">Мессенджер для Сибири</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Статус подключения */}
              <Badge variant={isOfflineMode ? "destructive" : "default"} className="bg-white/20 text-white">
                <Icon name={isOfflineMode ? "WifiOff" : "Wifi"} size={16} className="mr-1" />
                {isOfflineMode ? "Оффлайн" : "Онлайн"}
              </Badge>
              
              {/* Режим Тайга */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTaiGaMode(!taiGaMode)}
                className={`border-white/30 text-white hover:bg-white/20 ${taiGaMode ? 'bg-white/20' : ''}`}
              >
                <Icon name="TreePine" size={16} className="mr-1" />
                {taiGaMode ? "Выйти из тайги" : "Режим тайга"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          
          {/* Боковая панель с чатами */}
          <Card className="lg:col-span-1 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Чаты</h2>
              <Button size="sm" variant="outline">
                <Icon name="Plus" size={16} />
              </Button>
            </div>
            
            <ScrollArea className="h-[500px]">
              <div className="space-y-2">
                {chats.map((chat, index) => (
                  <Card 
                    key={chat.id}
                    className={`p-3 cursor-pointer transition-colors hover:bg-accent/50 ${
                      selectedChat === index ? 'bg-accent/20 border-accent' : ''
                    } ${taiGaMode ? 'taiga-mode' : ''}`}
                    onClick={() => setSelectedChat(index)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="text-lg">{chat.avatar}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate">{chat.name}</h3>
                          <span className="text-xs text-muted-foreground">{chat.time}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate">
                            {chat.lastMessage}
                          </p>
                          {chat.unread > 0 && (
                            <Badge className="ml-2 bg-accent text-accent-foreground">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1 mt-1">
                          <div className={`w-2 h-2 rounded-full ${
                            chat.status === 'онлайн' ? 'bg-green-500' : 
                            chat.status === 'в тайге' ? 'bg-orange-500' : 'bg-gray-400'
                          }`} />
                          <span className="text-xs text-muted-foreground">{chat.status}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Основная область чата */}
          <Card className="lg:col-span-2 flex flex-col">
            {/* Заголовок чата */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="text-lg">{chats[selectedChat]?.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{chats[selectedChat]?.name}</h3>
                  <p className="text-sm text-muted-foreground">{chats[selectedChat]?.status}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="Phone" size={16} />
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Video" size={16} />
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="MoreVertical" size={16} />
                </Button>
              </div>
            </div>

            {/* Область сообщений */}
            <ScrollArea className={`flex-1 p-4 ${taiGaMode ? 'taiga-mode' : ''}`}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex gap-3 ${message.isMine ? 'flex-row-reverse' : ''}`}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-sm">{message.avatar}</AvatarFallback>
                    </Avatar>
                    
                    <div className={`max-w-[70%] ${message.isMine ? 'text-right' : ''}`}>
                      <Card className={`p-3 ${
                        message.isMine 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                      </Card>
                      <p className="text-xs text-muted-foreground mt-1">{message.time}</p>
                    </div>
                  </div>
                ))}
                
                {/* Индикатор режима "Тайга" */}
                {taiGaMode && (
                  <div className="text-center py-4">
                    <Badge className="bg-orange-500 text-white">
                      <Icon name="TreePine" size={12} className="mr-1" />
                      Режим "Тайга" активен - только текст
                    </Badge>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Поле ввода сообщения */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Написать сообщение..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                  disabled={isOfflineMode}
                />
                
                <Button variant="outline" size="sm" disabled={taiGaMode}>
                  <Icon name="Paperclip" size={16} />
                </Button>
                
                <Button variant="outline" size="sm" disabled={taiGaMode}>
                  <Icon name="Mic" size={16} />
                </Button>
                
                <Button 
                  onClick={handleSendMessage}
                  disabled={!messageText.trim() || isOfflineMode}
                  className="bg-accent hover:bg-accent/90 text-white"
                >
                  <Icon name="Send" size={16} />
                </Button>
              </div>
              
              {isOfflineMode && (
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Icon name="WifiOff" size={12} />
                  Сообщения будут отправлены при появлении связи
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Демо-панель функций */}
        <Card className="mt-6 p-6">
          <h3 className="text-lg font-semibold mb-4">🚀 Сибирские фишки SibCHAT</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={() => setIsOfflineMode(!isOfflineMode)}
            >
              <Icon name={isOfflineMode ? "WifiOff" : "Wifi"} size={24} />
              <div className="text-center">
                <div className="font-medium">Офлайн-режим</div>
                <div className="text-xs text-muted-foreground">
                  {isOfflineMode ? "Включён" : "Выключен"}
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <div className="text-2xl">🐻</div>
              <div className="text-center">
                <div className="font-medium">Сибирские стикеры</div>
                <div className="text-xs text-muted-foreground">50+ уникальных</div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Icon name="CloudSnow" size={24} />
              <div className="text-center">
                <div className="font-medium">Погода в статусе</div>
                <div className="text-xs text-muted-foreground">-25°C, метель</div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Icon name="Shield" size={24} />
              <div className="text-center">
                <div className="font-medium">Шифрование</div>
                <div className="text-xs text-muted-foreground">Защищено</div>
              </div>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}