import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React,{useState} from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import axios from 'axios'

const TranslatorApp  = () => {
  // defention ,default language
  const [inputText,setInputText]=useState('');
  const [translatedText,setTranslatedText]=useState('');
  const [fromLang,setFromLang]=useState('English');
  const [toLang,setToLang]=useState('Arabic');
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const API_KEY='your-api-key';


  const translateText = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a translator.' },
            { role: 'user', content: `Translate from ${fromLang} to ${toLang}: ${inputText}` },
          ],
          max_tokens: 500,
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
      console.error('Error in translating the text:', error?.response?.data || error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
        color: '#FFFA7D', 
        textAlign:'left',
        padding:10,
        

      }}
      arrowColor="#FFFA7D" 
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
        color: '#FFFA7D',
        textAlign:'left',
        padding:10,
      }}
      arrowColor="#FFFA7D" 
      dropDownStyle={{ backgroundColor: '#FFFA7D' }}
      dropDownContainerStyle={{ backgroundColor: '#333333' }}      >

       </DropDownPicker>

      </View>
      <TextInput 
  style={styles.input}
  onChangeText={text => setInputText(text)} 
  value={inputText}
  multiline
  onSubmitEditing={translateText}
/>


      <Text style={styles.transaledRes}>
        {translatedText}

      </Text>
  
      <TouchableOpacity
            style={styles.button}
            onPress={translateText}>
      
            <Text style={styles.textbutton}>Translate Me</Text>
      </TouchableOpacity>
      

    </View>
    </TouchableWithoutFeedback>

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

    dropdowncontainer:{ 
      flexDirection:'row',
      justifyContent:'space-around',
      

    }, 

    dropdown:{ 
      backgroundColor:'#000000',
      borderRadius:30,
      width:160,
   
      
      
      
    },
    dropdown2:{ 
      backgroundColor:'#000000',
      borderRadius:30,
      width:160,
    
      
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
  