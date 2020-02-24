let SQLite = require('react-native-sqlite-storage');
let sqlite = SQLite.openDatabase({ 
  name: 'dbPokemon2',
  createFromLocation: '~www/dbPokemon2.db' ,
  location: 'default'
}, (db) => {
  console.log(sqlite)
  sqlite.attach( "dbPokemon2", "dbPokemon2", () => console.log("Database attached successfully"), () => console.log("ERROR connect"))
}, (error) => {
  console.log('o porra')
    console.log("Error on opening database 'dbPokemon2'", error)
});

export default {
  getRecentPokemons: () => {
    console.log('sqlllllllliteeeee') 
    sqlite.transaction((txn) => {
      console.log('sqlllllllliteeeee 2')
      txn.executeSql('SELECT * FROM tbRecentPokemon', [], (tx, result) => {
        if(result.rows.length > 0) {
          const { item } = result.rows
          item.map(item2 => {
            console.log('teste: ', item2)
          })
          // console.log(item(1).idPokemon)
        }
      }, (err) => {
        console.log('sqlllllllliteeeee 4')
        console.log('error: ', err)
      })
    })
  }
}