export type WeatherCondition =
  | 'Partly cloudy'
  | 'Moderate rain'
  | 'Patchy rain possible'
  | 'Sunny'
  | 'Clear'
  | 'Overcast'
  | 'Cloudy'
  | 'Light rain'
  | 'Moderate rain at times'
  | 'Heavy rain'
  | 'Heavy rain at times'
  | 'Moderate or heavy freezing rain'
  | 'Moderate or heavy rain shower'
  | 'Moderate or heavy rain with thunder'
  | 'Light rain shower'
  | 'other';

export const weatherImages: Record<WeatherCondition, any> = {
  'Partly cloudy': require('../assets/weather/partlycloudy.png'),
  'Moderate rain': require('../assets/weather/moderaterain.png'),
  'Patchy rain possible': require('../assets/weather/moderaterain.png'),
  Sunny: require('../assets/weather/sun.png'),
  Clear: require('../assets/weather/sun.png'),
  Overcast: require('../assets/weather/cloud.png'),
  Cloudy: require('../assets/weather/cloud.png'),
  'Light rain': require('../assets/weather/moderaterain.png'),
  'Light rain shower': require('../assets/weather/moderaterain.png'),
  'Moderate rain at times': require('../assets/weather/moderaterain.png'),
  'Heavy rain': require('../assets/weather/heavyrain.png'),
  'Heavy rain at times': require('../assets/weather/heavyrain.png'),
  'Moderate or heavy freezing rain': require('../assets/weather/heavyrain.png'),
  'Moderate or heavy rain shower': require('../assets/weather/heavyrain.png'),
  'Moderate or heavy rain with thunder': require('../assets/weather/heavyrain.png'),
  other: require('../assets/weather/moderaterain.png'),
};
