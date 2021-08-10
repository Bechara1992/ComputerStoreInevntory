import React from 'react'
import { Button, Text, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { BrandsNavigationProps, BrandsParamList } from './BrandsParamList';
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import styles from '../Styles/globalStyleSheet.component.style';

interface AddBrandProps {
    navigation: any
}

type BrandForm = {
    BrandName: string;
  };

export const AddBrand: React.FC<AddBrandProps> = ({ navigation }  : BrandsNavigationProps<'AddBrand'>) => {

    const [ModalResponse, setModalResponse] = useState('');
    const { control, handleSubmit, formState: { errors } } = useForm<BrandForm>();

    const onSubmit = handleSubmit(data => {

        let params={
            BrandName: data.BrandName
        }
        axios({
            method: "post",
            url: `http://192.168.3.106:8080/api/brands`,
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
                
              }
            })
            .catch(error => {
                console.log(error)
            });
    });


        return (
            <View style={styles.screen}>
                <Text>Modal Says {ModalResponse}</Text>
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
                        placeholder='BrandName'
                    />
                    )}
                    name="BrandName"
                    defaultValue=""
                />
                {errors.BrandName && <Text>Brand Name is required.</Text>}

                <Button title="Submit" onPress={onSubmit} />
            </View>
        );
}