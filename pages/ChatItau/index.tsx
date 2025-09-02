import React, { useState, useRef, useEffect } from "react";
import { TextField, Button, Avatar, CircularProgress } from "@mui/material";
import {
  ChatContainer,
  ChatHeader,
  ChatBody,
  ChatFooter,
  MessageRow,
  MessageBubble,
  HeaderTitle,
  MetaData,
} from "./styled";

import { saveMessages, loadMessages, Message } from "../../utils/chatStorage";

const USER_ID = "user1"; // Pode gerar dinamicamente ou usar autenticação

export default function ChatItau() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  // Carrega histórico do localStorage ao iniciar
  useEffect(() => {
    const savedMessages = loadMessages(USER_ID);
    setMessages(savedMessages);
  }, []);

  // Salva histórico e scrolla para baixo sempre que mensagens mudam
  useEffect(() => {
    saveMessages(USER_ID, messages);
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendPrompt = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/groq-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.message || "Sem resposta",
        timestamp: Date.now(),
        model: data.model,
        finishReason: data.finish_reason,
      };

      // efeito de "digitando"
      let tempContent = "";
      const chars = assistantMessage.content.split("");
      for (let i = 0; i < chars.length; i++) {
        tempContent += chars[i];
        setMessages(prev => [
          ...prev.filter(m => m.id !== assistantMessage.id),
          { ...assistantMessage, content: tempContent },
        ]);
        await new Promise(r => setTimeout(r, 15));
      }

      setMessages(prev => [...prev.filter(m => m.id !== assistantMessage.id), assistantMessage]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Erro ao gerar resposta",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <HeaderTitle variant="h6">Chat Itaú</HeaderTitle>
      </ChatHeader>

      <ChatBody>
        {messages.map(msg => (
          <MessageRow key={msg.id} justify={msg.role === "user" ? "flex-end" : "flex-start"}>
            {msg.role === "assistant" && <Avatar style={{ marginRight: 8, background:"transparent" }}>🤖</Avatar>}
            <div>
              <MessageBubble isUser={msg.role === "user"}>{msg.content}</MessageBubble>
              <MetaData>
                {msg.model ? `Modelo: ${msg.model} • ` : ""}
                {msg.finishReason ? `Status: ${msg.finishReason} • ` : ""}
                {new Date(msg.timestamp).toLocaleString()}
              </MetaData>
            </div>
            {msg.role === "user" && <Avatar style={{ marginLeft: 8, background:"transparent" }}>👤</Avatar>}
          </MessageRow>
        ))}
        <div ref={endRef} />
      </ChatBody>

      <ChatFooter>
        <div style={{ display: "flex", gap: 8 }}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendPrompt();
              }
            }}
          />
          <Button variant="contained" color="primary" onClick={sendPrompt} disabled={loading} style={{background:"#d25f22ff"}}>
            {loading ? <CircularProgress size={18} color="inherit" /> : "Enviar"}
          </Button>
        </div>
      </ChatFooter>
    </ChatContainer>
  );
}
