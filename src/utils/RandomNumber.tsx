export default function RandomNumber({
  type,
  min,
  max,
  not
}: {
  type: 'int' | 'float'
  min: number
  max: number
  not?: number
}): number {
  let randomNumReturn = (
    type === 'int'
      ? Math.floor(Math.random() * (max - min + 1)) + min
      : (Math.random() * (max - min) + min).toFixed(1)
  ) as number

  if (!not) {
    return randomNumReturn
  }

  return not === randomNumReturn
    ? RandomNumber({ type, min, max, not })
    : randomNumReturn
}
