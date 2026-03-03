export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { topic, style, length } = req.body;

    const response = await fetch(
      "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.DASHSCOPE_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "qwen-plus",
          input: {
            messages: [
              {
                role: "system",
                content: "你是专业演讲稿写作专家，表达有感染力，结构清晰。"
              },
              {
                role: "user",
                content: `请写一篇演讲稿。
主题：${topic}
风格：${style}
字数：${length}`
              }
            ]
          },
          parameters: {
            temperature: 0.8
          }
        })
      }
    );

    const data = await response.json();

    return res.status(200).json({
      text: data.output.text
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
