import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchBarInput from '../components/SearchBarInput/SearchBarInput';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
import {newSessionButton} from '../assets/svgs/SvgGroup';
import {useDispatch} from 'react-redux';

import CardComponent from '../components/cardComponent/CardComponent';
import {HistoryApi} from '../services/apis/HistoryApi';
import LoaderComp from '../components/LoaderComp/LoaderComp';
import {useIsFocused} from '@react-navigation/native';
import {sessionData, userResponse} from '../store/reducers/appReducer';
import {DeleteHistory} from '../services/apis/DeleteHistory';
import Toast from 'react-native-toast-message';

const HomeScreen = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [CardData, setCardData] = useState<any>([]);
  const [searchTxt, setSearchTxt] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [SearchFilteredData, setSearchFilteredData] = useState([]);
  // console.log('SearchFilteredDatssa', SearchFilteredData);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(userResponse({}));
      dispatch(sessionData({}));
    }
  }, [isFocused]);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const response = await HistoryApi();
      setCardData(response);
      // console.log('response', response);
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchHistory();
    }
  }, [isFocused]);

  const handleNewSession = () => {
    // if (Object.keys(UserRes).length !== 0) {
    //   dispatch(userResponse({}));
    props.navigation.navigate('StartSession');
    // }
  };

  const handleSearchChange = (text: any) => {
    setSearchTxt(text);
    const filtered = CardData.filter((user: any) =>
      user.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  const handleRefreshAfterDelete = async (id: any) => {
    try {
      const response = await DeleteHistory(id);

      if (response?.status === true) {
        const updatedCardData = CardData.filter((item: any) => item.id !== id);
        setCardData(updatedCardData);

        if (searchTxt !== '') {
          const filtered = updatedCardData.filter((user: any) =>
            user.name.toLowerCase().includes(searchTxt.toLowerCase()),
          );
          setFilteredData(filtered);
        } else {
          setFilteredData(updatedCardData);
        }

        setIsLoading(false);
        Toast.show({
          type: 'success',
          text1: response.message,
        });
      }
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.SafeAreaStyle}>
      <View style={styles.searchView}>
        <SearchBarInput
          handleSearchChange={handleSearchChange}
          searchTxt={searchTxt}
          CardData={CardData}
          setSearchFilteredData={setSearchFilteredData}
        />
      </View>

      <CardComponent
        CardData={
          searchTxt !== ''
            ? filteredData
            : SearchFilteredData && SearchFilteredData.length > 0
            ? SearchFilteredData
            : CardData
        }
        navigation={props.navigation}
        onDeleteSuccess={(id: number) => handleRefreshAfterDelete(id)}
        ViewDetails
      />

      {/* START SESSION */}
      <TouchableOpacity style={styles.newSession} onPress={handleNewSession}>
        <SvgXml xml={newSessionButton} />
      </TouchableOpacity>
      <LoaderComp isLoading={isLoading} setIsLoading={setIsLoading} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  SafeAreaStyle: {
    flex: 1,
    width: wp(90),
    alignSelf: 'center',
  },
  newSession: {
    position: 'absolute',
    top: hp(70),
    left: wp(70),
    // top: Platform.OS === 'ios' ? 570 : 630,
    // left: Platform.OS === 'ios' ? 270 : 250,
  },
  searchView: {
    alignSelf: 'center',
    marginTop: hp(2),
  },
});
