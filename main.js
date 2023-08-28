// Codecademy: https://www.codecademy.com/paths/front-end-engineer-career-path/tracks/fecp-javascript-syntax-part-iii/modules/fecp-challenge-project-find-your-hat/projects/find-your-hat

// Please break down your thinking process step-by-step (mandatory)

// requirement
// class field endup with 2d array that hold string
// class field had print method that paint whole field (suggest to print string instread if array)
// generated field static method taking width x height and percent argument to determine percent of hole

// step 1 : Function that generate 2 d array
// step 1.1 : 2d array take width and height and hole chance
// step 1.2 : random where to place const hold this take number
// step 1.2.1 : isn't take stupid way and take random chance then dice roll everyfield better? 
// step 1.4 : place hat at random where it isn't 0,0 (fine if it replace hole?) 
// step 1.5 : function to place character at random (also update x,y coordinator)

// step 2 : how to make path move
// step 2.1 : prompt that keep taking W A S D ? (I love WASD so just let i be)
// step 2.2 : something that keep looping to move field[0][0] = pathCharacter or something to else
// step 2.3 : something that check what is on that space now
// step 2.4 : check if hole, check if out of bound, if win
// step 2.4 : exit condition 

// step 3 : print function that repaint array to string by console log

// step 4 : play function

// extra
// step a : function keep asking about playing

// not finish
// step b : wildfire (hardmode)
// step c : path finder algorithm (eh)

// JS Assessment: Find your hat //

const prompt = require('prompt-sync')({ sigint: true }); // This sends a SIGINT, or “signal interrupt” message indicating that a user wants to exit a program by press Crtl+c
const clear = require('clear-screen');//every turn clear the screen that meant you will not get new field in time you choose the direction
const hat = '👒';
const hole = '🔥';
const fieldCharacter = '⬜';
const pathCharacter = '🐍';
let exitGame = false;

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.positionX = 0;
    this.positionY = 0;
    // Set the "home" position before the game starts
    this.field[0][0] = pathCharacter;
    this.notDead = true;
  }

  //field generator is ok and tested
  static generateField(width, height, percentage = 0.3) {
    //1.1 2d array take width and height 
    let field = new Array(height);
    for (let i = 0; i < height; i++) field[i] = new Array(width);
    
    //1.2 random place hole 
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            field[i][j] = Math.random() > percentage ? fieldCharacter : hole;
        }
    }
    
    //1.4 place hat
    field[Math.floor((Math.random())*height)][Math.floor((Math.random())*width)] = hat;

    return field;
  }

  //1.3 need to place character function elsewhere as this will keep return 0,0
  randowSpawn() {
    this.positionX = Math.floor((Math.random())*this.field[0].length);
    this.positionY = Math.floor((Math.random())*this.field.length);
    this.field[0][0] = fieldCharacter;
    this.field[this.positionY][this.positionX] = pathCharacter;
  }

  // 3.0 print field method to make it eaier 
  print() {
    clear(); 
    // your print map code here (i don't know how this work, don't ask)
    for (let row of this.field){
      console.log(row.join(''));
    }
    console.log('Your position // X :' + this.positionX + ' // Y :' + this.positionY);
  }
  
  // the rest of your code starts here.

  move(direction) {

    // delete old hero
    this.field[this.positionY][this.positionX] = fieldCharacter;

    // move hero
    direction = direction.toLowerCase();
    if (direction === 'w') this.positionY--;
    else if (direction === 'a') this.positionX--;
    else if (direction === 's') this.positionY++;
    else if (direction === 'd') this.positionX++;
    else return 0;

    // check if out of bound
    if (this.positionX < 0 || this.positionX >= this.field[0].length || this.positionY < 0 || this.positionY >= this.field.length ){
      this.notDead = false;
      console.log('Sadly but you jump out from stage!')
      return 0;
    }

    //check if it is hole
    if (this.field[this.positionY][this.positionX] === hole){
      this.notDead = false;
      console.log('You jump in to the hole!!')
      return 0;
    }

    //check if it is hat
    if (this.field[this.positionY][this.positionX] === hat){
      this.notDead = false;
      console.log('You found the hat, YOU WIN!!')
      return 0;
    }

    //draw new hero position
    if (this.field[this.positionY][this.positionX] === fieldCharacter) this.field[this.positionY][this.positionX] = pathCharacter;
  }

  play() {
    this.notDead = true; 
    while(this.notDead){
      this.print()
      /* console.log(playField) */
      // step 2.1
      console.log('W = Up / A = Left / S = Down / D = Right')
      const direction = prompt ('input and enter to move : ');
      this.move(direction)
  }
}

  replay() {
    let ask = prompt ('Want to play again? (y/n): ');
    ask = ask.toLowerCase();
    switch (ask){
      case 'y':
        break;
      case 'n':
        exitGame = true;
        break;
      
    }
  }

}

// 4.0 keep asking about play
while(!exitGame){
  let playField = new Field(Field.generateField(10,10));
  playField.randowSpawn()
  playField.play()
  playField.replay()
}


