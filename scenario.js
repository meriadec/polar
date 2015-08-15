module.exports = {
  main: {
    cells: [
      { src: 'S1case1.gif' },
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
          { x: 496, y: 601, story: 'suite1' }
        ]
      }
    ]
  },
  suite1: {

    cells: [
      { src: 'S1case8a.jpg' },
      { src: 'S1case8b.jpg' },
      { src: 'S1case9v2.jpg' },
      { src: 'S1case9.jpg' },
      { src: 'S1case10.gif' },
      { src: 'S1case11.gif' },
      { src: 'ecran titre.jpg' },
      { src: 'S2C1.gif' },
      { src: 'S2C2.jpg' },
      { src: 'S2C3.jpg' }
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
  }
};
