import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try {
    const { name, feeling, rant } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;

    const prompt = `The person named ${name} is feeling ${feeling}. They shared: "${rant}". Provide a supportive message directly to ${name} read the instructions carefully about the format of response and avoid making sure that you followed the instructions. Instructions: Response should be a concise within 150 words and put this "You got this! ❤️" after the empathetic paragraph. Avoid adding anything other than the text and only one special character ❤️.`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        prompt,
        max_tokens: 150, // Limit to ensure a focused response
        model: 'meta-llama/llama-3.1-8b-instruct:free',
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    let compliment = response.data.choices[0].text.trim();

    // Clean up the response to remove any meta-comments or unnecessary explanations
    const unnecessaryPhrases = [
      "I crafted this message",
      "Is this response appropriate",
      "The goal of this message",
      "Let me know if you",
      "I'm here to help",
      "This message was",
      "Click below",
      "This response",
      "Feel free to ask for",
      "Please let me know"
    ];
    
    unnecessaryPhrases.forEach(phrase => {
      compliment = compliment.replace(phrase, '').trim();
    });

    // Ensure the response is well-structured and free of redundant content
    const sentences = compliment.split('.').map(sentence => sentence.trim());
    const filteredSentences = sentences.filter(sentence => sentence.length > 0 && !sentence.startsWith("I "));
    compliment = filteredSentences.join('. ') + '.';

    return NextResponse.json({ compliment });
  } catch (error) {
    console.error('Request Handling Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
