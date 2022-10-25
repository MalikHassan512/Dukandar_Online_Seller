import React, {useEffect, useState} from 'react';

import {Dimensions} from 'react-native';

import {LineChart} from 'react-native-chart-kit';

import {getData} from '../../NetworkRequest';
import {useSelector, useDispatch} from 'react-redux';

const Graph = () => {
  const [apiData, setApiData] = useState([]);
  const token = useSelector(state => state.auth?.token);

  const getGraphData = async () => {
    try {
      const res = await getData(token, 'shop/graph/');
      setApiData(apiData);
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGraphData();
  }, []);

  return (
    <>
      <LineChart
        data={{
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              data: [
                // apiData.map(item => item?.sum),
                Math.random() * 300,
                Math.random() * 300,
                Math.random() * 300,
                Math.random() * 300,
                Math.random() * 300,
                Math.random() * 300,
                Math.random() * 300,
                Math.random() * 300,
                Math.random() * 300,
                Math.random() * 300,
                Math.random() * 300,
                Math.random() * 300,
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 2, // optional, defaults to 2dp
          //   color: (opacity = 1) => `rgba(96, 184, 98, ${opacity})`,
          color: (opacity = 1) => `rgba(150, 197, 71, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            // stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </>
  );
};

export default Graph;
