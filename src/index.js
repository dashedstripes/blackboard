// canvas setup

let canvas = document.createElement('canvas')
let context = canvas.getContext('2d')

canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight

// create a black background
context.fillStyle = '#000000'
context.fillRect(0, 0, canvas.width, canvas.height)

document.body.appendChild(canvas)

// color picker

let colors = [
  'red',
  'green',
  'yellow',
  'blue',
  'purple',
  'white',
  'orange'
]

let selectedColor = colors[0]
let colorTiles = []

colors.forEach((val, index) => {
  colorTiles.push({
    color: colors[index],
    x: 0,
    y: canvas.height / colors.length * index,
    width: 100,
    height: canvas.height / colors.length
  })
})

colorTiles.forEach((val, index) => {
  context.fillStyle = val.color
  context.fillRect(val.x, val.y, val.width, val.height)
})

// stored paths

let paths = []

// mouse movements

let isDrawing = false
let currentPath = {
  color: '',
  start: {},
  movement: []
}

document.addEventListener('mousedown', (e) => {
  let x = e.clientX
  let y = e.clientY

  if(x <= colorTiles[0].x + colorTiles[0].width) {
    // if the mouse is clicked on a color, set that color as selected.
    for(let i = 0; i < colorTiles.length; i++) {
      if(x >= colorTiles[i].x && 
        x <= colorTiles[i].x + colorTiles[i].width &&
        y >= colorTiles[i].y &&
        y <= colorTiles[i].y + colorTiles[i].height) {
          selectedColor = colorTiles[i].color
        }
    }
  }else {
    // draw on the board
    isDrawing = true
    context.beginPath()
    context.moveTo(x, y)
    currentPath.color = selectedColor
    currentPath.start.x = x
    currentPath.start.y = y
  }
})

document.addEventListener('mousemove', (e) => {
  if(isDrawing) {
    if(e.clientX > (colorTiles[0].x + colorTiles[0].width) + 5) {
      context.strokeStyle = selectedColor
      currentPath.movement.push({
        x: e.clientX,
        y: e.clientY
      })
      context.lineTo(e.clientX, e.clientY)
      context.stroke()
    }
  }
})

document.addEventListener('mouseup', (e) => {
  isDrawing = false
  if(e.clientX > (colorTiles[0].x + colorTiles[0].width) + 5) {
    paths.push(currentPath)
    currentPath = {
      color: '',
      start: {},
      movement: []
    }
    console.log(paths)
  }
})

