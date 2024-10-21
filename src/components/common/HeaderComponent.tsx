import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
}

const HeaderComponent = (props: Props) => {
  const { title } = props;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image source={require('../../assets/iconLeft.png')} />
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
    fontWeight: '500',
    fontSize: 17,
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center', // Căn giữa chữ
    paddingRight: 24,
  },
});

export default HeaderComponent;
