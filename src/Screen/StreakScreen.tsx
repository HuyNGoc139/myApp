import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import HeaderComponent from '../Components/HeaderComponent';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import SpaceComponent from '../Components/SpaceComponent';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const StreakScreen: React.FC = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(
    moment().month()
  );
  const [currentMonth, setCurrentMonth] = useState<string>(
    moment().format('YYYY-MM')
  );
  const [currentDate, setCurrentDate] = useState<moment.Moment>(moment());

  const changeMonth = useCallback((index: number) => {
    const newMonth = moment().month(index).format('YYYY-MM');
    setCurrentMonth(newMonth);
    setCurrentMonthIndex(index);
  }, []);

  const getDisplayedMonths = useMemo(() => {
    const previousMonthIndex =
      currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
    const nextMonthIndex = currentMonthIndex === 11 ? 0 : currentMonthIndex + 1;
    return [
      months[previousMonthIndex],
      months[currentMonthIndex],
      months[nextMonthIndex],
    ];
  }, [currentMonthIndex]);

  const markedDates = useMemo(
    () => ({
      '2024-10-07': {
        startingDay: true,
        color: 'rgba(255, 87, 137, 1)',
        textColor: 'white',
        customStyles: {
          container: {
            borderRadius: 25,
            backgroundColor: 'rgba(255, 87, 137, 1)',
          },
        },
      },
      '2024-10-08': {
        color: 'rgba(0, 0, 0, 0.2)',
        textColor: 'white',
        customStyles: {
          container: {
            borderRadius: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        },
      },
      '2024-10-09': {
        endingDay: true,
        color: 'rgba(255, 87, 137, 1)',
        textColor: 'white',
        customStyles: {
          container: {
            borderRadius: 25,
            backgroundColor: 'rgba(255, 87, 137, 1)',
          },
        },
      },
    }),
    []
  );

  const onMonthChange = useCallback((date: DateData) => {
    const newMonth = moment(date.dateString).format('YYYY-MM');
    setCurrentMonth(newMonth);
    setCurrentMonthIndex(moment(date.dateString).month());
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <HeaderComponent title="My streaks" />
        <View style={styles.streakContainer}>
          <Image
            style={{ marginRight: 16 }}
            source={require('../assets/ic_aim1.png')}
          />
          <View>
            <Text style={styles.streakText}>Current streak: 1</Text>
            <Text style={styles.longestStreakText}>Longest streak: 2</Text>
          </View>
        </View>
        <SpaceComponent height={30} />
        <View style={styles.calenderContainer}>
          <View style={styles.monthNavigation}>
            {getDisplayedMonths.map((month, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => changeMonth(months.indexOf(month))}
                style={styles.monthButton}
              >
                <Text
                  style={[styles.monthText, index === 1 && styles.activeMonth]}
                >
                  {month}
                </Text>
                {index === 1 ? (
                  <LinearGradient
                    colors={['rgba(255, 87, 137, 1)', 'rgba(255, 155, 156, 1)']}
                    style={styles.activeSeparator}
                  />
                ) : (
                  <View style={styles.inactiveSeparator} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <Calendar
            key={currentMonth}
            current={currentMonth}
            theme={{
              backgroundColor: 'transparent',
              calendarBackground: 'transparent',
              textSectionTitleColor: 'rgba(255, 255, 255, 1)',
              selectedDayBackgroundColor: '#00adf5',
              todayTextColor: '#ff6347',
              dayTextColor: 'rgba(255, 255, 255, 1)',
              monthTextColor: 'white',
              arrowColor: 'white',
            }}
            markingType={'period'}
            markedDates={markedDates}
            monthFormat={'MMMM yyyy'}
            hideArrows={true}
            renderHeader={() => null}
            firstDay={1}
            onMonthChange={onMonthChange}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calenderContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  streakContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 20,
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    margin: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  streakText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 15,
    fontWeight: '500',
  },
  longestStreakText: {
    color: 'rgba(130, 129, 135, 1)',
    fontSize: 13,
    marginTop: 5,
    fontWeight: '300',
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  monthButton: {
    alignItems: 'center',
    flex: 1,
  },
  monthText: {
    color: 'rgba(130, 129, 135, 1)',
    fontSize: 15,
    marginBottom: 20,
    fontWeight: '500',
  },
  activeMonth: {
    color: 'rgba(255, 255, 255, 1)',
  },
  activeSeparator: {
    height: 2,
    alignSelf: 'stretch',
  },
  inactiveSeparator: {
    height: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignSelf: 'stretch',
  },
});

export default StreakScreen;
