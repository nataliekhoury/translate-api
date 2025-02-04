import { View, Text ,StyleSheet,TextInput,TouchableOpacity,Keyboard, SectionListComponent,Image } from 'react-native'
import React,{useState} from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import axios from 'axios'

const TranslatorApp  = () => {
  // defention ,default language
  const [inputText,setInputText]=useState('');
  const [translatedText,setTranslatedText]=useState('');
  const [fromLang,setFromLang]=useState('English');
  const [toLang,setToLang]=useState('Arabic');
  const[openFrom,setOpenFrom]=useState('false'); //handle the vasisbilty of the langage selection dropdowns 
  const [openTo,setOpenTo]=useState('false');
  const API_KEY='sk-THC2EvrwURzv89MLUgHAT3Blgjsp9sg4eOv7dxylVwr68';


  const translateText = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          messages: [
            {
              role: 'user',
              content: `Can you translate the following from ${fromLang} text into ${toLang}:"${inputText}"`,
            },
            { role: 'assistant', content: 'translate' },
          ],
          max_tokens: 500,
          model: 'gpt-3.5-turbo',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      setTranslatedText(response.data.choices[0].message.content);
      Keyboard.dismiss();
    } catch (error) {
      console.error('Error in translating the text:', error.response.data);
    }
  };


  return (
    <View style={styles.container}>
  
  
      <Text style= {styles.title}>Api Translator</Text>
 

      <View style={styles.dropdowncontainer}>
        <DropDownPicker
       open= {openFrom}
       value={fromLang}
       setOpen={setOpenFrom}
       setValue={setFromLang}
       items={[
        {label:'English',value:'English'},
        {label:'Arabic',value:'Arabic'},
        {label:'French',value:'French'},
        {label:'Spanich',value:'Spanich'},
        {label:'Hebrew',value:'Hebrew'},
        {label:'Latin',value:'Latin'},
        {label:'Italian',value:'Italian'},
        {label:'Japanese',value:'Japanese'},
        {label:'Russian',value:'Russian'}
       ]}
       defaultValue={fromLang}
       style={styles.dropdown}
       containerStyle={{flex:1}}
       onChangeItem = {(item)=>{
        setFromLang(item.value)

       }

       
      }
      textStyle={{
        fontSize: 16,
        color: '#FFFA7D', // Change the color here
        textAlign:'left',
        padding:10,
        

      }}
      arrowColor="#FFFA7D" // Change the arrow color here
      dropDownStyle={{ backgroundColor: '#FFFA7D' }}
      dropDownContainerStyle={{ backgroundColor: '#333333' }}
      
       />
         <DropDownPicker
       open= {openTo}
       value={toLang}
       setOpen={setOpenTo}
       setValue={setToLang}
       items={[
        {label:'English',value:'English'},
        {label:'Arabic',value:'Arabic'},
        {label:'French',value:'French'},
        {label:'Spanich',value:'Spanich'},
        {label:'Hebrew',value:'Hebrew'},
        {label:'Latin',value:'Latin'},
        {label:'Italian',value:'Italian'},
        {label:'Japanese',value:'Japanese'},
        {label:'Russian',value:'Russian'}
       ]}
       defaultValue={toLang}
       style={styles.dropdown2}
       containerStyle={{flex:1,alignItems:'center'}}
       onChangeItem = {(item)=>{
        setToLang(item.value)
       }
      }
      textStyle={{
        fontSize: 16,
        color: '#FFFA7D', // Change the color here
        textAlign:'left',
        padding:10,
      }}
      arrowColor="#FFFA7D" // Change the arrow color here
      dropDownStyle={{ backgroundColor: '#FFFA7D' }}
      dropDownContainerStyle={{ backgroundColor: '#333333' }}      >

       </DropDownPicker>

      </View>
      <TextInput style ={styles.input}
                 on onChangeText={text => setInputText(text)}
                 value={inputText}
                 multiline
      >
   
      </TextInput>

      {/* the translated response  */}
      {/* <Text style={styles.text}>translated </Text> */}
      <Text style={styles.transaledRes}>
        {translatedText}

      </Text>
      {/* <View>
      <Image
                  source={require("../assets/languageBox.png")}
                  style={styles.borde1}
                /> 
      </View> */}
      {/* button function */}
      <TouchableOpacity
            style={styles.button}
            onPress={translateText}>
      
            <Text style={styles.textbutton}>Translate Me</Text>
      </TouchableOpacity>
      

    </View>
  )
}

export default TranslatorApp

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#FFFA7D',
      alignItems: 'center',
      justifyContent: 'center',
    },

    title:{
     fontSize:32,
     fontWeight:'bold',
     marginBottom:20,
    //  marginTop:100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.36,
    shadowRadius: 10.0,
    elevation: 11,
    },

    dropdowncontainer:{ // need change the colour 
      flexDirection:'row',
      justifyContent:'space-around',
      // color:'#FFFA7D',
      

    }, 

    dropdown:{ 
      backgroundColor:'#000000',
      borderRadius:30,
      width:160,
      // color:'#FFFA7D',
      // marginTop:50,
      
      
      
    },
    dropdown2:{ 
      backgroundColor:'#000000',
      borderRadius:30,
      width:160,
      // color:'#FFFA7D',
      // marginTop:50,
      
      
    },

    input:{
      height:200,
      width:'95%',
      borderWidth:3,
      borderRadius:30,
      borderColor:'white',
      padding:15,
      marginTop:100,
      fontSize:20,

    },

    button:{
      backgroundColor:'#000000',
      width:200,
      height:50,
      borderRadius:30,
      marginTop:50,
      justifyContent:'center',
      alignItems:'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.36,
      shadowRadius: 10.0,
      elevation: 11,


    },

    textbutton:{
      color:'#ffffff',
      fontSize:20,

    },
    transaledRes:{
      height:200,
      width:'95%',
      borderWidth:3,
      borderRadius:30,
      borderColor:'white',
      padding:20,
      marginTop:50,  
      fontSize:20,

    },

    card: {  
      backgroundColor: 'white',  
      borderRadius: 8,  
      paddingVertical: 45,  
      paddingHorizontal: 25,  
      width: '100%',  
      marginVertical: 10,  
    },  

  
  });
  