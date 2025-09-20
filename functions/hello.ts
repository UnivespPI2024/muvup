// functions/hello.ts
import { Handler } from '@netlify/functions';

const handler: Handler = async (_event:any, _context:any) => {
  console.log('Hello Function foi chamada!');
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Olá do Netlify Functions!' }),
  };
};

export { handler };