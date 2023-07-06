
export function convertSecondsToHMS(seconds: number) {
    if (seconds === 0) return "00:00";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedHours =
      hours > 0 ? hours.toString().padStart(1, "0") + ":" : "";
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
    return formattedHours + formattedMinutes + ":" + formattedSeconds;
}