import { View, Text, Image, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'react-native-elements'
import validUrl from 'valid-url'

const PLACEHOLDER_IMG = 'https://talentclick.com/wp-content/uploads/2021/08/placeholder-image.png'

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required('A URL is required'),
    caption: Yup.string().max(2200, 'Caption has reached the character limit.')
})

const FormikPostUploader = ({ navigation }) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)


    return (
        <Formik
            initialValues={{ caption: '', imageUrl: '' }}
            onSubmit={(values) => {
                console.log(values)
                console.log('Your post was submitted successfully')
                navigation.goBack()
            }}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
        >
            {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                    <View>

                        <View style={{ margin: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Image style={{ height: 120, width: 120 }} source={{ uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG }} />
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <TextInput
                                    style={{ color: 'white', fontSize: 18 }}
                                    placeholder='Write a caption...'
                                    placeholderTextColor='gray'
                                    multiline={true}
                                    onChangeText={handleChange('caption')}
                                    onBlur={handleBlur('caption')}
                                    value={values.caption}></TextInput>

                            </View>


                        </View>
                        <Divider width={0.2} orientation='vertical' />
                        <TextInput
                            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                            style={{ color: 'white', fontSize: 16, margin: 20 }}
                            placeholderTextColor='gray'
                            placeholder='Enter image url'
                            onChangeText={handleChange('imageUrl')}
                            onBlur={handleBlur('imageUrl')}
                            value={values.imageUrl}>
                        </TextInput>
                        {errors.imageUrl && (
                            <Text style={{ fontSize: 10, color: 'red' }}>
                                {errors.imageUrl}
                            </Text>
                        )}

                        <Button onPress={handleSubmit} title='Share' disabled={!isValid} />

                    </View>
                </TouchableWithoutFeedback>


            )}
        </Formik>
    )
}

export default FormikPostUploader