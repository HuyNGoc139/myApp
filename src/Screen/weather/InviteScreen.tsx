import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import HeaderComponent from '../../components/common/HeaderComponent';
import DrawerSceneWrapper from '../../components/common/DrawerSceneWrapper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import InputComponent from '../../components/common/InputComponent';
import { useCallback, useEffect, useState } from 'react';
import { Calendar, Location, SearchNormal } from 'iconsax-react-native';
import debounce from 'lodash/debounce';
import axios from 'axios';
import { fetchLocation, fetchWeatherForeCast,fetchCurrentLocation } from '../../api/weather';

import { Weather } from '../../model/weather';
import { weatherImages } from '../../utils/weatherImage';
import { WeatherCondition } from '../../utils/weatherImage';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';

interface Location {
  latitude: number;
  longitude: number;
}
interface Locations {
  name: string;
}
const InviteScreen = () => {
  const[search,setSearch]=useState('')
  const[showSearch,setShowSearch]=useState(false)
  const[locations,setLocations]=useState<any[]>([])
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null); // lưu vị trí hiện tại
  const [address, setAddress] = useState<string | undefined>('');
  const [weather, setWeather] = useState<any>({});
  useEffect(() => {
    const fetchLocationWeather = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) return;
  
      Geolocation.getCurrentPosition(
        async (position) => {
          console.log('====================================');
          console.log(position);
          console.log('====================================');
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });

          const data = await fetchCurrentLocation({
            latitude,
            longitude,
            day: '7', 
          });
  
          if (data) {
            setWeather(data);
          } else {
            console.log("Không thể lấy dữ liệu thời tiết từ vị trí hiện tại");
          }
        },
        (error) => {
          console.error("Lỗi khi lấy vị trí:", error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };
  
    fetchLocationWeather(); 
  }, []);

  const requestLocationPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app needs access to your location.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn("Lỗi khi xin quyền vị trí:", err);
        return false;
      }
    }
    return true; // Trên iOS thì luôn trả về true
  }, []);

  const handelLocation = async (loc: Locations) => {
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
  };

  const handleSearch = (val: string)=> {
    if(val.length>2){
      fetchLocation({ cityName: val }).then((data) => {
        setLocations(data)
        return; // Trả về một giá trị void
      });
    }
    else return
  };

  const handleTextDebounce=useCallback(debounce(handleSearch,1200),[])
  const {current,location}=weather||{}

  return (
    <ImageBackground
      source={require('../../assets/bg.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
        <HeaderComponent title="Weather" />
        <View style={{ height: '7%', marginHorizontal: 16, position: 'relative', zIndex: 50 }}>
      <View
        style={[
          styles.row, 
          { backgroundColor: showSearch ? 'rgba(255, 255, 255, 0.1)' : 'transparent' }
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
          style={[styles.button, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}
        >
          <SearchNormal size={25} color="#999" />
        </TouchableOpacity>
      </View>
      {
      locations.length>0&&showSearch?(
        <View style={{backgroundColor:'rgb(237, 237, 237)',marginHorizontal:20,borderRadius:25,paddingHorizontal:20}}>
          {
            locations.map((loc,index)=>{
              return(
                <TouchableOpacity key={index}  onPress={()=>handelLocation(loc)}
                style={{padding:16,
                borderBottomWidth:1,
                borderBottomColor:'gray',
                flexDirection:'row'
                }}>
                  <Location size="24" color="gray"/>
                  <Text style={{color:'black',fontWeight:'500',fontSize:18,marginLeft:6}}>{loc?.name}, {loc?.country}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
      ):null
    }
    </View>
    {/* SearchItem */}
    
    <View style={{flex:1, marginHorizontal:20,marginBottom:8,justifyContent:'space-around'}}>
      {/* Name */}
      <Text style={{color:'white',textAlign:'center',fontWeight:'700',fontSize:20}}>
        {location?.name?location.name:"Ha Noi"}{', '}
        <Text style={{fontWeight:'400',fontSize:18}}>
        {location?.country?location.country:"Viet Nam"}
      </Text>
      </Text>

      {/* Weather Image */}

      <View style={{flexDirection:'row',justifyContent:'center'}}>
      {current?.condition.icon?<Image style={{width:240,height:240}} source={weatherImages[current?.condition?.text as WeatherCondition]}/>
        :<Image style={{width:240,height:240}} source={require('../../assets/weather/sun.png')}/>}
      </View>
      {/* Nhiet do */}
      <View>
      <Text style={{color:'white',textAlign:'center',fontWeight:'700',fontSize:60}}>
        {current?.temp_c}&#176;
      </Text>
      <Text style={{color:'white',textAlign:'center',fontWeight:'400',fontSize:24}}>
        {current?.condition.text}
      </Text>
      </View>
      {/* other weather */}
      <View style={{flexDirection:'row',justifyContent:'space-between',}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
         <Image style={{width:24,height:24,marginRight:6}} source={require('../../assets/iconweather/wind.png')}/>
          <Text style={{color:'white',textAlign:'center',fontWeight:'400',fontSize:18}}>
            {current?.wind_kph}km
          </Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image style={{width:24,height:24,marginRight:6}} source={require('../../assets/iconweather/drop.png')}/>
          <Text style={{color:'white',textAlign:'center',fontWeight:'400',fontSize:18}}>
            {current?.humidity}%
          </Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image style={{width:24,height:24,marginRight:6}} source={require('../../assets/iconweather/sun.png')}/>
          <Text style={{color:'white',textAlign:'center',fontWeight:'400',fontSize:18}}>
            6:05 AM
          </Text>
        </View>
      </View>

      {/* weather next day */}
      <View>
        <View style={{flexDirection:'row',alignItems:'center',}}>
        <Calendar size="24" color="white"/>
        <Text style={{color:'white',textAlign:'center',marginLeft:8}}>
        Daily forecast
      </Text>
        </View>
        <ScrollView 
        horizontal
        contentContainerStyle={{paddingHorizontal:15}}
        showsHorizontalScrollIndicator={false}
        style={{marginTop:16}}
        >
          {weather?.forecast?.forecastday.map((item: any,index: any)=>{
            let date = new Date(item.date);
            let options: Intl.DateTimeFormatOptions = { weekday: 'long' }; // Đặt kiểu chính xác cho options
            let dayName = date.toLocaleDateString('en-US', options);
            return(
              <View key={index}
              style={{backgroundColor:'rgba(255, 255, 255, 0.1)',
          paddingVertical:10,
          paddingHorizontal:24,
          borderRadius:20,
          justifyContent:'center',alignItems:'center',
          marginRight:16,
          }}>
            <Image style={{width:52,height:52}} source={{uri:'http:'+item?.day?.condition?.icon}}/>
            <Text style={{color:'white',fontSize:18,fontWeight:'600'}}>
              {item?.day?.avgtemp_c}&#176;
            </Text>
            <Text style={{color:'white'}}>
              {dayName}
            </Text>
          </View>
            )
          })}
        </ScrollView>
      </View>
    </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
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
});

export default InviteScreen;
