/*This page displays the list of computers for the selected Brand, 
once the computer name is clicked additional information will be shown,
which allows the user as well to either edit or delete the item. 
There is a button in the header on the right of the screen as well that 
allows the user to add  a new item*/


import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, RefreshControl, ScrollView } from 'react-native';
import { BrandsNavigationProps, BrandsParamList } from '../Brands/BrandsParamList';
import axios from 'axios';
import { ComputerListItem } from './ComputerListItem';
import { Computer } from '../../Models/Computer.model'
import { RouteProp, useRoute } from '@react-navigation/native';
import { serveURL } from '../../constants/urls';
import styles from '../Styles/globalStyleSheet.component.style';
import { Center } from '../Center';
import Modal from "react-native-modal";

interface ComputersProps {
    navigation: any
}

export const Computers: React.FC<ComputersProps> = ({ navigation }  : BrandsNavigationProps<'Computers'>) => {


  const route = useRoute<RouteProp<BrandsParamList, 'Computers'>>();
  const { BrandID } = route.params
  const [ComputersList, setComputers] = useState([])
  const [showConfirmationModal, setShowconfirmationModal] = useState(false)
  const [ComputerID, setComputerID] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);


  /*This function uses the useEffect hook to subscribe to the focus 
  event on the page and reload the computers on page load 
   and unsubscribes after the action is done.*/
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        GetComputers();
    });
    
        return unsubscribe;
      }, [navigation]);


  /*This function uses the useLayoutEffect hook in order to add a button to the header 
  of the page. It is used to navigate to the page to add a new computer.*/
  useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity 
                onPress={() => navigation.navigate("AddEditComputer", {
                  device: undefined
                })} 
                style={styles.GoToAddBrandButton}>
                        <Text>+</Text>
             </TouchableOpacity>
          ),
        });
      }, [navigation]);


  /*This function will show an "activity indicator" and load all entered computers and sets them to be shown in the list, 
  and then hides the "activity indicator"*/
  function GetComputers(){
    setRefreshing(true);
    axios({
            method: "get",
            url: `${serveURL}api/devices/${BrandID}`,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
            .then(response => {
              if (response.data) {
                var responseJson = response.data.results;
                setComputers(responseJson)                
                setRefreshing(false);
              }
            })
            .catch(error => {
              console.log(error)
            });
  }
    
  /*This function will navigate to the AddEditcomputer page on Edit button click 
  and pass the corresponding computer object to be edited*/
  function EditComputer(item: Computer){
    navigation.navigate("AddEditComputer", {
      device: item
    })
  }


  /*This function will open a confirmation message for a computer deletion action*/
  function DeleteComputer(ID: number){
    setShowconfirmationModal(true);
    setComputerID(ID);
  }


  function DeleteComputerConfirmed(){
    setShowconfirmationModal(false);
    setRefreshing(true);
    axios({
      method: "get",
      url: `${serveURL}api/devices/delete/${ComputerID}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.data) {
          GetComputers();
        }
      })
      .catch(error => {
        console.log(error)
      });
  }


        return (
          <ScrollView style={styles.screen} refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={GetComputers}
                        />
                      }>
            <View>
              <Center>
                <Text style={styles.PageHeader}>Computers ({ComputersList.length})</Text>                                
              </Center>
            </View>            
            <FlatList<Computer>
                    data={ComputersList}
                    style={styles.IetmsListStyle}
                    renderItem={({item}) => 
                        <ComputerListItem EditComputer={EditComputer} DeleteComputer={DeleteComputer} item={item}/>
                    
                    }
            />
            <Modal isVisible={showConfirmationModal}
                onBackdropPress ={() => {setShowconfirmationModal(false)}}>
                  <View style={styles.ModalDesign}>
                  <Text style={styles.confirmationModalHeader}>Are you sure you want to remove this item?</Text>
                  
                  <TouchableOpacity onPress={DeleteComputerConfirmed}
                       style={[styles.FormButtons, styles.EditButton]}>
                      <Center>
                        <Text style={styles.FormButtonsText}>Yes</Text>
                      </Center>
                  </TouchableOpacity>
                    
                  <TouchableOpacity style={[styles.FormButtons, styles.DeleteButton]}                  
                    onPress={()=> setShowconfirmationModal(false)}>
                      <Center>
                        <Text style={styles.FormButtonsText}>No</Text>
                      </Center>
                  </TouchableOpacity>
                  </View>
            </Modal>
          </ScrollView>
        );
}
