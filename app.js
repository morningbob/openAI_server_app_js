
const http = require('http')
const express = require('express')
require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai')

const app = express()

app.use(express.json())

const configuration = new Configuration({
    organization: process.env.ORG_ID,
    apiKey: process.env.OPEN_AI_KEY
    
})

const openai = new OpenAIApi(configuration)

app.get("/completions", async (req, res) => {
    res.set('Authorization', `Bearer ${process.env.OPEN_AI_KEY}`)
    res.set('Content-Type', 'application/json')

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "hello there",
            // the randomness
            temperature: 0, 
            max_tokens: 20
        })
        return res.status(200).json({
            success: true,
            data: response.data.choices[0].text
        })

    } catch (error) {
        console.log(`there is error in sending the request ${error}`)
    }
})

const port = process.env.PORT || 5500

app.listen(port, () => console.log(`server is listening on port ${port}`))