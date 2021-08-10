/*This page renders a navigation container for a stack navigation
with the corresponding pages under it.*/



import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Brands } from './Components/Brands/Brands';
import { AddBrand } from './Components/Brands/AddBrand';
import { Computers } from './Components/Computers/Computers';
import { AddEditComputer } from './Components/Computers/AddEditComputer';
import { BrandsParamList } from './Components/Brands/BrandsParamList';
import { Button } from 'react-native';

interface RoutesProps {

}

const Stack = createStackNavigator<BrandsParamList>();

export const Routes: React.FC<RoutesProps> = ({}) => {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Brands"
                    options={{
                        headerRight: () => (
                            <Button
                              onPress={() => alert('This is a button!')}
                              title="Info"
                              color="#fff"
                            />
                          )
                    }}
                     component={Brands} />
                    <Stack.Screen name="AddBrand" component={AddBrand} />
                    <Stack.Screen name="Computers" component={Computers} />
                    <Stack.Screen name="AddEditComputer" component={AddEditComputer} />
                </Stack.Navigator>
            </NavigationContainer>
        );
}