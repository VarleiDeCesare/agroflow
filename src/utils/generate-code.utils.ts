export default function generateCode(length: number): string {
  let multiplierString = '9';
  let summingString = '1';

  for (let i = 0; i < length - 1; i++) {
    multiplierString += '0';
    summingString += '0';
  }

  const multiplier = Number(multiplierString);
  const summing = Number(summingString);

  return Math.floor(summing + Math.random() * multiplier).toString();
}
