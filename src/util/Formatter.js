export class Formatter {
  static getFormattedTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  static getFormattedAverageTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return seconds ? `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}` : '0:00';
  };

  static formatSolution = (equation, target, currentSeconds) => {
    return `${equation} = ${target} | ${this.getFormattedTime(currentSeconds)}`;
  };

  static formatNumUsedObj = (numsArr) => {
    let numUsedObjTemp = {};

    numsArr.forEach((num, i) => {
      numUsedObjTemp[i] = {
        value: num,
        used: false,
      };
    });
    return numUsedObjTemp;
  };
}
