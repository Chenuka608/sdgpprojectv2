import React, {useState} from 'react';

function MainBox(){
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {
            sender: "Internova",
            message: ""
        }
    ]);

    const handleChange = (event)=>{
        setInput(event.target.value)
    }

    const handleSend = async (event)=>{
        event.preventDefault()
        const newMessage = {
            message: input,
            sender: "user"
        }

        const newMessages = [...messages,newMessage];

        setMessages(newMessages);

        setInput('');

        await processMessageToChatGPT(newMessages);
    }

    async function processMessageToChatGPT(chatMessages){
        const API_KEY = "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"
        let apiMessages = chatMessages.map((messageObject)=>{
            let role="";
            if(messageObject.sender === "Internova"){
                role = "assistant"
            }else{
                role = "user"
            }
            return (
                {role: role, content: messageObject.message}
            )
        });

        const systemMessage = {
            role: "system",
            content: "Explain errors like i am 10 year old"
        }

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions",{
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            console.log(data.choices[0].message.content);
            setMessages(
                [
                    ...chatMessages,
                    {
                        message: data.choices[0].message.content,
                        sender: "Internova"
                    }
                ]
            )
        })
    }

    return (
        <div className="container">
			<div className="response-area">
                {messages.map((message, index) => {
                    return(
                        <div style={{ padding: "10px" }} className={message.sender==="Internova" ? 'gpt-message message' : 'user-message message'}>
                            {message.message}
                        </div>
                    );
                })}
            </div>
            <br></br>
			<div className="prompt-area">
				<textarea class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                type="text" placeholder="Enter your Java code here" 
                style={{ height: "268px" }}
                value={input} onChange={handleChange}/>
                <br></br>
				<button className="text-sm font-semibold px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50" type="submit" onClick={handleSend}>Feedback</button>
			</div>
		</div>
    );
}

export default MainBox;
