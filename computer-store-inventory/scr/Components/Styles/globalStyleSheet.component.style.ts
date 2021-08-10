import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 25,
        padding: 15
      },

    PageHeader:{
        fontSize: 22,
        fontWeight: 'bold'
    },
      GoToAddBrandButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginRight: 20,
        borderRadius: 25,
        backgroundColor: '#c2c2c2'
      },
      input:{
          width: '80%',
          borderBottomWidth:1,
          borderBottomColor: 'black',
          paddingTop: 10,
          fontSize: 16,
          minHeight: 40
      },
      SubmitButton:{
          width: '80%',
          borderRadius: 5,
          marginTop: 30,
          minHeight: 40,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: "dodgerblue"
      },
      SubmitButtonText:{
          color: '#ffffff',
          fontSize: 16,
          fontWeight: '600'
      },
      ListItem: {
              height: 35,
              fontSize: 18,
              padding: 5,
              marginBottom: 15,
              fontWeight: 'bold',
              justifyContent: 'flex-start',
              alignSelf: 'flex-start',
              width: '100%'
      },
      ListItemSeparator: {
        borderBottomColor: 'black',
        borderBottomWidth:1
      },
      ErrorText:{
          color: '#ff0000'
      },
      imageContainer: {
        padding: 30
      },
      image: {
        width: 400,
        height: 300,
        resizeMode: 'contain'
      },
      computerListItemContainer: {
        flex: 1,
        padding: 10,
        borderBottomColor: 'black',
        borderBottomWidth:1
      },
      detailsText:{
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10
      },
      buttonContainer: {
        width: 400,
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
      IetmsListStyle:{
          marginTop: 25
      },
      ComputerListItemDesc:{
          textDecorationLine: "underline"
      },
      FormButtons:{
          width: '100%',
          padding: 7,
          marginBottom: 5,
          borderRadius: 8,
          height: 55,
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: 22,
          color: '#ffffff',
      },
      FormButtonsText:{
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 22,
        color: '#ffffff',
      },
      EditButton:{
          backgroundColor: '#4444ff'
      },
      DeleteButton:{
          backgroundColor: '#ff0000'
      },
      ModalContainer:{
        flex: 0.3,
      },
      ModalDesign:{
        flex: 0.3,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 25,
        alignItems: 'center',
        justifyContent: 'space-around'
      },
      FullwidthElement: {
        width: '100%'
      },
      confirmationModalHeader:{
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
      }
})