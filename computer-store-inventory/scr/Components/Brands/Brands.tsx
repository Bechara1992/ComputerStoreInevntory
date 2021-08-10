/*This function will display all the user added brands and has an option to add a new brand,
or to navigate to the computers page for the selected brand by only clicking on a certain brand name */



import React, { useEffect, useState, useLayoutEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, RefreshControl, ScrollView } from 'react-native';
import { Center } from '../Center';
import { BrandsNavigationProps } from './BrandsParamList';
import axios from 'axios';
import { serveURL } from '../../constants/urls';
import styles from '../Styles/globalStyleSheet.component.style';


interface BrandsProps {
        navigation: any
}

type Brand ={
        ID: number,
        BrandName: string,
        IsActive: boolean
}
export const Brands: React.FC<BrandsProps> = ({ navigation }  : BrandsNavigationProps<'Brands'>) => {

        const [BrandsList, setBrands] = useState([])
        const [refreshing, setRefreshing] = React.useState(false);


        /*This function uses the useEffect hook to subscribe to the focus 
        event on the page and reload the Brands on page load 
        and unsubscribes after the action is done.*/
        useEffect(() => {
                const unsubscribe = navigation.addListener('focus', () => {
                        GetBrands();
                });
                
                    return unsubscribe;
                  }, [navigation]);

        /*This function uses the useLayoutEffect hook in order to add a button to the header 
        of the page. It is used to navigate to the page to add a new brand.*/
        useLayoutEffect(() => {
                navigation.setOptions({
                  headerRight: () => (
                    <TouchableOpacity 
                        onPress={() => navigation.navigate("AddBrand")} 
                        style={styles.GoToAddBrandButton}>
                                <Text>+</Text>
                     </TouchableOpacity>
                  ),
                });
              }, [navigation]);


        /*This function will show an "activity indicator" and load all entered brands and sets them to be shown in the list, 
        and then hides the "activity indicator"*/
        function GetBrands(){
                setRefreshing(true);
                axios({
                        method: "get",
                        url: `${serveURL}api/brands`,
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json"
                        }
                      })
                        .then(response => {
                          if (response.data) {
                            var responseJson = response.data.results;
                            setBrands(responseJson);
                            setRefreshing(false)
                          }
                        })
                        .catch(error => {
                                console.log(error);
                        });
        }

        return (
                <ScrollView style={styles.screen}
                        refreshControl={
                                <RefreshControl
                                refreshing={refreshing}
                                onRefresh={GetBrands}
                                />
                        }>
                        
                        <View>
                                <Center>
                                        <Text style={styles.PageHeader}>Brands ({BrandsList.length})</Text>                                
                                </Center>
                        </View>                        
                                <FlatList<Brand>
                                        data={BrandsList}
                                        style={styles.IetmsListStyle}
                                        renderItem={({item}) => 
                                        
                                        <TouchableOpacity 
                                                onPress={() => {
                                                        navigation.navigate("Computers", {
                                                                BrandID: item.ID
                                                        })
                                                }}>
                                                        <View>
                                                                <Text style={[styles.ListItem, styles.ListItemSeparator]}>{item.BrandName}</Text>
                                                        </View>
                                        </TouchableOpacity>
                                        
                                        }
                                />
                </ScrollView>
        );        
}