module.exports = {
  ADDRESS : process.env.HEROKU ? 'https://matchanalyzer.herokuapp.com/' : process.env.DOCKER ? 'https://37.133.124.200:9009/' : 'http://localhost:9000/',
  API_ADDRESS : process.env.HEROKU ? 'https://matchanalyzer.herokuapp.com/api/' : process.env.DOCKER ? 'https://37.133.124.200:9009/api/' : 'http://localhost:9000/api/',
  DEFAULT_TEAM_URL: 'assets/images/escudo-vacio.png',
  DEFAULT_PLAYER_URL: 'assets/images/person_icon.png',
  // LOCAL_API_ADDRESS : 'http://37.133.124.200:9000/api/',
  // LOCAL_ADDRESS : 'http://37.133.124.200:9000/',
  theme1: {
    PRIMARY_COLOR : '#6200EE',
    PRIMARY_DARK_COLOR : '#3700B3',
    PRIMARY_LIGHT_COLOR : '#bb86fc',
    SECONDARY_COLOR : '#03DAC6',
    SECONDARY_DARK_COLOR : '#018786',
    SECONDARY_LIGHT_COLOR : ''
  },
  theme2: {
    PRIMARY_COLOR : '#0b5a6b',
    PRIMARY_DARK_COLOR: '#074350',
    PRIMARY_LIGHT_COLOR : '#187388',
  },
  theme3: {
    
  }
}