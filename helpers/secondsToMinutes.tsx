export default function secondsToMinutes(secondsStr: string): string {
  try {
    const seconds: number = parseInt(secondsStr);
    if (seconds < 60) {
      return `${seconds} seconds`;
    } else {
      const minutes: number = Math.floor(seconds / 60);
      const remainingSeconds: number = seconds % 60;
      if (remainingSeconds === 0) {
        return `${minutes} minutes`;
      } else {
        return `${minutes} minutes ${remainingSeconds} seconds`;
      }
    }
  } catch (error) {
    return "Error";
  }
}
