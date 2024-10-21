import { useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
  status?: string;
  title: string;
  current?: number;
  goal?: number;
  points: number;
}

const RewardComponent = (props: Props) => {
  const { points, title, current = 0, status, goal = 1 } = props;

  const progress = useMemo(() => {
    return (current / goal) * 100;
  }, [current, goal]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.medalContainer}>
          <Image source={require('../../assets/medal.png')} />
          <Text style={styles.points}>{points}</Text>
        </View>
      </View>
      {status == 'In Progress' ? (
        <View style={styles.row}>
          <Text style={styles.progressText}>
            {current}/{goal}
          </Text>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
        </View>
      ) : (
        <></>
      )}
      {status == 'Achieved' ? (
        <View style={styles.row}>
          <Text style={styles.progressText}>Achieved</Text>
          <Image source={require('../../assets/tick.png')} />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 1)',
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 20,
    height: 71,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
    justifyContent: 'center',
  },
  points: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(255, 88, 137, 1)',
    marginLeft: 4,
  },
  progressText: {
    color: '#rgba(149, 158, 167, 1)',
    fontSize: 14,
    fontWeight: '400',
    marginVertical: 8,
    marginRight: 8,
  },
  progressContainer: {
    width: 125,
    height: 4,
    backgroundColor: '#3E4455', // Màu nền của thanh tiến trình
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'rgba(255, 87, 137, 1)', // Màu của thanh tiến trình
    borderRadius: 4,
  },
  medalContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
});
export default RewardComponent;
