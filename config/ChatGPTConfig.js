import { Configuration, OpenAIApi } from 'openai'

class ChatGPT{

    #openai = null;
    constructor(){
        this.config = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
            organization: process.env.OPENAI_ORGANIZATION
        })
        this.#openai = new OpenAIApi(this.config)
    }

    async listEngines()
    {
        return await this.#openai.listEngines()
    }

    async sendMessage(prompt){
        const request = {
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 500,
            temperature: 0,
        }

        const result = await this.#openai.createCompletion(request)
        return result.data
    }
}

export default ChatGPT