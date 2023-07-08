import { View, Text, Image, Alert } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Features from '../components/features';
// import { dummyMessages } from '../constants';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { apiCall } from '../api/openAI';



export default function HomeScreen() {
  const [messages, setMessages] = React.useState([])
  const [result, setResult] = React.useState('')
  const ScrollViewRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);


  const fetchResonse = () => {
    if (result.trim().length > 0) {
      let newMessages = [...messages];
      newMessages.push({ role: 'user', content: result.trim() })
      setMessages(newMessages);
      setResult('');
      updateScrollViews();
      setLoading(true);
      apiCall(result.trim(), newMessages).then(data => {
        setLoading(false);
        if (data.success) {
          setMessages([...data.data]);
          updateScrollViews();

        }
        else {
          Alert.alert('Error', data.msg)
        }

      })


    }
  }

  const updateScrollViews = () => {
    setTimeout(() => {

      ScrollViewRef?.current?.scrollToEnd({ animated: true })
    }, 2000);
  }

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true} className='flex-1 bg-white'>
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
                <ScrollView ref={ScrollViewRef} bounces={false} className='space-y-4' showsVerticalScrollIndicator={false}>
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
        {/* input */}
        {
          loading ? (
            <View className='flex justify-center items-center'>
            <Image source={require('../../assets/images/loading.gif')} style={{ width: wp(20), height: wp(20) }} 

            />
            </View>
          ):

          <View className='flex flex-row justify-between items-center mt-8 border border-neutral-500 rounded-full' >
          <TextInput placeholder='Search' placeholderTextColor='black' className='text-black p-4  flex-1 text-base font-semibold tracking-wider' onChangeText={
            (text) => {
              setResult(text)
            }
          } value={result} />
          <TouchableOpacity className='rounded-full p-3 m-1 bg-neutral-500' onPress={fetchResonse} >
            <MagnifyingGlassIcon size='24' color='white' />

          </TouchableOpacity>


        </View>}

      </SafeAreaView>
    </ScrollView>
  )
}