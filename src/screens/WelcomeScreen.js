import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { themeColors } from '../theme';

export default function WelcomeScreen({navigation}) {
    return (
        <SafeAreaView className='flex-1 flex justify-around bg-white'>
            <View className='space-y-2'>
                <Text style={{fontSize:wp(10)}} className='text-center font-bold text-gray-700 '>Alena</Text>
                <Text style={{fontSize:wp(4)}} className='text-center  text-gray-600 tracking-wider font-semibold'>
                    Welcome to Alena, your personal assistant
                </Text>
            </View>
            <View className='flex-row justify-center'>
                <Image source={require('../../assets/images/welcome.webp')} style={{width:wp(100),height:hp(55)}} />
            </View>
            <TouchableOpacity className='mx-5 p-4 rounded-2xl ' style={{backgroundColor:themeColors.bgColor}} onPress={()=> navigation.navigate('Home')} >
                <Text style={{fontSize:wp(6)}} className='text-center text-white font-semibold '>Get Started</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}