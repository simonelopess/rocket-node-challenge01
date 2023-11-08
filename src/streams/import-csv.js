import {  parse } from 'csv-parse';
import fs from 'fs';

const csvPath = new URL('./tasks.csv', import.meta.url);

const stream = fs.createReadStream(csvPath);

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2, // skip the header line
});

async function run() {
  try {
    const linesParse = stream.pipe(csvParse);

    for await (const line of linesParse) {
      const [title, description] = line;

      const response = await fetch('http://localhost:3333/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (response.ok) {
        console.log('Data sent successfully:', title, description);
      } else {
        console.error('Failed to send data:', title, description);
      }
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

run();

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
