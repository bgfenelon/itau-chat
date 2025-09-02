export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  model?: string;
  finishReason?: string;
};

/**
 * Salva histórico de mensagens no localStorage por userId
 */
export function saveMessages(userId: string, messages: Message[]) {
  try {
    localStorage.setItem(`chatHistory_${userId}`, JSON.stringify(messages));
  } catch (err) {
    console.error("Erro ao salvar mensagens:", err);
  }
}

/**
 * Carrega histórico de mensagens do localStorage por userId
 */
export function loadMessages(userId: string): Message[] {
  try {
    const data = localStorage.getItem(`chatHistory_${userId}`);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Erro ao carregar mensagens:", err);
    return [];
  }
}
