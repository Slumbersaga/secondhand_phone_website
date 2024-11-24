    // Toggle the sidebar chat
    function toggleChat() {
        const chatSidebar = document.getElementById('chatSidebar');
        chatSidebar.classList.toggle('show');
    }
    
    // Send a message to the AI and get a response
    async function sendMessage() {
        const userInput = document.getElementById('user-input').value.trim();
        if (!userInput) return;
    
        const chatWindow = document.getElementById('chat-window');
        chatWindow.innerHTML += `<div class="text-end mb-2"><b>You:</b> ${userInput}</div>`;
    
        // Show typing indicator
        chatWindow.innerHTML += `<div class="text-start mb-2" id="loading-indicator"><i>AI is typing...</i></div>`;
        chatWindow.scrollTop = chatWindow.scrollHeight;
    
        try {
            // Call the AI backend
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_API_KEY'
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "You are an AI assistant specializing in second-hand phone sales. Help users with buying and selling advice, product details, and pricing." },
                        { role: "user", content: userInput }
                    ]
                })
            });
    
            const data = await response.json();
            const reply = data.choices[0].message.content;
    
            // Add AI's response to the chat
            document.getElementById('loading-indicator').remove();
            chatWindow.innerHTML += `<div class="text-start mb-2"><b>AI:</b> ${reply}</div>`;
        } catch (error) {
            document.getElementById('loading-indicator').remove();
            chatWindow.innerHTML += `<div class="text-start mb-2 text-danger"><b>AI:</b> Something went wrong. Please try again later.</div>`;
        }
    
        chatWindow.scrollTop = chatWindow.scrollHeight;
        document.getElementById('user-input').value = '';
    }
    