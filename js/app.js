'use strict';

const imgNames = [
  'banana',
  'bag',
  'bathroom',
  'boots',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors'
];


const imgContainer = document.getElementById('container');
const image1 = document.getElementById('imga');
const image2 = document.getElementById('imgb');
const image3 = document.getElementById('imgc');

let imageIndication =[];
const circles = 5;
let counterCircles = 0;

function randomNum(min,max,length,tryingAllowed)

{
  let randomNumbers = [];
  let number = 0;
  let choice = 1; 
  if(max-min < length)

    choice=0;

  for(let i = 0; i<length ; i++)
  {
    number = Math.floor(Math.random()*(max-min)+min);
    

    if(choice && !tryingAllowed && randomNumbers.indexOf(number)===-1)

      randomNumbers.push(number);

    else if(choice && !tryingAllowed)
      i--;
    else
      randomNumbers.push(number);
  }
  return randomNumbers;
}

function Presentation(imageName)
{
  this.imageName = imageName;
  this.path = `../img/${this.imageName}.jpg`;
  this.votes = 0;
  this.views = 0;
  Presentation.all.push(this);

}
Presentation.all = [];

for(let i = 0 ; i<imgNames.length ; i++)
{
  new Presentation(imgNames[i]);
}

console.table(Presentation.all);

function beshtawi()
{
  imageIndication = randomNum(0,imgNames.length-1,3,false);
  image1.src = Presentation.all[imageIndication[0]].path;
  Presentation.all[imageIndication[0]].views ++;
  image2.src = Presentation.all[imageIndication[1]].path;
  Presentation.all[imageIndication[1]].views ++;
  image3.src = Presentation.all[imageIndication[2]].path;
  Presentation.all[imageIndication[2]].views ++;

  
}

beshtawi();

image1.addEventListener('click', function(){pressure(1);});
image2.addEventListener('click', function(){pressure(2);});
image3.addEventListener('click', function(){pressure(3);});

function pressure(y)
{
  

  if(counterCircles<circles)
  {
    Presentation.all[imageIndication[y-1]].votes ++ ;
    beshtawi();
   
  }
  counterCircles++;
  if(counterCircles === circles )
  {

    document.getElementById('VRB').style.display = 'block';
  }
  
}


let buttonClick  = 0;
document.getElementById('VRB').addEventListener('click', createList);
function createList()
{
  if(buttonClick>0)
    return ;
  const ulElement = document.createElement('ul');
  document.getElementById('footer').appendChild(ulElement);
  for(let i =0 ; i<Presentation.all.length ; i++)
  {
    const liElement = document.createElement('li');
    ulElement.appendChild(liElement);
    liElement.textContent = `${Presentation.all[i].imageName} had ${Presentation.all[i].votes} votes, and was seen ${Presentation.all[i].views} times.`;
  }
  buttonClick++;
}