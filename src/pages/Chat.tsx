import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { MessageCircle, Send, Paperclip, Smile, Reply, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Avatar } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Message, parseMessage } from "@/types/chat";

const Chat = () => {
  const { connectionId } = useParams();
  const { session } = useSessionContext();
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: messages = [], refetch: refetchMessages } = useQuery({
    queryKey: ["messages", connectionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("connection_id", connectionId)
        .order("created_at", { ascending: true });

      if (error) {
        toast({
          title: "Error loading messages",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      // Mark messages as read
      const unreadMessages = data.filter(
        (msg) => !msg.read_status && msg.sender_id !== session?.user?.id
      );
      
      if (unreadMessages.length > 0) {
        await Promise.all(
          unreadMessages.map((msg) =>
            supabase
              .from("chat_messages")
              .update({ read_status: true })
              .eq("id", msg.id)
          )
        );
      }

      return data.map(parseMessage);
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel("chat-messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chat_messages",
          filter: `connection_id=eq.${connectionId}`,
        },
        (payload) => {
          refetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [connectionId, refetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSendMessage = async () => {
    if ((!newMessage.trim() && !selectedFile) || !session?.user?.id) return;

    try {
      let attachments = [];

      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const filePath = `${session.user.id}/${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('chat-attachments')
          .upload(filePath, selectedFile);

        if (uploadError) throw uploadError;

        attachments = [{
          path: filePath,
          type: selectedFile.type,
          name: selectedFile.name
        }];
      }

      const messageData = {
        connection_id: connectionId,
        sender_id: session.user.id,
        content: newMessage.trim(),
        parent_message_id: replyingTo?.id || null,
        attachments
      };

      if (editingMessage) {
        const { error } = await supabase
          .from("chat_messages")
          .update({
            content: newMessage.trim(),
            is_edited: true,
            edited_at: new Date().toISOString(),
          })
          .eq("id", editingMessage.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("chat_messages")
          .insert(messageData);

        if (error) throw error;
      }

      setNewMessage("");
      setSelectedFile(null);
      setReplyingTo(null);
      setEditingMessage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error: any) {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleReaction = async (messageId: string, emoji: string) => {
    try {
      const message = messages.find((m) => m.id === messageId);
      if (!message || !session?.user?.id) return;

      const reactions = { ...message.reactions };
      const userReactions = reactions[emoji] || [];

      if (userReactions.includes(session.user.id)) {
        reactions[emoji] = userReactions.filter((id) => id !== session.user.id);
        if (reactions[emoji].length === 0) {
          delete reactions[emoji];
        }
      } else {
        reactions[emoji] = [...userReactions, session.user.id];
      }

      const { error } = await supabase
        .from("chat_messages")
        .update({ reactions })
        .eq("id", messageId);

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error adding reaction",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from("chat_messages")
        .delete()
        .eq("id", messageId);

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error deleting message",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTyping = () => {
    setIsTyping(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender_id === session?.user?.id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender_id === session?.user?.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {message.parent_message_id && (
                <div className="text-sm opacity-75 mb-2 border-l-2 pl-2">
                  {messages.find((m) => m.id === message.parent_message_id)?.content}
                </div>
              )}
              <p className="whitespace-pre-wrap break-words">{message.content}</p>
              
              {message.attachments?.map((attachment, index) => (
                <div key={index} className="mt-2">
                  {attachment.type.startsWith('image/') ? (
                    <img
                      src={`${supabase.storage.from('chat-attachments').getPublicUrl(attachment.path).data.publicUrl}`}
                      alt={attachment.name}
                      className="max-w-full rounded"
                    />
                  ) : (
                    <a
                      href={`${supabase.storage.from('chat-attachments').getPublicUrl(attachment.path).data.publicUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline"
                    >
                      {attachment.name}
                    </a>
                  )}
                </div>
              ))}

              <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                <span>
                  {new Date(message.created_at).toLocaleTimeString()}
                  {message.is_edited && " (edited)"}
                </span>
                <div className="flex items-center gap-2">
                  {message.read_status && message.sender_id === session?.user?.id && (
                    <span>✓✓</span>
                  )}
                  {message.delivered_at && message.sender_id === session?.user?.id && (
                    <span>✓</span>
                  )}
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyingTo(message)}
                >
                  <Reply className="h-4 w-4" />
                </Button>
                {message.sender_id === session?.user?.id && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingMessage(message);
                        setNewMessage(message.content);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteMessage(message.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </>
                )}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-2">
                    <div className="grid grid-cols-6 gap-2">
                      {["👍", "❤️", "😊", "😂", "😮", "😢"].map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => handleReaction(message.id, emoji)}
                          className="p-2 hover:bg-gray-100 rounded"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {Object.entries(message.reactions || {}).map(([emoji, users]) => (
                <div key={emoji} className="inline-flex items-center gap-1 mt-2 mr-2 bg-gray-100 rounded px-2 py-1">
                  <span>{emoji}</span>
                  <span className="text-xs">{users.length}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {replyingTo && (
        <div className="bg-gray-100 p-2 flex justify-between items-center">
          <span className="text-sm">
            Replying to: {replyingTo.content.substring(0, 50)}...
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setReplyingTo(null)}
          >
            ✕
          </Button>
        </div>
      )}

      {editingMessage && (
        <div className="bg-gray-100 p-2 flex justify-between items-center">
          <span className="text-sm">Editing message</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setEditingMessage(null);
              setNewMessage("");
            }}
          >
            ✕
          </Button>
        </div>
      )}

      <div className="border-t bg-white p-4">
        <div className="flex gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Textarea
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            onKeyDown={handleKeyPress}
            placeholder={editingMessage ? "Edit your message..." : "Type a message..."}
            className="min-h-[60px]"
          />
          <Button
            onClick={handleSendMessage}
            className="self-end"
            disabled={!newMessage.trim() && !selectedFile}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {selectedFile && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-gray-500">{selectedFile.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedFile(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
            >
              ✕
            </Button>
          </div>
        )}
        {isTyping && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
            <MessageCircle className="h-4 w-4 animate-pulse" />
            <span>Someone is typing...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
