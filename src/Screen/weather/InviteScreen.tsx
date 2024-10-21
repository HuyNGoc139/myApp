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
import DrawerSceneWrapper from '../../components/common/DrawerSceneWrapper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import InputComponent from '../../components/common/InputComponent';
import { useCallback, useEffect, useState } from 'react';
import { Calendar, Location, SearchNormal } from 'iconsax-react-native';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
import debounce from 'lodash/debounce';

import axios from 'axios';
import { fetchLocation } from '../../api/weather';
interface Location {
  latitude: number;
  longitude: number;
}

const API_KEY ='68733361387a4cdd9b870705242110'

const InviteScreen = () => {
  const[search,setSearch]=useState('')
  const[showSearch,setShowSearch]=useState(false)
  const[locations,setLocations]=useState<any[]>([])
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null); // lưu vị trí hiện tại
  const [address, setAddress] = useState<string | undefined>('');
  
  const handelLocation=(loc:string)=>{
    console.log(loc)
    
  }
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "This app needs access to your location.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };
  
  const handleSearch = (val: string)=> {
    if(val.length>2){
      fetchLocation({ cityName: val }).then((data) => {
        console.log('locations:', data);
        setLocations(data)
        return; // Trả về một giá trị void
      });
    }
    else setLocations([])
  };
  const handleTextDebounce=useCallback(debounce(handleSearch,2000),[])
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
                <TouchableOpacity key={index}  onPress={()=>handelLocation('kaka')}
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
        Ho Chi Minh,{' '}
        <Text style={{fontWeight:'400',fontSize:18}}>
        Viet Nam
      </Text>
      </Text>

      {/* Weather Image */}

      <View style={{flexDirection:'row',justifyContent:'center'}}>
        <Image style={{width:240,height:240}} source={require('../../assets/weather/sun.png')}/>
      </View>
      {/* Nhiet do */}
      <View>
      <Text style={{color:'white',textAlign:'center',fontWeight:'700',fontSize:60}}>
        23&#176;
      </Text>
      <Text style={{color:'white',textAlign:'center',fontWeight:'400',fontSize:24}}>
        Partly Cloudy
      </Text>
      </View>
      {/* other weather */}
      <View style={{flexDirection:'row',justifyContent:'space-between',}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image style={{width:24,height:24,marginRight:6}} source={require('../../assets/iconweather/wind.png')}/>
          <Text style={{color:'white',textAlign:'center',fontWeight:'400',fontSize:18}}>
            22km
          </Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image style={{width:24,height:24,marginRight:6}} source={require('../../assets/iconweather/wind.png')}/>
          <Text style={{color:'white',textAlign:'center',fontWeight:'400',fontSize:18}}>
            25%
          </Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image style={{width:24,height:24,marginRight:6}} source={require('../../assets/iconweather/wind.png')}/>
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
          <View style={{backgroundColor:'rgba(255, 255, 255, 0.1)',
          paddingVertical:10,
          paddingHorizontal:24,
          borderRadius:20,
          justifyContent:'center',alignItems:'center',
          marginRight:16
          }}>
            <Image style={{width:52,height:52}} source={require('../../assets/weather/heavyrain.png')}/>
            <Text style={{color:'white',fontSize:18,fontWeight:'600'}}>
              13&#176;
            </Text>
            <Text style={{color:'white'}}>
              Monday
            </Text>
          </View>
          <View style={{backgroundColor:'rgba(255, 255, 255, 0.1)',
          paddingVertical:10,
          paddingHorizontal:24,
          borderRadius:20,
          justifyContent:'center',alignItems:'center',
          marginRight:16
          }}>
            <Image style={{width:52,height:52}} source={require('../../assets/weather/heavyrain.png')}/>
            <Text style={{color:'white',fontSize:18,fontWeight:'600'}}>
              13&#176;
            </Text>
            <Text style={{color:'white'}}>
              Monday
            </Text>
          </View>
          <View style={{backgroundColor:'rgba(255, 255, 255, 0.1)',
          paddingVertical:10,
          paddingHorizontal:24,
          borderRadius:20,
          justifyContent:'center',alignItems:'center',
          marginRight:16
          }}>
            <Image style={{width:52,height:52}} source={require('../../assets/weather/heavyrain.png')}/>
            <Text style={{color:'white',fontSize:18,fontWeight:'600'}}>
              13&#176;
            </Text>
            <Text style={{color:'white'}}>
              Monday
            </Text>
          </View>
          <View style={{backgroundColor:'rgba(255, 255, 255, 0.1)',
          paddingVertical:10,
          paddingHorizontal:24,
          borderRadius:20,
          justifyContent:'center',alignItems:'center',
          marginRight:16
          }}>
            <Image style={{width:52,height:52}} source={require('../../assets/weather/heavyrain.png')}/>
            <Text style={{color:'white',fontSize:18,fontWeight:'600'}}>
              13&#176;
            </Text>
            <Text style={{color:'white'}}>
              Monday
            </Text>
          </View>
          
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
