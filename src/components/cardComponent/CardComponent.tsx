import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../utils/appContants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  ageSvg,
  coloredCalenderSvg,
  deleteIcon,
  femaleSvg,
  foldersvg,
  languageSvg,
  maleSvg,
} from '../../assets/svgs/SvgGroup';
import {SvgXml} from 'react-native-svg';
import {interMedium, interRegular} from '../../assets/fonts';
import * as Typography from '../../assets/fonts/typography';
import TextComp from '../TextComp/TextComp';
import {t} from 'i18next';
import {DeleteHistory} from '../../services/apis/DeleteHistory';
import {HistoryApi} from '../../services/apis/HistoryApi';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const CardComponent = (props: any) => {
  const [refreshing, setRefreshing] = useState(false);

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const showDeleteConfirmation = (id: any) => {
    Alert.alert(
      '',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => props.onDeleteSuccess(id),
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await HistoryApi();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <View style={styles.mainContainer}>
      {props.CardData && props?.CardData?.length > 0 ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              colors={Colors.turquoise}
              tintColor={'#1EBEB6'}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: hp(3),
          }}>
          {props.CardData?.map((item: any, index: any) => {
            return (
              <View style={styles.cardContainer} key={index}>
                <View style={styles.insideContainer}>
                  <View>
                    {/* NAME */}
                    <View style={styles.nameContainer}>
                      <Text style={styles.name}>{item?.name}</Text>
                      <View style={styles.deleteContainer}>
                        <Text style={styles.id}>{item?.id}</Text>
                        <TouchableOpacity
                          onPress={() => showDeleteConfirmation(item?.id)}>
                          <SvgXml xml={deleteIcon} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {/* DATE */}
                    <View style={styles.dateContainer}>
                      <SvgXml xml={coloredCalenderSvg} />
                      <Text style={styles.date}>
                        {formatDate(item?.createdAt)}
                      </Text>
                    </View>
                    {/* GENDER, AGE, LANGUAGE */}
                    <View style={styles.personalDataContainer}>
                      <View style={styles.generalContainer}>
                        <SvgXml xml={languageSvg} />
                        <Text style={styles.generalText}>
                          {item?.language?.charAt(0)?.toUpperCase() +
                            item?.language?.slice(1)}
                        </Text>
                      </View>
                      <View style={styles.generalContainer}>
                        <SvgXml
                          xml={item?.gender === 'male' ? maleSvg : femaleSvg}
                        />
                        <Text style={styles.generalText}>
                          {item?.gender?.charAt(0)?.toUpperCase() +
                            item?.gender?.slice(1)}
                        </Text>
                      </View>
                      <View style={styles.generalContainer}>
                        <SvgXml xml={ageSvg} />
                        <Text style={styles.generalText}>{item?.age}</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() =>
                        props.navigation.navigate('StartSession', {
                          ViewDetails: props?.ViewDetails,
                          id: item?.id,
                          language: item?.language,
                        })
                      }>
                      <Text style={styles.buttonText}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : null}
      {props?.CardData?.length === 0 && (
        <View style={styles.container}>
          <View style={styles.folderView}>
            <SvgXml xml={foldersvg} style={{marginVertical: hp(2)}} />

            <TextComp
              textvalue={'No Record Found!'}
              xp
              fontFamily={interRegular}
              fontSize={Typography.FONT_SIZE_14}
              fontWeight={'500'}
              color={colors.blackDark}
            />
            <View style={styles.text}>
              <TextComp
                textvalue={
                  'Click the button below to start a new session with your patient.'
                }
                textAlign={'center'}
                fontFamily={interRegular}
                fontSize={Typography.FONT_SIZE_12}
                color={colors.grey}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default CardComponent;

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: colors.backgroundColor,

    // paddingHorizontal: wp(1),
    flex: 1,
  },
  cardContainer: {
    backgroundColor: colors.backgroundColor,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginTop: hp(3),
  },
  insideContainer: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    // width: wp(85),
    justifyContent: 'center',
  },
  deleteContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp(2),
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateContainer: {
    flexDirection: 'row',
    gap: wp(1),
    alignItems: 'center',
    marginTop: hp(1),
    marginBottom: hp(2),
  },
  personalDataContainer: {
    flexDirection: 'row',
    gap: wp(8),
    marginBottom: hp(2),
  },
  generalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp(0.7),
    borderRadius: hp(1),
    backgroundColor: colors.turquoise,
    height: hp(5.5),
    marginTop: hp(1),
  },
  buttonText: {
    color: colors.white,
    fontFamily: interMedium,
    fontSize: Typography.FONT_SIZE_16,
  },
  name: {
    fontFamily: interMedium,
    fontSize: Typography.FONT_SIZE_16,
    color: colors.lightBlack,
  },
  id: {
    borderWidth: 0.5,
    borderColor: colors.turquoise,
    fontSize: Typography.FONT_SIZE_11,
    fontFamily: interRegular,
    alignSelf: 'center',
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2),
    borderRadius: 10,
    color: colors.turquoise,
  },
  date: {
    fontSize: Typography.FONT_SIZE_12,
    color: colors.red,
    fontFamily: interRegular,
  },
  generalText: {
    fontFamily: interRegular,
    color: colors.grey,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },
  folderView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: wp(65),
    paddingVertical: hp(1.2),
  },
});
