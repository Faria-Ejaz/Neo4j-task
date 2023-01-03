const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//start from bottom to top and add the smallest value to the entry to get the sum
const shortestSlidePath = (matrix) => {
  for (let i = matrix.length - 2; i >= 0; i--) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] += Math.min(matrix[i + 1][j], matrix[i + 1][j + 1]);
    }
  }
  return matrix[0][0];
};

const convertLayersToMatrix = async (layers) => {
  const rows = [];
  console.log(
    "Please write the values for this layer, put spaces between numbers, for the next layer press the 'enter' key\n"
  );

  // iterate each pyramid layer
  for (let i = 1; i <= layers; i++) {
    const values = [];

    await new Promise((resolve) => {
      rl.question(`Values for the ${i} layer \n`, (answer) => {
        values.push(...answer.split(" ").map(Number));

        resolve();
      });
    });

    rows.push(values);
  }
  rl.close();

  return rows;
};

// get the layers count and rows values for the pyramid layers
rl.question(
  "Please write the number of layers to be passed \n",
  async (layers) => {
    //convert layers to 2D matrix [ [ 1 ], [ 2, 3 ], [ 4, 5, 6 ] ]
    const values = await convertLayersToMatrix(layers);
    const shortestPath = shortestSlidePath(values);

    console.log(`The Sum of the shortest path is  ${shortestPath}`);
  }
);
