// netlify/functions/get-key.js
//
// 클라이언트(HTML/JS)는 이 함수를 통해서만 Gemini API 키를 받아옵니다.
// 실제 키는 Netlify 사이트의 환경변수(GEMINI_API_KEY)에만 저장되고,
// 소스코드나 브라우저에는 절대 직접 노출되지 않습니다.

exports.handler = async function (event) {
  // GET 요청만 허용
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // 환경변수가 아직 설정되지 않은 경우, 원인을 바로 알 수 있도록 명확한 에러를 반환
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error:
          "GEMINI_API_KEY 환경변수가 설정되어 있지 않습니다. Netlify 사이트 설정 > Environment variables에서 추가한 뒤 다시 배포(redeploy)해주세요.",
      }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      // 이 함수는 우리 앱 프론트엔드에서만 호출하므로 캐시되지 않도록 처리
      "Cache-Control": "no-store",
    },
    body: JSON.stringify({ apiKey }),
  };
};
