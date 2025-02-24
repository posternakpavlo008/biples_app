import React, { useState, useEffect, useRef } from 'react'
import {
    ImageBackground, 
    View, 
    Text, 
    StatusBar, 
    StyleSheet, 
    Image,
    SafeAreaView,
    ScrollView,
    TouchableOpacity, 
    useWindowDimensions,
    BackHandler
} from 'react-native';
import { vh, vw } from 'react-native-css-vh-vw';
import Svg, { Path } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import CustomButton from "../../components/customButton"
import LinearGradient from 'react-native-linear-gradient';
import CustomImageButton from '../../components/customImageButton'
import CustomInputBox from "../../components/customInputBox";
import CustomSwitchButton from "../../components/customSwitchButton"; 
// import { CodeField, Cursor } from 'react-native-confirmation-code-field';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import PhoneInput from 'react-native-phone-input'; 
import RadialGradient from 'react-native-radial-gradient';

const CELL_COUNT = 5;

const CreateAccountInfo = ({ navigation }) => {

    const useremail = "yazidelkherrati@gmail.com";
    const message = "The password entered is not matched!"
    const windowWidth = useWindowDimensions().width;

    const bottomRef = useRef(null);
    const [isName, setIsName] = useState(false);
    const [compareName, setCompareName] = useState(true);
    const [isKeypad, setIsKeypad] = useState(false);
    const [userName, setUserName] = useState('');
    const [phoneNumber,setPhoneNumber] = useState(0);
    const [password, setPassword] = useState('');
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);

    handleUserName = (text) => {
        setUserName(text);
        if (text !== '') setIsName(true);
        else setIsName(false);
    }
    handlePassword = (text) => {
        setPassword(text);
    }
    const handlePhoneNumberChange = (number) => {
        setPhoneNumber(number);
    };

    return (
        <View>
            <StatusBar 
                translucent backgroundColor="transparent"
            />
            <View style={styles.container}>
                <View style = {styles.titleBar}>
                    <TouchableOpacity 
                        style = {styles.prevButton}
                        onPress = {() => navigation.goBack()}
                    >
                        <Svg width={windowWidth*0.02} height={0.033*windowWidth} viewBox='0 0 7 12' fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M6 1L1 6L6 11" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </Svg>

                    </TouchableOpacity>
                    <Text style = {[styles.maintitle, {fontFamily: 'TT Firs Neue Trial Medium'}]}>
                        Login or Signup
                    </Text>
                    <Text styles= {{width: vw(9), height: '100%'}}>&nbsp;&nbsp;&nbsp;</Text>
                </View>
                <View style = {styles.title}>
                    {/* <Svg  style={{ marginBottom: vw(5) }}
                        width={vw(11.6)} height={vw(10.5)} viewBox='0 0 42 38' fill="none" xmlns="http://www.w3.org/2000/svg"
                    >
                        <Path d="M32.9402 12.8179L17.997 12.8281L16.1062 19.3364H30.9576L27.1046 32.5212L15.1736 32.5721C12.9056 32.5823 11.2594 30.4061 11.8914 28.2248L20.0612 0H8.15559L0.357841 26.7162C-1.28835 32.3632 2.95199 38.0102 8.83852 38L37.1856 37.9541L41.3087 24.0099C42.96 18.419 38.7706 12.8128 32.9402 12.8179Z" fill="#53FAFB"/>
                        <Path d="M20.1323 25.7784H18.8429L19.7195 22.8479H22.65L22.2423 24.2087C21.962 25.1414 21.1058 25.7784 20.1323 25.7784Z" fill="white"/>
                        <Path d="M25.0354 25.7784H23.6288L24.5054 22.8479H27.4359L26.9925 24.3208C26.7326 25.1872 25.9375 25.7784 25.0303 25.7784" fill="white"/>
                    </Svg> */}
                    <Text style = {[styles.maintitle, {marginBottom: vw(5), marginTop: vw(10)}]}>
                        Create your account, {'\n'}
                        Signup Now!
                    </Text>
                    <Text style = {styles.subtitle}>
                        We have sent the verification OTP {'\n'}
                        to {useremail}
                    </Text>
                </View>
                <View style = {styles.mainpad}>                            
                    <CustomInputBox
                        placeholder="Type your Email"
                        image={require('../../../assets/images/user.png')}
                        width={vw(90)}
                        height={vw(12.5)}
                        backgroundColor="#202020"
                        onchangeText={this.handleUserName}
                        icon={isName? require('../../../assets/images/check.png') : ''}
                    />
                    <PhoneInput
                        initialCountry="fr"
                        value={phoneNumber}
                        onChangePhoneNumber={handlePhoneNumberChange}
                        textProps={{ style: { color: 'white', fontSize: vw(3.8), fontFamily: 'TT Firs Neue Trial Regular'} }}
                        style={{
                            backgroundColor: '#202020',
                            borderRadius: vw(4.2),
                            paddingLeft: vw(8),
                            width: vw(90),
                            height: vw(12.5),
                            marginBottom: vw(5),
                            marginTop: vw(2.5)
                        }}
                        // textInputStyle={styles.textInputStyle}
                    />               
                    <CustomInputBox
                        placeholder="Type your password"
                        image={require('../../../assets/images/lock.png')}
                        width={vw(90)}
                        height={vw(12.5)}
                        backgroundColor="#202020"
                        icon={isVisiblePassword ? require('../../../assets/images/eyeoff.png') : require('../../../assets/images/eyeoff.png')}
                        onchangeText={this.handlePassword}
                        isVisiblePassword={isVisiblePassword}
                        setIsVisiblePassword={setIsVisiblePassword}
                    />
                    <View style = {styles.continueButton}>
                        <CustomButton
                            navigation={ navigation }
                            title="Create account"
                            width={vw(90)}
                            height={'100%'}
                            backgroundColor={(isName || (password !== '') || ((phoneNumber !== '+') && (phoneNumber != ''))) ? "#53FAFB" : "#202020"}  
                            color={(isName || (password !== '') || ((phoneNumber !== '+') && (phoneNumber != ''))) ? 'black' : '#4C4C4C'}
                            fontSize={vw(3.9)}
                            onPress={() => {
                                if ((isName !== '') && (phoneNumber.length > 8)&&(password !== '')){
                                    navigation.navigate('CreateAccountLoading')
                                }}
                            }
                        />
                    </View>
                </View>
                <View style = {styles.footer}>
                    {
                        compareName ? 
                            <Text style = {styles.compareName}> </Text>
                            :
                            <Text style = {styles.compareName}>{message}</Text>
                    }
                    <View style = {styles.foot}>
                        <TouchableOpacity onPress={() => {
                            // setLoadingNumber(loadingNumber+1)
                            navigation.goBack();
                        }}>
                            <Svg width={vw(5.3)} height={vw(5.3)} viewBox='0 0 19 19' fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M18.2083 9.5L4.74998 9.5" stroke="#F2F2F2" stroke-width="1.1875" stroke-linecap="round" stroke-linejoin="round"/>
                                <Path d="M9.5 14.25L4.75 9.5L9.5 4.75" stroke="#F2F2F2" stroke-width="1.1875" stroke-linecap="round" stroke-linejoin="round"/>
                            </Svg>
                        </TouchableOpacity>
                        <Text style = {styles.confirmQuestion}>
                            &nbsp;Back to 
                        </Text>
                        <TouchableOpacity style = {styles.confirmQuestion}
                            onPress = {() =>navigation.navigate('Login')}
                        >
                        <Text 
                            style = {[styles.confirmQuestion, {color: "#53FAFB", marginTop: 0}]}
                        >
                            &nbsp;Login
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: vw(101),
        height: '100%',
        backgroundColor: '#151515',
        flexDirection: 'column',
    },
    titleBar: {
        paddingTop: vw(16),
        width: vw(100),
        aspectRatio: 360/90,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: vw(5),
        paddingRight: vw(5)
    },
    prevButton: {
        width: vw(9),
        aspectRatio: 1/1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff20',
        borderRadius: vw(5),
        padding: vw(2.5)
    },
    prevImage: {
        width: '20%',
        height: '40%',
        resizeMode: 'contain',
        borderRadius: vw(9)
    },
    title: {
        padding: vw(2),
        paddingLeft: vw(10),
        aspectRatio: 360/155
    },
    maintitle: {
        color: 'white',
        fontSize: vw(5.6),
        fontFamily: 'NeueMetana-Bold'
        // padding: 10,
        // textAlign: 'center'
    },
    subtitle: {
        color: '#4C4C4C',
        fontSize: vw(3.9),
        fontFamily: 'TT Firs Neue Trial Regular'
        // padding: 10,
        // textAlign: 'center'
    },
    mainpad: {
        width: vw(100),
        aspectRatio: 360/340,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    continueButton: {
        width: vw(100),
        height: vw(12.5),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: vw(7)
    },
    footer: {
        // margin: 10,
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: vw(100),
        height: vw(39),
        top: vh(80),
    },
    arrow: {
        marginRight: vw(1.4)
    },
    compareName: {
        color: '#FF5252',
        textAlign: 'center',
        marginBottom: vw(29.2),
        fontFamily: 'TT Firs Neue Trial Regular'
    },
    confirmQuestion: {
        // margin: 10,
        fontSize: vw(3.3),
        flexDirection: 'row',
        color: 'white',
        fontFamily: 'TT Firs Neue Trial Regular'
    },
    foot: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default CreateAccountInfo;