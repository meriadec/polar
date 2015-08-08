module.exports = {
  main: {
    finish: 'end',
    cells: [
      { src: 'S1case1.gif', points: [{ x: 100, y: 100, story: 'end' }] },
      { src: 'S1case2 v2.gif' },
      { src: 'S1case3.jpg' },
      {
        src: 'S1case4.gif',
        points: [
          { x: 350, y: 480, story: 'cadavreTete' },
          { x: 600, y: 550, story: 'symbole' }
        ]
      },
      {
        src: 'S1case7.jpg',
        points: [
          { x: 496, y: 601, story: 'cadavreTete' }
        ]
      }
    ]
  },
  cadavreTete: {
    finish: 'main',
    cells: [
      { src: 'S1case5a.jpg' }
    ]
  },
  symbole: {
    finish: 'main',
    cells: [
      { src: 'S1case6a.jpg' }
    ]
  },
  end: {
    cells: [
      { src: 'uuuuh.jpg' }
    ]
  }
};
