import { View, Text, FlatList, StyleSheet, TextInput, StatusBar} from 'react-native'
import React, { useEffect, useState  } from 'react'
import CoinItem from './components/CoinItem'

const App = () => {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  const loadData = async () => {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
      );
      const data = await res.json();
      setCoins(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#141414'/>
      <View style={styles.header}>
        <Text style={styles.title}>Cripto Market</Text>
        <TextInput style={styles.searchInput}
          placeholder='Search a Coin'
          placeholderTextColor='#909090'
          onChangeText={text => setSearch(text)}
        />
      </View>
      <FlatList style={styles.list}
        data={
          coins.filter(coin => coin.name.toLowerCase().includes(search) 
          || coin.name.toUpperCase().includes(search) 
          || coin.symbol.toUpperCase().includes(search))
        }
        renderItem={({item}) => {
          return <CoinItem coin={item}/>
        }}
        showsHorizontalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={ async () =>{
          setRefreshing(true)
          await loadData();
          setRefreshing(false)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    alignItems: 'center',
    flex: 1
  },
  title:{
    color: '#ffffff',
    marginTop: 10,
    fontSize: 25
  },
  list:{
    width: '90%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 15
  },
  searchInput: {
   color: '#fff',
   borderBottomColor: '#4657CE',
   borderBottomEndRadius: 1,
   textAlign: 'center',
   borderRadius: 2.5,
   backgroundColor:'#222222',
   textAlign: 'center',
   width: '40%'
  },
})
export default App