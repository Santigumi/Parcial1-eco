let socket = io("http://localhost:5050", { path: "/real-time" });

const appState = {
  page: 'login'
}

const form = {
  'nombre': '',
}
screenState()
function screenState(){
  if(appState.page === 'login'){
    const login = document.getElementById('login')
    const titule = document.createElement('h1')
    titule.innerText = 'Marco Polo'
    login.appendChild(titule)
  
    const name = document.createElement('input')
    name.type = 'text'
    name.placeholder = 'Ingresa tu nombre'
    name.addEventListener('change', function(){changeName(name.value)})
    login.appendChild(name)
  
    const loginButton = document.createElement('button')
    loginButton.innerText = 'Registrarte'
    loginButton.addEventListener('click', function(){createUser(form.nombre)})
    login.appendChild(loginButton)
  
  } else if (appState.page === 'start'){
    const login = document.getElementById('login')
    login.innerHTML = ''

    const start = document.getElementById('start')
    const titule = document.createElement('h1')
    titule.innerText = 'Marco Polo'
    start.appendChild(titule)

    console.log(dataUser);
    
    const nick = document.createElement('p');
    nick.innerText = 'tu eres ' + form.nombre
    start.appendChild(nick)
  
    const startButton = document.createElement('button')
    startButton.innerText = 'Iniciar juego'
    startButton.addEventListener('click', function(){enoughtPlayer()})
    start.appendChild(startButton)
  
  } else if (appState.page === 'game'){
    
    const start = document.getElementById('start')
    start.innerHTML = ''

    const game = document.getElementById('game')
    const titule = document.createElement('h1')
    titule.innerText = 'Marco Polo'
    game.appendChild(titule)
  
    const screamButton = document.createElement('button')
    screamButton.innerText = 'Gritar'
    screamButton.addEventListener('click', async function(){Scream()})
    game.appendChild(screamButton)
  } else if (appState.page === 'final'){
  
    const final = document.getElementById('final')
    const titule = document.createElement('h1')
    titule.innerText = 'Marco Polo'
    final.appendChild(titule)
  }
}


function changeName(e) {
  form.nombre = e
  console.log(form.nombre);
}

function changeScreen(e){
  appState.page = e
}

async function createUser(e) {
  socket.emit("joinGame", (e))
  changeScreen('start')
  screenState()
}

const dataUser  = []

socket.on("userJoined", (data) => {
  console.log(data);
  data.players.forEach(element => {
    dataUser.push(element)
  });
});

async function Scream() {
  socket.emit("scream", form.nombre)
}

socket.on('scream', (nickname)=>{
  alert(nickname + ' gritó')
})

function enoughtPlayer() {
  if(dataUser.length >= 3){
    changeScreen('game')
    screenState()
    printData()
  } else {
    alert('no hay jugadores suficientes')
  }
}

function printData() {
  const game = document.getElementById('game')

  dataUser.forEach(player => {
  const gameCart = document.createElement('div')
  const nickname = document.createElement('p')
  nickname.innerText = player
  gameCart.appendChild(nickname)
  game.appendChild(gameCart)
  });
}