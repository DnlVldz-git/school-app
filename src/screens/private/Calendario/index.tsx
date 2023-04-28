import * as React from 'react';
import {View, Image, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {useLayout} from 'hooks';
import {Agenda, DateData, AgendaEntry, AgendaSchedule, Calendar} from 'react-native-calendars';
import {
  Layout,
  StyleService,
  useStyleSheet,
  TopNavigation,
  Avatar,
  Icon,
  Button,
} from '@ui-kitten/components';
import testIDs from './testIDs';
import {
  Container,
  Content,
  Text,
  NavigationAction,
  VStack,
  HStack,
} from 'components';
import {Component} from 'react';
import Images from 'assets/images';
import Carousel from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';
import { useState } from 'react';

interface State {
  items?: AgendaSchedule;
}
export default class Calendario extends Component<State> {
  state: State = {
    items: undefined
  };

   reservationsKeyExtractor = (item, index) => {
    return `${item?.reservation?.day}${index}`;
   };

  render() {
    return (
      <Container style={styles.container}>
      <TopNavigation
        title={'Calendario'}
        accessoryRight={<NavigationAction icon="circles_four" status="primary" />}
        accessoryLeft={<NavigationAction icon="waves" status="primary" />}
      />
      <Agenda
        testID={testIDs.agenda.CONTAINER}
        items={this.state.items}
        loadItemsForMonth={this.loadItems}
        selected={'2023-04-27'}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        showClosingKnob={true}
        markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        //hideExtraDays={false}
        //showOnlySelectedDayItems
         reservationsKeyExtractor={this.reservationsKeyExtractor}
      />
      </Container>
    );
  }

  loadItems = (day: DateData) => {
    const items = this.state.items || {};

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];
          
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime
            });
          }
        } 
      }
      
      const newItems: AgendaSchedule = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: reservation.height}]}
        onPress={() => Alert.alert(reservation.name)}
      >
        <Text style={{fontSize, color}}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  }

  timeToString(time: number) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});