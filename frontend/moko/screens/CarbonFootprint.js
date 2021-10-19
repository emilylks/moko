import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput
} from 'react-native';
import { BarChart } from 'react-native-chart-kit'
import HorizontalBarGraph from '@chartiful/react-native-horizontal-bar-graph';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height } = Dimensions.get('window');
function Footprint({ navigation }) {
  return (
    <View style = {{backgroundColor: '#FFFFFF', height: height}}>
      <Text style={styles.name}>Carbon Footprint</Text>
      <ScrollView>
        <Text style={styles.action}>Your actions make a difference!</Text>
        <View style={styles.info}>
          <Ionicons name="nutrition-outline" color='#4C6D41' size={60} style={{ marginTop: 20}}/>
          <Text style={styles.textInfo}>The average local apple travels only 0.115 Tonne-Km, while imported ones travel 4.71 Tonne-Km to reach you! </Text>
        </View>
        <View style={styles.info}>
          <Ionicons name="boat-outline" color='#4C6D41' size={60} style={{ marginTop: 20}}/>
          <Text style={styles.textInfo}>Food transported by truck are about seven times more polluting than when transported by boat!</Text>
        </View>
        <View style={styles.info}>
          <Ionicons name="sad-outline" color='#4C6D41' size={60} style={{ marginTop: 20}}/>
          <Text style={styles.textInfo}>In a year, if you buy only locally produced food the CO2
          emissions would be .00632 tonnes, while imported foods would be .573 tonnes!</Text>
        </View>
        <View style={styles.info}>
          <Ionicons name="happy-outline" color='#4C6D41' size={60} style={{ marginTop: 20}}/>
          <Text style={styles.textInfo}>Eating more locally produced food will reduce the greenhouse gas
          emissions that result from food transportation!</Text>
        </View>

        <View style={{marginBottom: 40}}>
          <Text style={styles.action}>THE IMPACT OF IMPORTED FOODS</Text>
          <Text style={styles.info}>Checkout how the Carbon Dioxide emissions diverge between local and imported foods</Text>
            <HorizontalBarGraph
            data={[14.9, 840, 23, 974, 43, 409]}
            labels={['Loc Carrots', 'Imp Carrots', 'Loc Apples', 'Imp Apples', 'Loc Potato', 'Imp Potato']}
            width={375}
            height={400}
            barRadius={15}
            baseConfig={config}
            style={styles.chart}
            barColor={"#4C6D41"}
              />
        </View>
        <Text style={styles.referencesTitle}>References</Text>
        <Text style={styles.references}>Food Share, Fighting Global Warming at the Farmer’s Market ,2005, 4.
        https://foodshare.net/custom/uploads/2015/11/Fighting_Global_Warming_at_the_Farmers_Market.pdf
        </Text>
      </ScrollView>
    </View>
  );
}

const config = {
  hasYAxisBackgroundLines: false,
  xAxisLabelStyle: {
    rotation: 0,
    fontSize: 11,
    width: 70,
    yOffset: 4,
    xOffset: -17,
  },
  yAxisLabelStyle: {
    rotation: 30,
    fontSize: 10,
    prefix: 'CO2 ',
    position: 'bottom',
    xOffset: 15,
    decimals: 2,
    height: 100
  }
};

const styles = StyleSheet.create({
  name: {
    marginTop: 20,
    marginLeft: 40,
    marginHorizontal: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 30,
    fontWeight: 'bold'
  },
  action: {
    marginTop: 40,
    marginHorizontal: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center'
  },
  chart: {
    marginBottom: 10,
    padding: 10,
    paddingTop: 20,
    borderRadius: 20,
    marginLeft: 4,
  },
  info: {
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  textInfo: {
    marginTop: 20,
    marginLeft: 20,
    marginRight:20,
    fontFamily: 'Inter-Regular',
    fontSize: 17,
  },
  references: {
    alignSelf: 'center',
    marginBottom: 90,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    alignItems: 'center'
  },
  referencesTitle: {
    alignSelf: 'center',
    marginBottom: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 15,
  }
});

export default Footprint;
