import { View, Text, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Features from '../components/features';
import { dummyMessages } from '../constants';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';


export default function HomeScreen() {
  const [messages, setMessages] = React.useState(dummyMessages)
  const [recording, setRecording] = React.useState(false)
  const [speaking, setSpeaking] = React.useState(true)

  const clear=()=>{
    setMessages([])
  }
  const stopSpeaking=()=>{
    setSpeaking(false);
  }
  return (
    <View className='flex-1 bg-white'>
      <SafeAreaView className='flex-1 flex mx-5'>
        {/* bot icon */}
        <View className='flex-row  justify-center '>
          <Image source={require('../../assets/images/bot.gif')} className='bg-white' style={{ width: wp('50%'), height: hp('15%') }} />
        </View>
        {/* features || messages */}
        {
          messages.length > 0 ? (

            <View className='space-y-2 flex-1'>
              <Text style={{ fontSize: wp(5) }} className='text-gray-700 font-semibold ml-1'>
                Alena
              </Text>
              <View style={{ height: hp(58) }} className='bg-neutral-200 rounded-3xl p-4'>
                <ScrollView bounces={false} className='space-y-4' showsVerticalScrollIndicator={false}>
                  {
                    messages.map((message, index) => {
                      if (message.role === 'assistant') {
                        if (message.content.includes('https')) {
                          // its an image
                          return (
                            <View key={index} className='flex-row justify-start'>
                              <View className='bg-neutral-100 p-2 flex  rounded-2xl rounded-tl-none'>
                                <Image source={{ uri: message.content }} style={{ width: wp(60), height: hp(30) }} className='rounded-2xl' resizeMode='contain' />
                              </View>
                            </View>
                          )
                        }
                        else {
                          // text response
                          return (
                            <View style={{ maxWidth: wp(60) }} className='bg-neutral-100 p-4 rounded-2xl rounded-bl-none' key={index}>
                              <Text style={{ fontSize: wp(4) }} className='text-gray-700'>
                                {message.content}
                              </Text>
                            </View>

                          )
                        }
                      }
                      else {
                        // user message
                        return (
                          <View key={index} className='flex-row justify-end'>
                            <View style={{ maxWidth: wp(60) }} className='bg-neutral-100 p-4 rounded-2xl rounded-tr-none'>
                              <Text style={{ fontSize: wp(4) }} className='text-gray-700'>
                                {message.content}
                              </Text>
                            </View>
                          </View>
                        )
                      }

                    })
                  }

                </ScrollView>
              </View>

            </View>
          ) : (<Features />)
        }

        {/* recording,clear,stop buttons */}

        <View className='flex justify-center items-center'>
          {
            recording ? (

              <TouchableOpacity>
                <Image className='rounded-full' source={require('../../assets/images/voiceLoading.gif')} style={{ width: hp(10), height: hp(10) }} />
              </TouchableOpacity>
            ) : (

              <TouchableOpacity>
                <Image className='rounded-full' source={require('../../assets/images/recordingIcon.png')} style={{ width: hp(10), height: hp(10) }} />
              </TouchableOpacity>
            )
          }

          {
            messages.length>0 &&
            (
              <TouchableOpacity className='bg-neutral-400 rounded-3xl p-2 absolute right-6' onPress={clear} >
                <Text className='text-white text-lg px-2 font-semibold'>Clear</Text>
              </TouchableOpacity>
            )
          }
          {
            speaking &&
            (
              <TouchableOpacity className='bg-red-400 rounded-3xl p-2 absolute left-6' onPress={stopSpeaking} >
                <Text className='text-white text-lg px-2 font-semibold'>Stop</Text>
              </TouchableOpacity>
            )
          }
        </View>

      </SafeAreaView>
    </View>
  )
}