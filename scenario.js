module.exports = {
  main: {
    finish: 'end',
    boards: [
      {
        cells: [
          { src: 'chat_1.jpg', x: 0, y: 0, points: [{ x: 40, y: 40, story: 'secondary' }] },
          { src: 'chat_2.jpg', x: 620, y: 0 },
          { src: 'chat_3.jpg', x: 620, y: 370 }
        ]
      },
      {
        cells: [
          { src: 'chat_4.jpg', x: 0, y: 0, points: [{ x: 40, y: 40, story: 'secondary' }] },
          { src: 'chat_5.jpg', x: 0, y: 640 }
        ]
      }
    ]
  },
  secondary: {
    finish: 'main',
    boards: [
      {
        cells: [
          { src: 'limace_1.jpg', x: 0, y: 0, points: [{ x: 100, y: 100, story: 'main' }] },
          { src: 'limace_2.jpeg', x: 620, y: 620, points: [{ x: 40, y: 40, story: 'third' }, { x: 240, y: 140, story: 'third' }] },
          { src: 'limace_1.jpg', x: 100, y: 1000, points: [{ x: 100, y: 100, story: 'main' }] }
        ]
      },
      {
        cells: [
          { src: 'limace_3.jpg', x: 0, y: 0 },
          { src: 'limace_4.jpg', x: 0, y: 690, point: [{ x: 100, y: 100, story: 'main' }] }
        ]
      }
    ]
  },
  third: {
    finish: 'secondary',
    boards: [
      {
        cells: [
          { x: 60, y: 80, src: 'chamane_1.jpeg', points: [{ x: 10, y: 10, story: 'main' }] },
          { x: 460, y: 80, src: 'chamane_2.jpg' }
        ]
      },
      {
        cells: [
          { x: 0, y: 0, src: 'chamane_3.jpeg', points: [{ x: 10, y: 10, story: 'main' }] },
          { x: 300, y: 0, src: 'chamane_4.jpg' }
        ]
      }
    ]
  },
  end: {
    boards: [
      {
        cells : [
          { x: 0, y: 0, src: 'end.jpg' }
        ]
      }
    ]
  }
};
