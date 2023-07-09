import axios from 'axios';
const {apiKey} = require('../constants');
const client = axios.create({
    headers:{
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    }
})

const chatGptEndpoint = 'https://api.openai.com/v1/chat/completions'
const dalleEndpoint = 'https://api.openai.com/v1/images/generations'

export const apiCall=async(prompt,messages)=>{
    prompt=prompt.toLowerCase();
    if(prompt.includes('art') || prompt.includes('image') || prompt.includes('picture') || prompt.includes('drawing') || prompt.includes('sketch')  ){
        // console.log('delle api call');
        return dalleApiCall(prompt,messages || []);
    }
    else{
        // console.log('chatgpt api call')
        return chatgptApiCall(prompt,messages || []);
    }
}


const chatgptApiCall=async(prompt,messages)=>{
    // console.log(messages);
    try {
        
        const res= await client.post(chatGptEndpoint,{
            model: "gpt-3.5-turbo",
            messages
        })  

        let answer=res.data?.choices[0]?.message?.content;
        messages.push({ role: 'assistant', content: answer.trim() })
        return Promise.resolve({success:true,data:messages})


    } catch (error) {
        console.log('error',error);
        return Promise.resolve({success:false,msg:error.message})
        
    }
}

const dalleApiCall=async(prompt,messages)=>{
    try {
        const res= await client.post(dalleEndpoint,{
            prompt,
            "n":1,
            "size":"512x512",

        })
        let url=res?.data?.data[0]?.url;
        // console.log('url',url);
        messages.push({ role: 'assistant', content: url })
        return Promise.resolve({success:true,data:messages})

    } catch (error) {
        console.log('error',error);
        return Promise.resolve({success:false,msg:error.message})
        
    }
}
