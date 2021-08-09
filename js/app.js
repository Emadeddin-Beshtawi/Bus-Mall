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


for (let i = 0; i < images.length; i++) {
  new Products(images[i]);
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
}

imgSection.addEventListener('click', clickImages);

function clickImages(event) {


  if (event.target.id !== 'images') {

    if (trials < 10) {
      trials++;
      render();
      if (event.target.id === leftImage.id) {
        Products.all[imageOnLeft].votes++;

      } else if (event.target.id === centerImage.id) {
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
  for (let i = 0; i < Products.all.length; i++) {
    votesArr.push(Products.all[i].votes);
    viewsArr.push(Products.all[i].views);
    let liEl = document.createElement('li');
    listImages.appendChild(liEl);
    liEl.textContent = `${Products.all[i].name} had ${Products.all[i].votes} votes, and was seen ${Products.all[i].views} times.`
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
        backgroundColor: 'red',
        borderColor: 'red',
        data: votesArr
      },
      {
        label: '# Views',
        backgroundColor: 'black',
        borderColor: 'black',
        data: viewsArr
      }]
    },
  
    options: {}
  });

}

