export default function cutPercentSides(number: number, cutPercent: number) {
  return number < cutPercent
    ? number + cutPercent
    : number > 100 - cutPercent
    ? number - cutPercent
    : number
}
