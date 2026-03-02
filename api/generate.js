import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { topic, style, length } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "你是专业演讲稿写作专家，结构清晰，表达有感染力。"
        },
        {
          role: "user",
          content: `请写一篇演讲稿。
主题：${topic}
风格：${style}
字数：${length}`
        }
      ],
      temperature: 0.8
    });

    return res.status(200).json({
      text: completion.choices[0].message.content
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
