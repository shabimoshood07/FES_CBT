export function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formattedHrs = String(hrs).padStart(2, '0');
  const formattedMins = String(mins).padStart(2, '0');
  const formattedSecs = String(secs).padStart(2, '0');

  return `${formattedHrs}hrs : ${formattedMins}mins : ${formattedSecs}secs`;
}
