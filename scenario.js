module.exports = {
  main: {
    finish: 'end',
    boards: [
      {
        cells: [
          { src: 'S1case1.gif', x: 0, y: 0 },
        ]
      },
      {
        cells: [
          { src: 'S1case2 v2.gif', x: 0, y: 0 },
        ]
      },
      {
        cells: [
          { src: 'S1case3.jpg', x: 0, y: 0 },
        ]
      },
      {
        cells: [
          { src: 'S1case4.gif', x: 0, y: 0, points: [{ x: 350, y: 480, story: 'cadavreTete' },{ x: 600, y: 550, story: 'symbole' }]  },
        ]
      },
      {
        cells: [
          { src: 'S1case7.jpg', x: 0, y: 0, points: [{ x: 496, y: 601, story: 'cadavreTete' }]  },
        ]
      }
    ]
  },
  cadavreTete: {
    finish: 'main',
    boards: [
      {
        cells: [
          { src: 'S1case5a.jpg', x: 0, y: 0 }
        ]
      }
    ]
  },
  symbole: {
    finish: 'main',
    boards: [
      {
        cells: [
          { x: 0, y: 0, src: 'S1case6a.jpg' }
        ]
      }
    ]
  },
  end: {
    boards: [
      {
        cells : [
          { x: 0, y: 0, src: 'uuuuh.jpg' }
        ]
      }
    ]
  }
};
