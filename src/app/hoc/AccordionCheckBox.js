import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {useTheme} from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

// UI
import Typography from 'src/components/Typography';
import Icon from 'src/components/Icons';
import UserItem from '../components/UserItem';

const AccordionCheckBox = ({
  header,
  data,
  onSelecteeMembers,
  defaultOpen = false,
}) => {
  const [members, setMembers] = useState(data);
  const [isOpen, toggleOpen] = useState(defaultOpen);
  const {colors} = useTheme();

  const handleChange = id => {
    let temp = members.map(member => {
      if (id === member.id) {
        return {...member, isChecked: !member.isChecked};
      }
      return member;
    });
    let sortedMembers = temp.filter(member => member.isChecked);
    onSelecteeMembers(sortedMembers);
  };
  return (
    <Collapse
      style={styles(colors).container}
      isExpanded={isOpen}
      onToggle={() => toggleOpen(!isOpen)}>
      <CollapseHeader>
        <Header title={header.title} count={header.count} isOpen={isOpen} />
      </CollapseHeader>
      <CollapseBody>
        <Body items={data} onPress={handleChange} />
      </CollapseBody>
    </Collapse>
  );
};

const Header = ({title, count, isOpen}) => {
  const {name, colors} = useTheme();
  return (
    <View
      style={{
        ...styles(colors).header,
        backgroundColor: colors.headerBackground,
      }}>
      <Typography text={title} />
      <View style={styles(colors).wrapper}>
        <Typography
          text={count}
          customStyles={{color: name === 'dar' ? '$fff' : '#94A3B8'}}
        />
        <View style={{transform: [{rotate: isOpen ? '270deg' : '180deg'}]}}>
          <Icon
            name="Chevron-left-1"
            color={name === 'dar' ? '$fff' : '#94A3B8'}
          />
        </View>
      </View>
    </View>
  );
};

const Body = ({items, onPress}) => {
  const {colors} = useTheme();
  const renderItem = ({item}) => (
    <View style={{margin: 5}}>
      <View>
        <View style={styles(colors).containerCard}>
          <BouncyCheckbox
            isChecked={item.isChecked}
            iconStyle={{borderColor: '#2563EB'}}
            unfillColor="transparent"
            fillColor="#2563EB"
            onPress={() => onPress(item.id)}
          />
          <View style={styles(colors).userItem}>
            <UserItem
              imgSrc={item.imgUrl}
              firstName={item.f_name}
              lastName={item.l_name}
              location={item.location}
              role={item?.role}
            />
          </View>
        </View>
      </View>
    </View>
  );
  return (
    <View>
      <FlatList
        nestedScrollEnabled
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = colors => {
  return StyleSheet.create({
    container: {
      marginBottom: 2,
    },
    header: {
      padding: 12,
      paddingLeft: 16,
      paddingRight: 16,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: 44,
      borderStyle: 'solid',
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      width: 20,
      height: 20,
      backgroundColor: colors.checkbox?.bg,
      borderRadius: 10,
      borderWidth: 3,
      borderColor: colors.checkbox?.br,
      marginRight: 8,
    },
    containerCard: {
      marginLeft: 12,
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 16,
    },
    userItem: {
      paddingRight: 40,
      width: '100%',
    },
  });
};

export default AccordionCheckBox;
