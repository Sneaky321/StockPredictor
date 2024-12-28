import OpenAI from 'openai';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: `${request.method} method not allowed.` }), { status: 405, headers: corsHeaders })
    }

    const openai = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
      baseURL: 'https://gateway.ai.https://gateway.ai.cloudflare.com/v1/21984bfb3469c3f019eafca9a8f3a20b/api-worker/openai.com/v1/f7b11d15150c689023ba013018d77a0d/api-worker/openai'
    });

    try {
      const messages = await request.json()
      const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 1.1,
        presence_penalty: 0,
        frequency_penalty: 0
      });
      const response = chatCompletion.choices[0].message;

      return new Response(JSON.stringify(response), { headers: corsHeaders });
    } catch (e) {
      return new Response(e, { headers: corsHeaders }), { status: 500, headers: corsHeaders };
    }
  },
};