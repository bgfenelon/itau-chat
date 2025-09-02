# itau-chat
Um chat interativo integrado à API da GroqCloud, com histórico de conversas persistido no localStorage para fácil recuperação e continuidade.
Suporta a exibição de metadados detalhados, como o modelo de IA utilizado e o timestamp de cada mensagem, proporcionando maior contexto durante as interações.

<img width="1122" height="808" alt="image" src="https://github.com/user-attachments/assets/2feb9c0e-60c9-49df-819c-46e24b3cae62" />


# Funcionalidades
- Envio de mensagens para a API da GroqCloud
- Respostas em tempo real
- Histórico local persistente por userId (usando localStorage)
- Exibição de metadados:
-   Modelo utilizado
-   Data/hora (timestamp) de cada mensagem
-   Efeito de "digitando..." com animação
- Estilização com styled-components

# Tecnologias
- React 18+
- Styled-components
- GroqCloud API
- Material-UI

# Instalação
Clone o repositório e instale as dependências:
```bash
git clone https://github.com/seu-usuario/itau-chat.git
cd chat-groq
npm install
```

Execução:

```bash
npm run dev
```
Acesse o link: http://localhost:3000/ChatItau
