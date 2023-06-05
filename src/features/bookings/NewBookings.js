import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewBookComponent = ({ book }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.class}>{book.classs}</Text>
        <Text style={styles.subject}>{book.subject}</Text>
      </View>
      <View style={styles.details}>
        <View>
          <Text style={styles.info}>Time: {book.time}</Text>
          <Text style={styles.info}>Fee: {book.fee}</Text>
          <Text style={styles.info}>Contact: {book.contact}</Text>
        </View>
        <View>
          <View style={styles.addressContainer}>
            <Text style={styles.addressTitle}>Address:</Text>
            {book?.addresses?.map((line, index) => (
              <Text key={index} style={styles.addressLine}>
                {line}
              </Text>
            ))}
            <Text style={styles.info}>{book.pin}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  class: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subject: {
    fontSize: 16,
    color: '#888',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 12,
  },
  info: {
    fontSize: 14,
    marginBottom: 4,
  },
  addressContainer: {},
  addressTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  addressLine: {
    fontSize: 14,
    marginBottom: 2,
  },
});

export default NewBookComponent;
