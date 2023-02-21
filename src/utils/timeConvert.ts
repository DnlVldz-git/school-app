const timeConvert = (currentTime: number): string => {
    const _currentTime = Math.ceil(currentTime);
    const hour = Math.floor(_currentTime / 3600);
    const x = _currentTime - hour * 3600;
    const minute = Math.floor(x / 60);
    const second = Math.floor(x - minute * 60);
    const stringHour = hour > 0 ? `${hour}:` : '';
    const stringMinute = minute >= 10 ? `${minute}:` : `0${minute}:`;
    const stringSecond = second >= 10 ? `${second}` : `0${second}`;
    const stringTime = `${stringHour}${stringMinute}${stringSecond}`;
    return stringTime;
  };
  
  export default timeConvert;
  