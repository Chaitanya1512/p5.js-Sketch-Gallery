let table, size, factor, largest, alph, sF;
let palette1, palette2, r0, g0, b0;

function preload() {
  table = loadTable("colors.csv", "csv", "header");
}

function setup() {
  createCanvas(500,500);  
  factor = 0;
  let numb = floor(random(3, 20));
  size = width / numb;
  largest = floor(random(1, 10));
  alph = random(120, 220);
  if (random(15) < 1) {
    alph = 255;
  }
  noStroke();
  noLoop();
  draw();
}

function draw() {
  palette1 = floor(random(676));
  palette2 = floor(random(676));
  r0 = (int(table.get(palette1, 0)) + int(table.get(palette2, 0))) / 2;
  g0 = (int(table.get(palette1, 1)) + int(table.get(palette2, 1))) / 2;
  b0 = (int(table.get(palette1, 2)) + int(table.get(palette2, 2))) / 2;
  background(r0, g0, b0);
  drawShapes();
}

function drawShapes() {
  let rez = random(0.003, 0.01);
  sF = 360 / random(2, 40);
  for (let i = width; i > -size * largest; i -= size) {
    for (let j = height; j > -size * largest; j -= size) {
      let n1 = noise(i * rez + factor, j * rez + factor);
      let n2 = noise(i * rez + factor + 10000, j * rez + factor + 10000);
      let n3 = noise(i * rez + factor + 20000, j * rez + factor + 20000);

      let col1 = map(n1, 0, 1, 0, 360);
      let col2 = map(n2, 0, 1, 0, 360);
      let dec1 = fract(col1 / sF);
      let dec2 = fract(col2 / sF);

      let col3 =
        dec1 < 0.2 ? 0 : dec1 < 0.4 ? 1 : dec1 < 0.6 ? 2 : dec1 < 0.8 ? 3 : 4;
      let col4 =
        dec2 < 0.2 ? 0 : dec2 < 0.4 ? 1 : dec2 < 0.6 ? 2 : dec2 < 0.8 ? 3 : 4;

      let r1 = table.get(palette1, col3 * 3);
      let g1 = table.get(palette1, col3 * 3 + 1);
      let b1 = table.get(palette1, col3 * 3 + 2);
      let r2 = table.get(palette2, col4 * 3);
      let g2 = table.get(palette2, col4 * 3 + 1);
      let b2 = table.get(palette2, col4 * 3 + 2);

      let size2 = size * floor(random(1, largest));

      if (n3 < 0.25) {
        fill(r1, g1, b1, alph);
        triangle(i, j, i + size2, j + size2, i, j + size2);
        fill(r2, g2, b2, alph);
        triangle(i, j, i + size2, j + size2, i + size2, j);
      } else if (n3 < 0.5) {
        fill(r1, g1, b1, alph);
        triangle(i + size2, j, i + size2, j + size2, i, j + size2);
        fill(r2, g2, b2, alph);
        triangle(i, j + size2, i, j, i + size2, j);
      } else if (n3 < 0.75) {
        fill(r1, g1, b1, alph);
        triangle(i, j, i + size2, j + size2, i + size2, j);
        fill(r2, g2, b2, alph);
        triangle(i, j, i + size2, j + size2, i, j + size2);
      } else {
        fill(r1, g1, b1, alph);
        triangle(i, j + size2, i, j, i + size2, j);
        fill(r2, g2, b2, alph);
        triangle(i + size2, j, i + size2, j + size2, i, j + size2);
      }
    }
  }
}
