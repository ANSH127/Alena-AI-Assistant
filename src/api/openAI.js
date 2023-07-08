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
    try {
        const res= await client.post(chatGptEndpoint,{
            model: "gpt-3.5-turbo",
            messages:[{
                role:'user',
                content: `Does this message want to generate an AI picture, image, art or anything similar? ${prompt} . Simply answer with a yes or no.`


            }]
        })
        // console.log('res',res.data.choices[0].message);
        let isArt=res.data?.choices[0]?.message?.content;
        if(isArt.toLowerCase().includes('yes')){
            // generate art
            // console.log('delle api call');
            return dalleApiCall(prompt,messages || []);
        }
        else{
            // chat
            // console.log('chatgpt api call')
            // console.log('prompt',prompt);
            // console.log(messages);
            
            return chatgptApiCall(prompt,messages || []);
        }



        
    } catch (error) {
        console.log('error',error);
        return Promise.resolve({success:false,msg:error.message})
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
