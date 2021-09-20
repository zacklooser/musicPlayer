import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';
import albumData from './src/data/album'
//https://www.figma.com/file/2Ty9ZLNVMMWF7sLrVXLWgg/Music-Player-UI-KIT%F0%9F%8E%A7-(Community)?node-id=6%3A1931
const App = () => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const { height, width } = Dimensions.get('window');
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const data = [
    {
      title: "Aenean leo",
      body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      imgUrl: "https://picsum.photos/id/11/200/300"
    },
    {
      title: "In turpis",
      body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
      imgUrl: "https://picsum.photos/id/10/200/300"
    },
    {
      title: "Lorem Ipsum",
      body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
      imgUrl: "https://picsum.photos/id/12/200/300"
    }
  ]
  const renderItem = ({ item }) => (
    <View style={{ marginRight: 20 }} elevation={5}>
      <Image
        style={{ height: 150, width: 150, borderRadius: 15 }}
        source={require('./src/assets/music.jpg')}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.artist}>{item.artist}</Text>
    </View>
  );
  const renderSongItem = ({ item, imgUrl }) => {
    return (
      <View style={{ marginRight: 20 }} elevation={5}>
        <Image
          style={{ height: 250, width: 250, borderRadius: 15, alignSelf: 'center' }}
          source={require('./src/assets/music.jpg')}
        />
        <View style={{ flex:1, flexDirection:'row', marginTop: '5%' }}>
          <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.artist}>{item.title}</Text>
          </View>
          <View>
          <TouchableOpacity>
            <MaterialCommunityIcons name="heart-outline" size={25} color="#8996B8" />
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View>
      <View style={{ flex: 1 }}>
        <Modal isVisible={isModalVisible}
          backdropOpacity={1}
          backdropColor={"white"}
          swipeDirection='down'
          onSwipeComplete={() => setModalVisible(false)}
          onBackdropPress={toggleModal}
          onBackButtonPress={toggleModal}
        >
          <View style={{ flex: 1 }}>
            <View style={[styles.container, { width: '90%' }]}>
              <View style={[styles.header, { marginTop: '5%' }]}>
                <View>
                  <TouchableOpacity onPress={toggleModal}>
                    <MaterialCommunityIcons name="keyboard-backspace" size={25} color="#000" />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Playing Now</Text>
                </View>
                <View>
                </View>
              </View>
              <View style={{ marginTop: '10%' }}>
                <Carousel
                  data={data}
                  renderItem={renderSongItem}
                  sliderWidth={width - 50}
                  itemWidth={width - 150}
                  layout={'default'}
                  firstItem={0}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <TouchableOpacity>
              <Feather name="menu" size={25} color="#000" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Feather name="search" size={25} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={{ marginBottom: '32%' }}>
        <View style={styles.container}>
          <View style={styles.recommandedContainer}>
            <Text style={styles.recommandedText}>Recommended for you</Text>
            <View style={styles.recommandedPlaylist}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={albumData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
          <View style={styles.recommandedContainer}>
            <Text style={styles.recommandedText}>My Playlist</Text>
            <View style={styles.recommandedPlaylist}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={albumData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableWithoutFeedback onPress={toggleModal}>
        <View style={styles.currentPlayer}>
          <View style={{ flex: 0.2 }}>
            <Image
              style={{ height: 70, width: 70, }}
              source={require('./src/assets/music.jpg')}
            />
          </View>
          <View style={{ flex: 0.4, justifyContent: 'center' }}>
            <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Chaff & Dust</Text>
            <Text style={{ fontSize: 11, color: '#8996B8' }}>HAYONA</Text>
          </View>
          <View style={{ flex: 0.4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity>
              <MaterialCommunityIcons name="skip-previous-outline" size={25} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons name="pause" size={25} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons name="skip-next-outline" size={25} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignSelf: 'center',
  },
  header: {
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  recommandedContainer: {
    marginTop: '10%'
  },
  recommandedText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  recommandedPlaylist: {
    flexDirection: 'row',
    marginTop: '3%'
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  artist: {
    textAlign: 'center',
    fontSize: 14,
    color: '#8996B8'
  },
  currentPlayer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: '8%'
  }
})
export default App;
