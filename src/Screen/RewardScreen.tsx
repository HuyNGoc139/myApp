import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';

import DrawerSceneWrapper from '../components/common/DrawerSceneWrapper';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationProp } from '@react-navigation/native';
import RewardComponent from '../components/common/RewardComponent';

const RewardScreen = ({ navigation }: any) => {
  const Data = [
    {
      title: 'Listen - 1 day',
      points: 1,
      status: 'Achieved',
    },
    {
      title: 'Listen for the first 7 consecutive days',
      points: 7,
      status: 'Achieved',
    },
    {
      title: 'Listen for the first 28 consecutive days',
      points: 28,
      status: 'In Progress',
      current: 14,
      goal: 28,
    },
    {
      title: 'Write one review',
      points: 50,
      status: 'Not Achieved',
    },
    {
      title: 'Refer a friend or accept a referral',
      points: 10,
      status: 'Not Achieved',
    },
  ];

  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      style={styles.imageBg}
      resizeMode="cover"
    >
      <DrawerSceneWrapper>
        {/* header */}
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image source={require('../assets/iconLeft.png')} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <LinearGradient
              style={styles.pointContainer}
              colors={['rgba(255, 87, 137, 1)', 'rgba(255, 155, 156, 1)']}
            >
              <Image source={require('../assets/medal.png')} />
              <Text style={styles.pointText}>9 Points</Text>
            </LinearGradient>
          </View>
        </View>
        {/* Reward */}
        <View style={styles.rewardContainer}>
          <Image
            style={{ width: 130, height: 130 }}
            source={require('../assets/Group189.png')}
          />
          <Text style={styles.rewardText}>Rewards</Text>
          <Text style={styles.textCollect}>
            Collect points and get savings for the next month
          </Text>
        </View>
        <View style={{ marginTop: 20, flex: 1 }}>
          <FlatList
            data={Data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <RewardComponent
                key={index}
                points={item.points}
                title={item.title}
                status={item.status}
                current={item.current}
                goal={item.goal}
              />
            )}
          />
        </View>
        <LinearGradient
          style={styles.containerButton}
          colors={['rgba(255, 87, 137, 1)', 'rgba(255, 155, 156, 1)']}
        >
          <Text style={styles.text}>100 points - 5% off</Text>
          <View style={styles.divider} />
          <Text style={styles.text}>150 points - 10% off</Text>
        </LinearGradient>
      </DrawerSceneWrapper>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    flexDirection: 'row',
    paddingTop: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pointContainer: {
    flexDirection: 'row',
    width: '30%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  pointText: {
    fontWeight: '700',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 1)',
    marginLeft: 4,
  },
  rewardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardText: {
    fontWeight: '900',
    fontSize: 24,
    color: 'rgba(255, 255, 255, 1)',
    marginBottom: 16,
  },
  textCollect: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
  },
  text: {
    color: '#rgba(255, 255, 255, 1)',
    fontWeight: '700',
    fontSize: 15,
  },
  divider: {
    width: 2,
    height: 20,
    backgroundColor: '#rgba(255, 255, 255, 1)',
    marginHorizontal: 20,
  },
  containerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    width: '100%',
    marginBottom: 30,
    height: 56,
  },
});

export default RewardScreen;
