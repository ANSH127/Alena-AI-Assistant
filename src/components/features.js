import { View, Text, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { themeColors } from '../theme';


export default function Features() {
    return (
        <View style={{ height: hp(60) }} className='space-y-4' >
            <Text style={{ fontSize: wp(6.5) }} className='font-semibold text-gray-700' >Features</Text>
            <View className='p-4 rounded-xl space-y-2 bg-emerald-200 '  >
                <View className='flex-row item-center space-x-1'>
                    <Image source={require('../../assets/images/chatgptIcon.png')} style={{ width: wp(10), height: hp(5) }} />
                    <Text style={{ fontSize: wp(4.8) }} className='text-gray-700 font-semibold pt-1' >Chat with GPT-3</Text>
                </View>
                <Text style={{ fontSize: wp(4.5) }} className='text-gray-600  font-semibold'>
                    Alena uses GPT-3 to chat with you. GPT-3 is a powerful language model that can generate text based on a prompt.
                </Text>

            </View>
            <View className='p-4 rounded-xl space-y-2 bg-purple-200' >
                <View className='flex-row item-center space-x-1'>
                    <Image source={require('../../assets/images/dalleIcon.png')} style={{ width: wp(10), height: hp(5) }} />
                    <Text style={{ fontSize: wp(4.8) }} className='text-gray-700 font-semibold pt-1' >
                        Generate Images with DALL-E
                        </Text>
                </View>
                <Text style={{ fontSize: wp(4.5) }} className='text-gray-600  font-semibold'>
                    Alena uses DALL-E to generate images based on a prompt. DALL-E is a powerful image generation model that can generate images based on a prompt.
                </Text>

            </View>
        </View>
    )
}