/*This page has a template for the computers list. 
It will show computers and when the computer name is 
clicked it will show the additional information of the computer.
It has as well edit and delete buttons.*/



import React from 'react'
import { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button, Image } from 'react-native';
import { Computer } from '../../Models/Computer.model';
import { Center } from '../Center';
import styles from '../Styles/globalStyleSheet.component.style';

interface ComputerListItemProps {
  item:Computer,
  EditComputer: CallableFunction,
  DeleteComputer: CallableFunction
}

export const ComputerListItem: React.FC<ComputerListItemProps> = ({ item, EditComputer, DeleteComputer }) => {

    const [Expanded, setExpanded] = useState(false);

    function EditItem(item: Computer){
      EditComputer(item)
    }

    function DeleteItem(ID: number){
      DeleteComputer(ID)
    }


   

        return (
                <TouchableOpacity style={styles.computerListItemContainer}>
                <Text style={styles.ListItem} onPress={() => setExpanded(!Expanded)}>{item.DeviceName}</Text>
                {Expanded && 
                    <View>
                      <Text style={styles.detailsText}><Text style={styles.ComputerListItemDesc}>Brand:</Text> {item.BrandName}</Text>
                      <Text style={styles.detailsText}><Text style={styles.ComputerListItemDesc}>Model Number:</Text> {item.ModelNumber}</Text>
                      <Text style={styles.detailsText}><Text style={styles.ComputerListItemDesc}>Memory:</Text> {item.Mem}</Text>
                      <Text style={styles.detailsText}><Text style={styles.ComputerListItemDesc}>CPU Specs:</Text> {item.CPUSpecs}</Text>
                      <Text style={styles.detailsText}><Text style={styles.ComputerListItemDesc}>Graphics Card:</Text> {item.GraphicsCard}</Text>
                      <Text style={styles.detailsText}><Text style={styles.ComputerListItemDesc}>Quantity:</Text> {item.Quantity}</Text>
                      {item.Image != '' ? <Image style={styles.image} source={{uri: `data:image/jpg;base64,${item.Image}`}}/>: null}
                      <TouchableOpacity onPress={()=>EditItem(item)}>
                        <Center>
                          <Text style={[styles.FormButtons, styles.EditButton]}>Edit</Text>
                        </Center>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>DeleteItem(item.ID)}>
                        <Center>
                          <Text style={[styles.FormButtons, styles.DeleteButton]}>Delete</Text>
                        </Center>
                      </TouchableOpacity>
                    </View>
                    }
                
                </TouchableOpacity>
        );
}