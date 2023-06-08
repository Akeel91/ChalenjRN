import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import OptionMenuPage from './OptionMenuComponent';
import {ScrollView} from 'react-native-gesture-handler';

const SideMenuComponent = ({
  onClosePressCallback,
  onCreateNewPressCallback,
  onEditPressCallback,
  onDeletePressCallback,
  onCreateChalenjPressCallback,
  onLogoutPressCallback,
}) => {
  return (
    <View style={{position: 'absolute', marginStart: 10, elevation: 15}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        <View style={{elevation: 20, backgroundColor: 'white'}}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onClosePressCallback()}>
            <View
              style={{
                backgroundColor: 'white',
                justifyContent: 'center',
                height: 40,
              }}>
              <Text style={{color: 'black', alignSelf: 'center'}}>Close</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: '#D3D3D3',
              height: 2,
              flex: 2,
            }}></View>
          <OptionMenuPage
            //panelRef.current.togglePanel()
            imageTop={require('../assets/icons/ic_create_folder.png')}
            title="CREATE FOLDER"
            onPressCallback={() => onCreateNewPressCallback()}
          />
          <OptionMenuPage
            imageTop={require('../assets/icons/ic_edit_folder.png')}
            title="EDIT FOLDER"
            onPressCallback={() => onEditPressCallback()}
          />
          <OptionMenuPage
            imageTop={require('../assets/icons/ic_delete_folder.png')}
            title="DELETE FOLDER"
            onPressCallback={() => onDeletePressCallback()}
          />

          <OptionMenuPage
            imageTop={require('../assets/icons/ic_create_chalenj.png')}
            title="Create"
            onPressCallback={() => onCreateChalenjPressCallback()}
          />
          <OptionMenuPage
            imageTop={require('../assets/icons/logout.png')}
            title="Logout"
            onPressCallback={() => onLogoutPressCallback()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SideMenuComponent;
