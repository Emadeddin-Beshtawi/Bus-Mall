'use strict';
const images = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

const leftImg = document.getElementById('left');
const centerImg = document.getElementById('center');
const rightImg = document.getElementById('right');
const imgSection = document.getElementById('images');
const buttonResult = document.getElementById('VRB');
let imageOnLeft;
let imageOnCenter;
let imageOnRight;
let trials = 0;
let votesArr = [];
let viewsArr = [];

function Products(name) {
  this.name = name;
  this.image = `./img/${this.name}.jpg`;
  this.votes = 0;
  this.views = 0;
  Products.all.push(this);
}
Products.all = [];

obtainData();


for (let j = 0; j < images.length; j++) {
  new Products(images[j]);
}


function render() {

  imageOnLeft = randomNumber(0, Products.all.length - 1);
  imageOnCenter = randomNumber(0, Products.all.length - 1);
  imageOnRight = randomNumber(0, Products.all.length - 1);


  while (imageOnLeft === imageOnCenter || imageOnLeft === imageOnRight) {
    imageOnLeft = randomNumber(0, Products.all.length - 1);
  }

  leftImg.src = Products.all[imageOnLeft].image;
  leftImg.alt = Products.all[imageOnLeft].name;
  leftImg.title = Products.all[imageOnLeft].name;
  Products.all[imageOnLeft].views++;

  while (imageOnCenter === imageOnRight || imageOnCenter === imageOnLeft) {
    imageOnCenter = randomNumber(0, Products.all.length - 1);
  }

  centerImg.src = Products.all[imageOnCenter].image;
  centerImg.alt = Products.all[imageOnCenter].name;
  centerImg.title = Products.all[imageOnCenter].name;
  Products.all[imageOnCenter].views++;

  while (imageOnRight === imageOnCenter || imageOnRight === imageOnLeft) {
    imageOnRight = randomNumber(0, Products.all.length - 1);
  }
  rightImg.src = Products.all[imageOnRight].image;
  rightImg.alt = Products.all[imageOnRight].name;
  rightImg.title = Products.all[imageOnRight].name;
  Products.all[imageOnRight].views++;

  localStorage.data = JSON.stringify(  Products.all );
}

imgSection.addEventListener('click', clickImages);

function clickImages(event) {


  if (event.target.id !== 'images') {

    if (trials < 10) {
      trials++;
      render();
      if (event.target.id === leftImg.id) {
        Products.all[imageOnLeft].votes++;

      } else if (event.target.id === centerImg.id) {
        Products.all[imageOnCenter].votes++;
      }
      else {
        Products.all[imageOnRight].votes++;
      }
    }
  }
}


buttonResult.addEventListener('click', resultbutton );

function resultbutton() {

  let listImages = document.getElementById('listOfProducts');
  for (let j = 0; j < Products.all.length; j++) {
    votesArr.push(Products.all[j].votes);
    viewsArr.push(Products.all[j].views);
    let liEl = document.createElement('li');
    listImages.appendChild(liEl);
    liEl.textContent = `${Products.all[j].name} had ${Products.all[j].votes} votes, and was seen ${Products.all[j].views} times.`
  }
  buttonResult.removeEventListener('click', resultbutton);
  chartRender();
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
render();
Products.all[imageOnLeft].views--;
Products.all[imageOnCenter].views--;
Products.all[imageOnRight].views--;




function chartRender() {
  let ctx = document.getElementById('dataChart').getContext('2d');
  let chart = new Chart(ctx, {

    type: 'bar',

    data: {
      labels: images,
      datasets: [{
        label: '# Votes',
        backgroundColor: 'yellow',
        borderColor: 'yellow',
        data: votesArr
      },
      {
        label: '# Views',
        backgroundColor: 'blue',
        borderColor: 'blue',
        data: viewsArr
      }]
    },
  
    options: {}
  });

}

function obtainData() {
  if( localStorage.data ) {
    let data = JSON.parse( localStorage.data );
    for( let j = 0; j < data.length; j++ ) {
      new  Products( data[j].name, data[j].image, data[j].views, data[j].votes );
    }
  } else {
    for( let j = 0; j < images.length; j++ ) {
      new Products( images[j].split( '.' )[0], images[j] );
    }
  }
}













