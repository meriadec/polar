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
      { 
        src: 'S2C3.jpg',
        points: [
          { x: 300, y: 650, story: 'photo' },
          { x: 650, y: 350, story: 'suite2' }
        ] 
      }
    ]
  },
  suite2: {
    cells: [
      { src: 'S2C11.jpg' },
      { src: 'S2C12.jpg' },
      { src: 'S2C13.jpg' },
      { src: 'S2C14.jpg' },
      { src: 'S2C15.jpg' },
      { src: 'S2C16.jpg' }
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
  photo: {
    finish: 'suite1',
    cells: [
      { src: 'S2C4.jpg' },
      { src: 'S2C5.jpg',
        points: [
          { x: 430, y: 270, story: 'Pkirin' },
          { x: 630, y: 240, story: 'Pinconnu' },
          { x: 720, y: 200, story: 'Peka' },
          { x: 850, y: 240, story: 'Phector' },
          { x: 880, y: 400, story: 'Pcarl' },
        ] 
      }
    ]
  },
  Pkirin: {
    finish: 'photo',
    cells: [
      { src: 'S2C6.jpg' }
    ]
  },
  Pinconnu: {
    finish: 'photo',
    cells: [
      { src: 'S2C7.jpg' }
    ]
  },
  Peka: {
    finish: 'photo',
    cells: [
      { src: 'S2C8.jpg' }
    ]
  },
  Phector: {
    finish: 'photo',
    cells: [
      { src: 'S2C9.jpg' }
    ]
  },
  Pcarl: {
    finish: 'photo',
    cells: [
      { src: 'S2C10.jpg' }
    ]
  },
};
