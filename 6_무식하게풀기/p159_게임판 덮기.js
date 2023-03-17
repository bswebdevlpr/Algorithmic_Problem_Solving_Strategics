// !알게된 점: yPos, xPos - row, col을 헷갈리지 않도록 주의하자. 나는 row, col 개념이 익숙하다.

/* 
DESCRIPTION
HxW 크기의 게임판이 주어진다. 
이 게임판은 검은 칸과 흰 칸으로 구성된 격자 모양이며, 흰 칸을 세 칸짜리 L자 모양의 블록으로 덮고자 한다.

GOAL - 흰 칸을 덮을 수 있는 모든 경우의 수를 구하시오.

PSEUDO CODE
1. 덮는 경우 4가지를 미리 선언.
2. 각 경우에 대해 덮을 수 있다면 재귀.
3. 덮었으니 다시 걷어냄.
*/

function solution(board) {
  // 채울 수 있는 가장 왼쪽 위부터 시작하므로, 왼쪽과 위는 채워졌거나 막혀있다고 가정.
  let answer = 0;

  const newBoard = [];
  board.forEach((row) => {
    const newRow = [];
    for (let i = 0; i < row.length; i++) {
      if (row[i] === "#") newRow.push(1);
      else newRow.push(0);
    }

    newBoard.push(newRow);
  });

  const dirTypes = [
    [
      [0, 0],
      [0, 1],
      [1, 0],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [1, -1],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
    ],
  ];

  // 채우거나 빼는 함수
  function set(yPos, xPos, type, delta) {
    let ok = true;

    for (let i = 0; i < 3; i++) {
      const ny = yPos + dirTypes[type][i][0];
      const nx = xPos + dirTypes[type][i][1];

      // 타일위치가 newBoard 범위를 초과할 때
      if (ny < 0 || ny >= newBoard.length || nx < 0 || nx >= newBoard[0].length)
        ok = false;
      // 타일값이 이미 덮여있을 때
      else if ((newBoard[ny][nx] += delta) > 1) ok = false;
    }

    return ok;
  }

  function cover(depth = 0) {
    // 덮여있지 않은 타일 중 가장 왼쪽 위 타일을 search.
    let yPos = -1,
      xPos = -1;
    for (let row = 0; row < newBoard.length; row++) {
      for (let col = 0; col < newBoard[0].length; col++) {
        if (newBoard[row][col] === 0) {
          (yPos = row), (xPos = col);
          break;
        }
      }
      if (yPos !== -1) break;
    }
    // 기저사례: 모든 빈칸을 채운 경우
    if (yPos === -1) return 1;

    let ret = 0;
    for (let type = 0; type < dirTypes.length; type++) {
      if (set(yPos, xPos, type, 1)) {
        ret += cover(++depth);
      }
      // 밑에 set을 위 가정문 안에 넣고 왜 안되냐고 뻘짓함.
      // 가정문에 들어가지 않더라도 더하는 set은 실행되었으니 빼는 set도 실행되어야함.
      set(yPos, xPos, type, -1);
    }

    return ret;
  }
  answer = cover();

  return answer;
}

// #은 검은 칸, .은 흰 칸
// console.log(solution(["#.....#", "#.....#", "##...##"]));
// console.log(solution(["#.....#", "#.....#", "##..###"]));
console.log(
  solution([
    "##########",
    "#........#",
    "#........#",
    "#........#",
    "#........#",
    "#........#",
    "#........#",
    "##########",
  ])
);
