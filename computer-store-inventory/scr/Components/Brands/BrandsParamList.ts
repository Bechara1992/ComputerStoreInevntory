/*This page defines the props type for the navigation stack for the Brands*/



import { StackNavigationProp } from "@react-navigation/stack"
import { Computer } from '../../Models/Computer.model'

export type BrandsParamList = {
    Brands: undefined;
    AddBrand: undefined;
    Computers: {
        BrandID: number
    };
    AddEditComputer: {
        device?: Computer
    };
}


export type BrandsNavigationProps<T extends keyof BrandsParamList> =
{ navigation: StackNavigationProp<BrandsParamList, T>}