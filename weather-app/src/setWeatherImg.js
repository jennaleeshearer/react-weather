import cloudImage from './img/cloudy.png';
import partlyCloudyImage from './img/partly-cloudy.png';
import sunnyImage from './img/sunny.png';
import snowImage from './img/snow.png';

const setWeatherImg = (cloudCover, snow) => {
  if (snow > 0) {
    return snowImage;
  }
  if (cloudCover === 100) {
    return cloudImage;
  } else if (cloudCover >= 50 && cloudCover < 100) {
    return partlyCloudyImage;
  } else {
    return sunnyImage;
  }
};

export default setWeatherImg;
