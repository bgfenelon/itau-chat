import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatGroq() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  async function sendPrompt() {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setStreaming("");

    try {
      const response = await fetch("/api/groq-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        setStreaming(buffer);
      }

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: buffer },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: "Erro ao gerar resposta." },
      ]);
    } finally {
      setLoading(false);
      setStreaming("");
    }
  }

  return (
    <Paper
      elevation={3}
      sx={{ display: "flex", flexDirection: "column", width: 500, height: 600, margin: "auto", borderRadius: 2, overflow: "hidden" }}
    >
      <Box sx={{ p: 2, bgcolor: "grey.100", borderBottom: "1px solid", borderColor: "grey.300" }}>
        <Typography variant="subtitle1" fontWeight="bold">Chat GroqCloud</Typography>
      </Box>

      <Box sx={{ flex: 1, p: 2, overflowY: "auto", bgcolor: "grey.50" }}>
        {messages.map((msg) => (
          <Box key={msg.id} display="flex" justifyContent={msg.role === "user" ? "flex-end" : "flex-start"} mb={2}>
            {msg.role === "assistant" && <Avatar sx={{ bgcolor: "grey.300", mr: 1 }}>🤖</Avatar>}
            <Paper sx={{ p: 1.5, maxWidth: 350, bgcolor: msg.role === "user" ? "primary.main" : "background.paper", color: msg.role === "user" ? "white" : "text.primary" }}>
              <Typography variant="body2">{msg.content}</Typography>
            </Paper>
            {msg.role === "user" && <Avatar sx={{ bgcolor: "primary.main", ml: 1 }}>👤</Avatar>}
          </Box>
        ))}

        {/* Streaming em tempo real */}
        {streaming && (
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: "grey.300", mr: 1 }}>🤖</Avatar>
            <Paper sx={{ p: 1.5, maxWidth: 350 }}>
              <Typography variant="body2">{streaming}</Typography>
            </Paper>
          </Box>
        )}
        <div ref={endRef} />
      </Box>

      <Box sx={{ p: 2, borderTop: "1px solid", borderColor: "grey.300", bgcolor: "white" }}>
        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendPrompt(); } }}
          />
          <Button variant="contained" color="primary" onClick={sendPrompt} disabled={!input.trim() || loading}>
            {loading ? <CircularProgress size={18} color="inherit" /> : "Enviar"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
