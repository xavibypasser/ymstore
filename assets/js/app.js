let chatOpen = false;

function toggleChat() {
  chatOpen = !chatOpen;
  const chatBox = document.getElementById('chat-box');
  chatBox.style.display = chatOpen ? 'block' : 'none';
}

function sendMessage(event) {
  if (event.key === 'Enter') {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (message) {
      // Add message to chat log
      const chatLog = document.getElementById('chat-log');
      const newMessage = document.createElement('div');
      newMessage.classList.add('user-message');
      newMessage.textContent = message;
      chatLog.appendChild(newMessage);
      input.value = '';

      // Call the backend (xAI or other service) to handle the message
      handleAIResponse(message);
    }
  }
}

async function handleAIResponse(message) {
  // This is where you'll integrate with your xAI API or any other backend API.
  const response = await fetch('/api/chat', { // You need to create this endpoint
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  const chatLog = document.getElementById('chat-log');
  
  // Add AI response to chat log
  const aiMessage = document.createElement('div');
  aiMessage.classList.add('ai-message');
  aiMessage.textContent = data.reply; // Assuming `data.reply` contains the AI's response
  chatLog.appendChild(aiMessage);
}
