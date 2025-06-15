export default async function handler(req, res) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    console.log("OpenAI Response:", data);

    const reply = data.choices && data.choices.length > 0
      ? data.choices[0].message.content
      : "AI did not return a valid response.";

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Error in AI API:", error);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
}
