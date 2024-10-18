import { Platform, StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 12,
  },
  title: {
    fontSize: 32,
  },
  text: {
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#777',
    borderRadius: 12,
    paddingHorizontal: Platform.OS === 'ios' ? 12 : 8,
    paddingVertical: 12,
  },

  section: {
    marginBottom: 12,
    paddingHorizontal: 12,
  },

  card: {
    borderRadius: 12,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  imag: {
    width: 400,
    height: 300,
    marginTop: 20,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',

    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    height: 80,
    flexDirection: 'row',
  },
  textHeader: {
    fontSize: 24,
    color: 'white',
  },
});
