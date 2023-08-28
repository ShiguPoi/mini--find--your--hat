// Please copy and paste your GitHub Repo on line 2 (optional)
// <GitHub Repo>
// https://github.com/usamimipyoi/mini--find--your--hat

// JavaScript Assessment Rubric: https://generation.instructure.com/courses/2342/assignments/143783

// Codecademy: https://www.codecademy.com/paths/front-end-engineer-career-path/tracks/fecp-javascript-syntax-part-iii/modules/fecp-challenge-project-find-your-hat/projects/find-your-hat

// Please break down your thinking process step-by-step (mandatory)
// generate map -> place hero and hat -> think how hero move work 
// -> win and lose condition -> exit method -> hard mode impliment

// step 1 : Function that generate 2 d array
// step 1.1 : 2d array take width and height and hole chance
// step 1.2 : random where to place const hold this take number
// step 1.2.1 : isn't take stupid way and take random chance then dice roll everyfield better? 
// step 1.4 : place hat at random where it isn't 0,0 (fine if it replace hole?) 
// step 1.5 extra : function to place character at random (also update x,y coordinator)

// step 2 : how to make path move
// step 2.1 : prompt that keep taking W A S D ? (I love WASD so just let i be)
// step 2.2 : something that keep looping to move field[0][0] = pathCharacter or something to else
// step 2.3 : something that check what is on that space now
// step 2.4 : check if hole, check if out of bound, if win
// step 2.4 : exit condition 

// step 3 : print function that repaint array to string by console log

// step 4 : play function that loop and ask if want to play

// extra
// step a : function keep asking about playing
// step b : wildfire (hardmode)

// not finish
// step c : path finder algorithm (eh)

// JS Assessment: Find your hat //

const prompt = require('prompt-sync')({ sigint: true }); // This sends a SIGINT, or “signal interrupt” message indicating that a user wants to exit a program by press Crtl+c
const clear = require('clear-screen');//every turn clear the screen that meant you will not get new field in time you choose the direction
const hat = '👒';
const hole = '🟥';
const fieldCharacter = '⬜';
const pathCharacter = '🐍';
let exitGame = false;
let winScore = 0;
let loseScore = 0;
const testHole = '🍌';
let enableHard = false;

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.positionX = 0;
    this.positionY = 0;
    // Set the "home" position before the game starts
    // reminder it is [position y][position x]
    this.field[0][0] = pathCharacter;
    this.notDead = true;
  }

  //field generator is ok and tested
  static generateField(width, height, percentage = 0.3) {
    //1.1 2d array take width and height 
    let field = new Array(height);
    for (let i = 0; i < height; i++) field[i] = new Array(width);
    
    //1.2 random place hole 
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            field[i][j] = Math.random() > percentage ? fieldCharacter : hole;
        }
    }
    
    //1.4 place hat
    field[Math.floor((Math.random())*height)][Math.floor((Math.random())*width)] = hat;

    //field finish but with 0,0 as start location
    return field;
  }

  //1.5 need to place character function elsewhere as this will keep return 0,0
  randowSpawn() {
    this.positionX = Math.floor((Math.random())*this.field[0].length);
    this.positionY = Math.floor((Math.random())*this.field.length);
    // remove start location
    this.field[0][0] = fieldCharacter;
    // new start location
    this.field[this.positionY][this.positionX] = pathCharacter;
  }

  // 3.0 print field method to make it eaier 
  print() {
    clear(); 
    //extra vanity if play hardmode
    let extraWord = '';
    if(enableHard === true) {
      extraWord = '(HARD MODE)';
    } else {
      extraWord = '';
    }
    console.log(`Score win : ${winScore} // lose : ${loseScore} ${extraWord}`)
    // your print map code here (i don't know how this work, don't ask)
    for (let row of this.field){
      console.log(row.join(''));
    }
    console.log('Your position // X :' + this.positionX + ' // Y :' + this.positionY);
  }
  
  // the rest of your code starts here.

  // 2.2 loop to check hero
  move(direction) {

    // remove hero
    this.field[this.positionY][this.positionX] = fieldCharacter;

    // move hero
    direction = direction.toLowerCase();
    if (direction === 'w') this.positionY--;
    else if (direction === 'a') this.positionX--;
    else if (direction === 's') this.positionY++;
    else if (direction === 'd') this.positionX++;
    else {
      // redraw hero incase hero didn't move
      this.field[this.positionY][this.positionX] = pathCharacter;
      return 0;
    }

    // check if hero is out of bound 
    // everything below here need return to stop bacause number is minus
    // it will kick array to hell
    if (this.positionX < 0 || this.positionX >= this.field[0].length || this.positionY < 0 || this.positionY >= this.field.length ){
      this.notDead = false;
      console.log('Sadly but you jump out from stage!')
      loseScore++;
      return 0;
    }

    //check if it is hole
    if (this.field[this.positionY][this.positionX] === hole){
      this.notDead = false;
      console.log('You jump in to the hole!!')
      loseScore++;
      return 0;
    }

    //check if it is hat
    if (this.field[this.positionY][this.positionX] === hat){
      this.notDead = false;
      console.log('You found the hat, YOU WIN!!')
      winScore++;
      return 0;
    }

    //draw new hero position if not end
    if (this.field[this.positionY][this.positionX] === fieldCharacter) this.field[this.positionY][this.positionX] = pathCharacter;
  }

  // step 4
  play() {
    this.hardCheck()
    this.notDead = true; 
    while(this.notDead){
      this.print()
      // step 2.1
      console.log('W = Up / A = Left / S = Down / D = Right')
      // input function
      const direction = prompt ('input and enter to move : ');
      this.move(direction)
      // yes it is intend even hero didn't move hard mode still move :D
      if(enableHard) this.hardMode(); 
    }
  }

  // replay function, nothing special that i use switch
  replay() {
    let ask = prompt ('Want to play again? (y/n): ');
    ask = ask.toLowerCase();
    switch (ask){
      case 'y':
        break;
      case 'n':
        exitGame = true;
        break;
      default :
        this.replay()
    }
  }

  // step b hardmode, just random where to place extra fire
  hardMode() {
    let randomX = Math.floor((Math.random())*this.field[0].length);
    let randomY = Math.floor((Math.random())*this.field.length);
    if (this.field[randomY][randomX] === fieldCharacter){
      this.field[randomY][randomX] = hole;
    }
    else {
      //recursive incase fire is not spawn on field
      this.hardMode()
    }
  }
  
   hardCheck() {
    let askHard = prompt ('Want to HARD MODE? (random fire spawn) (y/n): ');
    askHard = askHard.toLowerCase();
    //i don't know why but code is break if i use switch here so just use if
    if (askHard === 'y'){
      enableHard = true;
    } else if (askHard === 'n'){
      enableHard = false;
    } else {
      this.hardCheck()
    }
  } 
  
}

// 4.0 keep asking about play
while(!exitGame){
  //use not same number of width and height to check if logic true
  let playField = new Field(Field.generateField(20,15));
  playField.randowSpawn()
  playField.play()
  playField.replay()
}