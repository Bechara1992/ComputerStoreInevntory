/*In this page the user will be able to either add or edit a 
computer based on whether the navigation to the page using the 
add button or the edit button in the item details. 
The form validation is from the react-hook-form and validation 
criteria were added to validate the form before sending the request.*/


import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, TextInput, Button, ScrollView, Image } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { BrandsNavigationProps, BrandsParamList } from '../Brands/BrandsParamList';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import Modal from "react-native-modal";
import { RouteProp, useRoute } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
import styles from '../Styles/globalStyleSheet.component.style'

interface AddEditComputerProps {
    navigation: any
}

type Brand ={
    ID: number,
    BrandName: string,
    IsActive: boolean
}

type ListItemTemp ={
    value: number,
    label: string
}


export const AddEditComputer: React.FC<AddEditComputerProps> = ({ navigation }  : BrandsNavigationProps<'AddEditComputer'>) => {
    
    const route = useRoute<RouteProp<BrandsParamList, 'AddEditComputer'>>();
    const { device } = route.params
    const { control, register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm();
    const [BrandsList, setBrands] = useState<ListItemTemp[]>([]);
    const [selectedBrandID, setSelectedBrandID] = useState<number | 0>(0);
    const [selectedBrandLabel, setSelectedBrandLabel] = useState<string | ''>('');
    const [pickedImagePath, setPickedImagePath] = useState('');    
    const [pickedImageBase64, setPickedImageBase64] = useState('');    
    const [ShowModal, setModalVisibility] = useState(false);


    /*This part uses the useEffect hook to subscribe to the focus event on the page and reload the brands on page load 
    and unsubscribes after the action is done.*/
    useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                    GetBrands();
            });
            
                return unsubscribe;
            }, [navigation]);



    /*When choosing the image from gallery option is clicked this function will ask the user for permission the first time, 
    then will open the photo gallery and allow the user to choose an image and edit it.
    It will then show it, resize it and save it as a base64 Image*/
    const showImagePicker = async () => {
        setModalVisibility(false)
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: true
        });
    
    
        if (!result.cancelled) {
            setPickedImagePath(result.uri);
            const manipResult : any = await ImageManipulator.manipulateAsync(
            result.uri,
            [{ resize: { width: 250, height: 250 } }],
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
            ); 
            setPickedImageBase64(manipResult.base64)
        }
    }
        
        
    /*When choosing the image from camera option is clicked this function will ask the user for permission the first time, 
    then will open the camera and allow the user to take a picture and edit it.
    It will then show it, resize it and save it as a base64 Image*/
    const openCamera = async () => {
        
        setModalVisibility(false)
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result
            = await ImagePicker.launchCameraAsync({
            allowsEditing: true
        });

        if (!result.cancelled) {
            setPickedImagePath(result.uri);
            let imwidth = result.width;
            let imheight = result.height;
            const manipResult : any = await ImageManipulator.manipulateAsync(
            result.uri,
            [{ resize: { width: imwidth*0.15, height: imheight*0.15 } }],
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
            ); 
            setPickedImageBase64(manipResult.base64)
        }
    }


    /*This function will handle the submit button press and will check whether the action is to add or edit a computer.
    It will creact a params object that will be passed to the api.*/
    const onSubmit = handleSubmit(data => {

        let params={
            ID: device? device.ID : null,
            ComputerName: data.ComputerName,
            Brand: data.Brand,
            ModelNumber: data.ModelNumber,
            Memory: data.Memory,
            CPUSpecs: data.CPUSpecs,
            GraphicsCard: data.GraphicsCard,
            Quantity: data.Quantity,
            Img: pickedImageBase64
        }
        if(device){
            axios({
                method: "post",
                url: `http://192.168.3.106:8080/api/devices/update`,
                data: JSON.stringify(params),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                }
              })
                .then(response => {
                  if (response.data) {
                    var responseJson = response.data;
                    navigation.goBack()
                    if (responseJson.HasError) {
                    } else {
                    }
                  }
                })
                .catch(error => {
                    console.log(error)
            })
        }else{
        axios({
            method: "post",
            url: `http://192.168.3.106:8080/api/devices`,
            data: JSON.stringify(params),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            withCredentials: true
          })
            .then(response => {
              if (response.data) {
                var responseJson = response.data;
                navigation.goBack()
                if (responseJson.HasError) {
                } else {
                }
              }
            })
            .catch(error => {
                alert(error)
                console.log(error)
            });
        }
    });


    /*This function will handle the change of the brand and set the new brand*/
    function changeBrand(value: number){
        if(value != null && BrandsList.length > 0){
        var SelectedBrand: ListItemTemp = {value: 0, label: ''}
        BrandsList.forEach(br => {
            if(br.value === value){
                SelectedBrand = br
            }
        })
        setSelectedBrandID(value)
        setSelectedBrandLabel(SelectedBrand.label)}
    }


    /*This function will fetch the already defined brands from the database for the select control .*/
    function GetBrands(){
        axios({
                method: "get",
                url: `http://192.168.3.106:8080/api/brands`,
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                }
              })
                .then(response => {
                  if (response.data) {
                    var responseJson = response.data.results;
                    var newResults = responseJson.map((res: Brand) =>{
                        return{value: res.ID, label: res.BrandName}
                    })
                    setBrands(newResults)
                    FillForm();
                  }
                })
                .catch(error => {
                        var a = 2;
                });
        }
        
        /*This function will check on whether a computer is passed to the page and 
        identify the page as either add or edit computer. If it is an edit page the form will be filled
        by the data passed to the page  */
        function FillForm(){
            if(device){
                
                setValue('Brand', device.BrandID, { shouldDirty: true })
                setSelectedBrandID(device.BrandID);
                setValue('ComputerName', device.DeviceName, { shouldDirty: true })
                setValue('ModelNumber', device.ModelNumber, { shouldDirty: true })
                setValue('Memory', device.Mem, { shouldDirty: true })
                setValue('CPUSpecs', device.CPUSpecs, { shouldDirty: true })
                setValue('GraphicsCard', device.GraphicsCard, { shouldDirty: true })
                setValue('Quantity', device.Quantity.toString(), { shouldDirty: true })
                setPickedImagePath(`data:image/jpg;base64,${device.Image}`)
                setPickedImageBase64(device.Image)
            }
        }






        return (
            <ScrollView style={styles.screen}>                
                
                <Text>Device Name</Text>
                <Controller
                    control={control}
                    rules={{
                    required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder='Computer Name'
                    />
                    )}
                    name="ComputerName"
                    defaultValue=""
                />
                {errors.ComputerName && <Text style={styles.ErrorText}>Device Name is required.</Text>}

                <Text>Brand</Text>
                <Controller
                    control={control}
                    rules={{
                    required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <RNPickerSelect
                            onValueChange={(value) => {changeBrand(value)
                                onChange(value)}}
                            {...register('Brand', {
                                required: true
                            })}
                            items={BrandsList}
                            value={selectedBrandID}
                        >
                            <Text>{selectedBrandLabel}</Text>
                        </RNPickerSelect>
                    )}
                    name="Brand"
                    />
                {errors.Brand && <Text style={styles.ErrorText}>Brand is required.</Text>}

                <Text>Model Number</Text>
                <Controller
                    control={control}
                    rules={{
                    required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder='Model Number'
                        />
                    )}
                    name="ModelNumber"
                    defaultValue=""
                />
                {errors.ModelNumber && <Text style={styles.ErrorText}>Model Number is required.</Text>}

                <Text>Memory</Text>
                <Controller
                    control={control}
                    rules={{
                    required: false,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder='Memory'
                        />
                    )}
                    name="Memory"
                    defaultValue=""
                />

                <Text>CPU Specs</Text>
                <Controller
                    control={control}
                    rules={{
                    required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder='CPU Specs'
                        />
                    )}
                    name="CPUSpecs"
                    defaultValue=""
                />
                {errors.CPUSpecs && <Text style={styles.ErrorText}>Graphics Card is required.</Text>}

                <Text>CPU Specs</Text>
                <Controller
                    control={control}
                    rules={{
                    required: false,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder='Graphics Card'
                        />
                    )}
                    name="GraphicsCard"
                    defaultValue=""
                />

                <Text>Quantity</Text>
                <Controller
                    control={control}
                    rules={{
                    required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder='Quantity'
                            keyboardType = 'numeric'
                        />
                    )}
                    name="Quantity"
                    defaultValue=""
                />
                {errors.Quantity && <Text style={styles.ErrorText} >Quantity is required.</Text>}

                <View style={styles.imageContainer}>
                    {
                    pickedImagePath !== '' && <Image
                        source={{ uri: pickedImagePath }}
                        style={styles.image}
                    />
                    }
                </View>

                <Modal isVisible={ShowModal}>
                    <View>
                    <TouchableOpacity 
                        onPress={openCamera}
                        style={styles.SubmitButton}>
                        <Text style={styles.SubmitButtonText}>Photo From Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={showImagePicker} 
                        style={styles.SubmitButton}>
                        <Text style={styles.SubmitButtonText}>Photo From Gallery</Text>
                    </TouchableOpacity>
                    </View>
                </Modal>

                <Button onPress={() => {setModalVisibility(true)}} title="Add Photo" />

                <Button title="Submit" onPress={onSubmit} />

                
            </ScrollView>
        );
}