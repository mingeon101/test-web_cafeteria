exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    // Netlify 환경변수에 저장된 키를 브라우저로 전송
    body: JSON.stringify({ apiKey: process.env.GEMINI_API_KEY }),
  };
};
