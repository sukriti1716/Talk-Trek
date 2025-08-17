const {GoogleGenerativeAI}=require('@google/generative-ai')

const genAI=new GoogleGenerativeAI(process.env.genai_key)

const model=genAI.getGenerativeModel({model:"gemini-1.5-flash"})

module.exports.getans=async(req,res)=>{
    let {message}=req.body

    const result=await model.generateContent(message)
    const response=await result.response
    const text=response.text()

    res.status(200).json({
        success:"true",
        text
    })

}