const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event, context) => {
  // 환경변수에서 키를 가져옵니다 (잠시 후 Netlify 설정에서 등록)
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const data = JSON.parse(event.body);
    const result = await model.generateContent(data.prompt);
    const response = await result.response;
    
    return {
      statusCode: 200,
      body: JSON.stringify({ text: response.text() }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
