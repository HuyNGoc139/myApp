import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import HeaderComponent from '../../components/common/HeaderComponent';
import { useCallback, useEffect, useState } from 'react';
import { Calendar, Location, SearchNormal } from 'iconsax-react-native';
import debounce from 'lodash/debounce';

import {
  fetchLocation,
  fetchWeatherForeCast,
  fetchCurrentLocation,
} from '../../api/weather';
import { weatherImages } from '../../utils/weatherImage';
import { WeatherCondition } from '../../utils/weatherImage';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { ActivityIndicator } from 'react-native-paper';

interface Location {
  latitude: number;
  longitude: number;
}
interface Locations {
  name: string;
}

const queryClient = new QueryClient();
const InviteScreen = () => {
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState<any[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(
    null
    // {"latitude": 21.0303983, "longitude": 105.7824883}
  ); // lưu vị trí hiện tại
  const [weather, setWeather] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();
  const callQuery = useCallback(() => {
    const stogage = queryClient.getQueryData([
      `currentWeather${currentLocation?.latitude}${currentLocation?.longitude}`,
      currentLocation,
    ]);
    if (stogage) {
      setWeather(stogage);
      setIsLoading(false);
    } else {
      (async () => {
        if (!currentLocation) return null;
        const data = await queryClient.fetchQuery({
          queryKey: [
            `currentWeather${currentLocation?.latitude}${currentLocation?.longitude}`,
            currentLocation,
          ],
          queryFn: async () => {
            if (!currentLocation) return null;
            console.log(currentLocation);
            const data2 = await fetchCurrentLocation({
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              day: '7',
            });
            setWeather(data2);
            setIsLoading(false);
            queryClient.setQueryData(
              [
                `currentWeather${currentLocation?.latitude}${currentLocation?.longitude}`,
                currentLocation,
              ],
              data
            );
            return data2;
          },
        });
      })();
    }
  }, [currentLocation]);

  useEffect(() => {
    const fetchLocationWeather = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) return;

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.error(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };
    fetchLocationWeather();
  }, []);
  useEffect(() => {
    if (currentLocation) {
      callQuery();
    }
  }, [currentLocation]);

  const requestLocationPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        return false;
      }
    }
    return true; // Trên iOS thì luôn trả về true
  }, []);

  const handelLocation = useCallback(async (loc: Locations) => {
    setShowSearch(false);
    setLocations([]);
    try {
      const data = await fetchWeatherForeCast({
        city: loc.name,
        day: '7',
      });
      setWeather(data);
    } catch (error) {
      console.log('err:', error);
    }
  }, []);

  const handleSearch = useCallback((val: string) => {
    if (val.length > 2) {
      fetchLocation({ cityName: val }).then((data) => {
        setLocations(data);
      });
    }
  }, []);

  const handleTextDebounce = useCallback(debounce(handleSearch, 800), [
    handleSearch,
  ]);
  const { current, location } = weather || {};

  return (
    <ImageBackground
      source={require('../../assets/bg.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <HeaderComponent title="Weather" />
      <View style={styles.headerweather}>
        <View
          style={[
            styles.row,
            {
              backgroundColor: showSearch
                ? 'rgba(255, 255, 255, 0.1)'
                : 'transparent',
            },
          ]}
        >
          {showSearch ? (
            <TextInput
              onChangeText={handleTextDebounce}
              placeholder="Search city"
              placeholderTextColor="gray"
              style={[styles.input, { color: 'rgba(255, 255, 255, 0.1)' }]}
            />
          ) : null}

          <TouchableOpacity
            onPress={() => setShowSearch(!showSearch)}
            style={[
              styles.button,
              { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            ]}
          >
            <SearchNormal size={25} color="#999" />
          </TouchableOpacity>
        </View>
        {locations.length > 0 && showSearch ? (
          <View
            style={{
              backgroundColor: 'rgb(237, 237, 237)',
              marginHorizontal: 20,
              borderRadius: 25,
              paddingHorizontal: 20,
            }}
          >
            {locations.map((loc, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handelLocation(loc)}
                  style={{
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                    flexDirection: 'row',
                  }}
                >
                  <Location size="24" color="gray" />
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '500',
                      fontSize: 18,
                      marginLeft: 6,
                    }}
                  >
                    {loc?.name}, {loc?.country}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}
      </View>
      {/* SearchItem */}

      {!currentLocation || isLoading || !weather ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
            marginBottom: 8,
            justifyContent: 'space-around',
          }}
        >
          {/* Name */}
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 20,
            }}
          >
            {location?.name ? location.name : 'Ha Noi'}
            {', '}
            <Text style={{ fontWeight: '400', fontSize: 18 }}>
              {location?.country ? location.country : 'Viet Nam'}
            </Text>
          </Text>

          {/* Weather Image */}

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {weatherImages[current?.condition?.text as WeatherCondition] ? (
              <Image
                style={styles.iconBig}
                source={
                  weatherImages[current?.condition?.text as WeatherCondition]
                }
              />
            ) : (
              <Image
                style={styles.iconBig}
                source={{ uri: 'http:' + current?.condition.icon }}
              />
            )}
          </View>
          {/* Nhiet do */}
          <View>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: '700',
                fontSize: 60,
              }}
            >
              {current?.temp_c}&#176;
            </Text>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: '400',
                fontSize: 24,
              }}
            >
              {current?.condition.text}
            </Text>
          </View>
          {/* other weather */}
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={styles.iconsmall}
                source={require('../../assets/iconweather/wind.png')}
              />
              <Text style={styles.textkm}>{current?.wind_kph}km</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={styles.iconsmall}
                source={require('../../assets/iconweather/drop.png')}
              />
              <Text style={styles.textkm}>{current?.humidity}%</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={styles.iconsmall}
                source={require('../../assets/iconweather/sun.png')}
              />
              <Text style={styles.textkm}>
                {weather?.forecast?.forecastday[0]?.astro?.sunrise}
              </Text>
            </View>
          </View>

          {/* weather next day */}
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Calendar size="24" color="white" />
              <Text
                style={{ color: 'white', textAlign: 'center', marginLeft: 8 }}
              >
                Daily forecast
              </Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 16 }}
            >
              {weather?.forecast?.forecastday.map((item: any, index: any) => {
                let date = new Date(item.date);
                let options: Intl.DateTimeFormatOptions = { weekday: 'long' }; // Đặt kiểu chính xác cho options
                let dayName = date.toLocaleDateString('en-US', options);
                return (
                  <View
                    key={index}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      paddingVertical: 10,
                      paddingHorizontal: 24,
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 16,
                    }}
                  >
                    <Image
                      style={{ width: 52, height: 52 }}
                      source={{ uri: 'http:' + item?.day?.condition?.icon }}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: '600',
                      }}
                    >
                      {item?.day?.avgtemp_c}&#176;
                    </Text>
                    <Text style={{ color: 'white' }}>{dayName}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerweather: {
    height: '7%',
    marginHorizontal: 16,
    position: 'relative',
    zIndex: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 50,
  },
  input: {
    paddingLeft: 24,
    height: 40,
    paddingBottom: 4,
    flex: 1,
    fontSize: 16,
  },
  button: {
    borderRadius: 50,
    padding: 12,
    marginHorizontal: 4,
  },
  iconBig: {
    width: 240,
    height: 240,
  },
  iconsmall: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  textkm: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 18,
  },
});

export default InviteScreen;
