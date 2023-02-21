import * as React from 'react';
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  ViewPager,
} from '@ui-kitten/components';

import {Container, Text, NavigationAction, HStack} from 'components';
import Segment from './Segment';
import Expense from './Expense';
import Income from './Income';
import Timeline from './Timeline';

const Finance03 = React.memo(() => {
  const styles = useStyleSheet(themedStyles);

  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [selectedTimeline, setSelectedTime] = React.useState(0);
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={'Chart Details'}
        accessoryLeft={<NavigationAction status="primary" />}
        accessoryRight={
          <NavigationAction icon="circles_four" status="primary" />
        }
      />
      <Segment
        style={styles.segment}
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      />
      <HStack mh={24} mt={24}>
        <Text category="h4">$925.60</Text>
        <Timeline selectTab={selectedTimeline} onSelect={setSelectedTime} />
      </HStack>
      <ViewPager
        shouldLoadComponent={index => index === selectedIndex}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
        style={styles.viewPage}>
        <Expense />
        <Income />
      </ViewPager>
    </Container>
  );
});

export default Finance03;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  segment: {
    marginTop: 24,
    marginHorizontal: 24,
    marginBottom: 8,
  },
  viewPage: {
    flex: 1,
  },
});
