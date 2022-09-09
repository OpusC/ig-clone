import { View, Text, TextInput, StyleSheet, TouchableOpacity, Pressable, Alert } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import { authentication } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { db } from '../../firebase'
import { doc, setDoc} from 'firebase/firestore'

const SignupForm = ({ navigation }) => {
    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        username: Yup.string().required().min(2, 'A username is required'),
        password: Yup.string().required().min(8, 'Your password has to have at least 8 characters')
    })

    const onSignUp = async (email, password, username) => {
        try {
            const authUser = await createUserWithEmailAndPassword(authentication, email, password)
            console.log('Firebase User Created Successfully ' + username + ' ' + password)

            await setDoc(doc(db, 'users', 'users'),
            {
                owner_uid: authUser.user.uid,
                username: username,
                email: authUser.user.email,
                profile_picture: await getRandomProfilePicture(),
            })
            
        } catch (error) {
            Alert.alert('Error', error.message)
        }
    }

    const getRandomProfilePicture = async () => {
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json()
        return data.results[0].picture.large
    }


    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ email: '', username: '', password: '' }}
                onSubmit={(values) => {
                    onSignUp(values.email, values.password, values.username)
                }}
                validationSchema={SignupFormSchema}
                validateOnMount={true}>

                {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
                    <>
                        <View
                            style={[styles.inputField, {
                                borderColor: values.email.length < 1 || Validator.validate(values.email)
                                    ? '#ccc'
                                    : 'red'
                            },
                            ]}
                        >
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='Email'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                autoFocus={true}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                        </View>
                        <View
                            style={[styles.inputField, {
                                borderColor: 1 > values.username.length || values.username.length >= 2
                                    ? '#ccc'
                                    : 'red'
                            },
                            ]}
                        >
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='Username'
                                autoCapitalize='none'
                                keyboardType='username'
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                        </View>

                        <View
                            style={[styles.inputField, {
                                borderColor: 1 > values.password.length || values.password.length >= 8
                                    ? '#ccc'
                                    : 'red'
                            },
                            ]}
                        >
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='Password'
                                autoCapitalize='none'
                                secureTextEntry={true}
                                textContentType='password'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>

                        <Pressable titleSize={20}
                            style={styles.button(isValid)}
                            onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </Pressable>
                        <View style={styles.loginContainer}>
                            <Text>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text style={{ color: '#6BB0F5' }}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 80,
        paddingHorizontal: 12,
    },
    inputField: {
        borderRadius: 4,
        padding: 12,
        backgroundColor: '#FAFAFA',
        marginBottom: 10,
        borderWidth: 1,
    },
    loginContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 60
    },
    button: isValid => ({
        backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4,
        marginTop: 50
    }),
    buttonText: {
        fontWeight: '400',
        color: '#fff',
        fontSize: 20,

    }
})

export default SignupForm