import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Index() {
  const [selectedChat, setSelectedChat] = useState(0)
  const [selectedChatType, setSelectedChatType] = useState('personal')
  const [messageText, setMessageText] = useState('')
  const [isOfflineMode, setIsOfflineMode] = useState(false)
  const [taiGaMode, setTaiGaMode] = useState(false)

  // Личные чаты
  const personalChats = [
    {
      id: 1,
      name: "Мишаня",
      lastMessage: "Привет, землячок! Как дела в тайге? 🐻",
      time: "15:42",
      avatar: "🐻",
      status: "онлайн",
      unread: 3,
      messages: [
        { id: 1, sender: "Мишаня", text: "Как дела, друг? Готов к приключениям?", time: "15:40", isMine: false, avatar: "🐻" },
        { id: 2, sender: "Я", text: "Привет, Мишаня! Всё отлично, готовлюсь к походу", time: "15:41", isMine: true, avatar: "🚀" },
        { id: 3, sender: "Мишаня", text: "Привет, землячок! Как дела в тайге? 🐻", time: "15:42", isMine: false, avatar: "🐻" }
      ]
    },
    {
      id: 2,
      name: "Шаман",
      lastMessage: "Завтра будет ясно, -18°C. Одевайся теплее! ❄️",
      time: "14:35",
      avatar: "🦉",
      status: "в тайге",
      unread: 1,
      messages: [
        { id: 1, sender: "Шаман", text: "Здорово! Нужен прогноз погоды?", time: "14:30", isMine: false, avatar: "🦉" },
        { id: 2, sender: "Я", text: "Да, на завтра пожалуйста", time: "14:33", isMine: true, avatar: "🚀" },
        { id: 3, sender: "Шаман", text: "Завтра будет ясно, -18°C. Одевайся теплее! ❄️", time: "14:35", isMine: false, avatar: "🦉" }
      ]
    },
    {
      id: 3,
      name: "Таёжный",
      lastMessage: "Нашёл отличное место для рыбалки! 🎣",
      time: "12:15",
      avatar: "🦌",
      status: "оффлайн",
      unread: 0,
      messages: [
        { id: 1, sender: "Таёжный", text: "Эй, рыбак! Хочешь секретное место?", time: "12:10", isMine: false, avatar: "🦌" },
        { id: 2, sender: "Я", text: "Конечно! Где это?", time: "12:12", isMine: true, avatar: "🚀" },
        { id: 3, sender: "Таёжный", text: "Нашёл отличное место для рыбалки! 🎣", time: "12:15", isMine: false, avatar: "🦌" }
      ]
    }
  ]

  // Групповые чаты (Стойбища)
  const groupChats = [
    {
      id: 1,
      name: "Стойбище \"Охотники\"",
      lastMessage: "Кто знает хорошие места возле Томска?",
      time: "16:20",
      avatar: "🏕️",
      members: 24,
      unread: 5,
      messages: [
        { id: 1, sender: "Степан", text: "Кто-нибудь был на Оби недавно?", time: "16:15", isMine: false, avatar: "🎯" },
        { id: 2, sender: "Анна", text: "Да, вчера был. Рыба клюёт хорошо!", time: "16:18", isMine: false, avatar: "🎣" },
        { id: 3, sender: "Михаил", text: "Кто знает хорошие места возле Томска?", time: "16:20", isMine: false, avatar: "🗺️" }
      ]
    },
    {
      id: 2,
      name: "Рыбаки Байкала",
      lastMessage: "Завтра встречаемся у причала в 6:00",
      time: "15:45",
      avatar: "🐟",
      members: 15,
      unread: 2,
      messages: [
        { id: 1, sender: "Капитан", text: "Погода отличная для рыбалки!", time: "15:40", isMine: false, avatar: "⚓" },
        { id: 2, sender: "Я", text: "Буду обязательно!", time: "15:43", isMine: true, avatar: "🚀" },
        { id: 3, sender: "Капитан", text: "Завтра встречаемся у причала в 6:00", time: "15:45", isMine: false, avatar: "⚓" }
      ]
    }
  ]

  // Каналы (Кочевые тропы)
  const channels = [
    {
      id: 1,
      name: "Канал \"Байкал\"",
      lastMessage: "Температура воды: +4°C. Осторожно на льду!",
      time: "18:00",
      avatar: "🌊",
      subscribers: 1247,
      unread: 0,
      messages: [
        { id: 1, sender: "Администратор", text: "Ежедневный отчёт о состоянии Байкала", time: "17:55", isMine: false, avatar: "📋" },
        { id: 2, sender: "Администратор", text: "Видимость: отличная, ветер: 5 м/с", time: "17:58", isMine: false, avatar: "📋" },
        { id: 3, sender: "Администратор", text: "Температура воды: +4°C. Осторожно на льду!", time: "18:00", isMine: false, avatar: "📋" }
      ]
    }
  ]

  const getCurrentChats = () => {
    switch(selectedChatType) {
      case 'groups': return groupChats
      case 'channels': return channels
      default: return personalChats
    }
  }

  const getCurrentMessages = () => {
    const chats = getCurrentChats()
    return chats[selectedChat]?.messages || []
  }

  const getCurrentChatInfo = () => {
    const chats = getCurrentChats()
    return chats[selectedChat]
  }

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const chatInfo = getCurrentChatInfo()
      const newMessage = {
        id: Date.now(),
        sender: "Я",
        text: messageText,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        isMine: true,
        avatar: "🚀"
      }

      // Имитация ответа в зависимости от типа чата
      setTimeout(() => {
        let response = ""
        let avatar = ""
        let sender = ""

        if (selectedChatType === 'personal') {
          if (chatInfo?.name === "Мишаня") {
            response = "Отлично! Мишаня всегда готов помочь! 🐻"
            avatar = "🐻"
            sender = "Мишаня"
          } else if (chatInfo?.name === "Шаман") {
            response = "Духи тайги говорят: всё будет хорошо! 🦉"
            avatar = "🦉"
            sender = "Шаман"
          }
        } else if (selectedChatType === 'groups') {
          response = "Кто-то из стойбища ответил: классная идея!"
          avatar = "🏕️"
          sender = "Участник"
        } else {
          response = "Администратор: спасибо за ваш комментарий"
          avatar = "📋"
          sender = "Администратор"
        }

        const responseMessage = {
          id: Date.now() + 1,
          sender,
          text: response,
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
          isMine: false,
          avatar
        }

        // В реальном приложении здесь была бы отправка сообщения через WebSocket
        console.log('Новое сообщение:', newMessage)
        console.log('Ответ:', responseMessage)
      }, 1000)

      setMessageText('')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Заголовок приложения */}
      <header className="bg-gradient-to-r from-primary via-primary/90 to-accent p-6 text-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="text-4xl">❄️</div>
                <div className="absolute -top-1 -right-1 text-lg">🌐</div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">UniSib</h1>
                <p className="text-blue-100 text-sm">Гибрид UniMessage + SibCHAT</p>
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
            <Tabs value={selectedChatType} onValueChange={setSelectedChatType} className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Личные</TabsTrigger>
                <TabsTrigger value="groups">Стойбища</TabsTrigger>
                <TabsTrigger value="channels">Тропы</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="flex-1 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Персонажи</h2>
                  <Button size="sm" variant="outline">
                    <Icon name="Plus" size={16} />
                  </Button>
                </div>
                <ScrollArea className="h-[450px]">
                  <div className="space-y-2">
                    {personalChats.map((chat, index) => (
                      <ChatCard key={chat.id} chat={chat} index={index} selectedChat={selectedChat} setSelectedChat={setSelectedChat} taiGaMode={taiGaMode} />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="groups" className="flex-1 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Стойбища</h2>
                  <Button size="sm" variant="outline">
                    <Icon name="Plus" size={16} />
                  </Button>
                </div>
                <ScrollArea className="h-[450px]">
                  <div className="space-y-2">
                    {groupChats.map((chat, index) => (
                      <ChatCard key={chat.id} chat={chat} index={index} selectedChat={selectedChat} setSelectedChat={setSelectedChat} taiGaMode={taiGaMode} showMembers />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="channels" className="flex-1 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Кочевые тропы</h2>
                  <Button size="sm" variant="outline">
                    <Icon name="Plus" size={16} />
                  </Button>
                </div>
                <ScrollArea className="h-[450px]">
                  <div className="space-y-2">
                    {channels.map((chat, index) => (
                      <ChatCard key={chat.id} chat={chat} index={index} selectedChat={selectedChat} setSelectedChat={setSelectedChat} taiGaMode={taiGaMode} showSubscribers />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Основная область чата */}
          <Card className="lg:col-span-2 flex flex-col">
            <ChatHeader chatInfo={getCurrentChatInfo()} selectedChatType={selectedChatType} />
            <ChatMessages messages={getCurrentMessages()} taiGaMode={taiGaMode} />
            <ChatInput 
              messageText={messageText}
              setMessageText={setMessageText}
              handleSendMessage={handleSendMessage}
              isOfflineMode={isOfflineMode}
              taiGaMode={taiGaMode}
            />
          </Card>
        </div>

        {/* Панель с персонажами и функциями */}
        <Card className="mt-6 p-6">
          <h3 className="text-lg font-semibold mb-4">🚀 Команда UniSib Messenger</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <div className="text-3xl">🐻</div>
              <div className="text-center">
                <div className="font-medium">Мишаня</div>
                <div className="text-xs text-muted-foreground">Главный маскот</div>
              </div>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <div className="text-3xl">🦌</div>
              <div className="text-center">
                <div className="font-medium">Соболь-курьер</div>
                <div className="text-xs text-muted-foreground">Быстрая доставка</div>
              </div>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <div className="text-3xl">🐺</div>
              <div className="text-center">
                <div className="font-medium">Хаски-стример</div>
                <div className="text-xs text-muted-foreground">Для геймеров</div>
              </div>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <div className="text-3xl">🦭</div>
              <div className="text-center">
                <div className="font-medium">Нерпа-эмодзи</div>
                <div className="text-xs text-muted-foreground">Для романтиков</div>
              </div>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <div className="text-3xl">🦉</div>
              <div className="text-center">
                <div className="font-medium">Шаман-айтишник</div>
                <div className="text-xs text-muted-foreground">Защита данных</div>
              </div>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={() => setIsOfflineMode(!isOfflineMode)}
            >
              <Icon name={isOfflineMode ? "WifiOff" : "Wifi"} size={24} />
              <div className="text-center">
                <div className="font-medium">Офлайн-режим "Тайга"</div>
                <div className="text-xs text-muted-foreground">
                  {isOfflineMode ? "Включён" : "Выключен"}
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Icon name="Palette" size={24} />
              <div className="text-center">
                <div className="font-medium">Гибридные темы</div>
                <div className="text-xs text-muted-foreground">UniMessage + Сибирь</div>
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
              <Icon name="Globe" size={24} />
              <div className="text-center">
                <div className="font-medium">Кроссплатформенность</div>
                <div className="text-xs text-muted-foreground">Web, Mobile, Desktop</div>
              </div>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

// Компонент карточки чата
function ChatCard({ chat, index, selectedChat, setSelectedChat, taiGaMode, showMembers = false, showSubscribers = false }) {
  return (
    <Card 
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
            {showMembers && (
              <span className="text-xs text-muted-foreground">👥 {chat.members} участников</span>
            )}
            {showSubscribers && (
              <span className="text-xs text-muted-foreground">📢 {chat.subscribers} подписчиков</span>
            )}
            {!showMembers && !showSubscribers && (
              <>
                <div className={`w-2 h-2 rounded-full ${
                  chat.status === 'онлайн' ? 'bg-green-500' : 
                  chat.status === 'в тайге' ? 'bg-orange-500' : 'bg-gray-400'
                }`} />
                <span className="text-xs text-muted-foreground">{chat.status}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

// Компонент заголовка чата
function ChatHeader({ chatInfo, selectedChatType }) {
  if (!chatInfo) return null
  
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback className="text-lg">{chatInfo.avatar}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{chatInfo.name}</h3>
          <p className="text-sm text-muted-foreground">
            {selectedChatType === 'groups' && `${chatInfo.members} участников`}
            {selectedChatType === 'channels' && `${chatInfo.subscribers} подписчиков`}
            {selectedChatType === 'personal' && chatInfo.status}
          </p>
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
  )
}

// Компонент сообщений
function ChatMessages({ messages, taiGaMode }) {
  return (
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
              Режим "Тайга" активен - только текст и сжатые изображения
            </Badge>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}

// Компонент ввода сообщений
function ChatInput({ messageText, setMessageText, handleSendMessage, isOfflineMode, taiGaMode }) {
  return (
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
  )
}