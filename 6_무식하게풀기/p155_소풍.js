// 알게된 부분! 재귀에 배열을 넘겨주고 다시 이전 상태로 돌림으로써 다음 for loop에서 배열을 재사용할 수 있게 하기

/*
GOAL - 서로 친구인 학생끼리 짝을 짓는 방법의 수를 계산하라.

PSEUDO CODE
1. 짝이 된 경우를 다음 재귀에 전달?
*/

function solution(n, friends) {
  let answer;
  const matrix = [];

  for (let i = 0; i < n; i++) {
    const row = new Array(n).fill(false);
    matrix.push(row);
  }
  friends.forEach((pair) => {
    matrix[pair[0]][pair[1]] = true;
    matrix[pair[1]][pair[0]] = true;
  });

  // console.log(matrix);

  /*
  IDEAS
  1. picked를 통해 짝이 정해졌는지 확인.
  2. 변환된 picked를 재귀에 넘겨주고, 다음 for loop를 위해 복구. 
  */

  const picked = new Array(n).fill(false);
  function makePair(picked) {
    let pairer = -1;

    for (let i = 0; i < picked.length; i++) {
      if (!picked[i]) {
        pairer = i;
        break;
      }
    }
    // 모든 학생이 짝지어졌음 => 하나의 경우의 수를 찾은것이므로 1을 return.
    if (pairer === -1) return 1;

    let cases = 0;

    // picked, matrix를 통해 짝이 지어졌는지 확인
    for (let pairee = pairer + 1; pairee < matrix.length; pairee++) {
      if (!picked[pairer] && !picked[pairee] && matrix[pairer][pairee]) {
        (picked[pairer] = true), (picked[pairee] = true);
        cases += makePair(picked);
        (picked[pairer] = false), (picked[pairee] = false);
      }
    }

    return cases;
  }

  answer = makePair(picked);
  console.log(answer);

  return answer;
}

solution(2, [[0, 1]]);
solution(4, [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [0, 2],
  [1, 3],
]);
solution(6, [
  [0, 1],
  [0, 2],
  [1, 2],
  [1, 3],
  [1, 4],
  [2, 3],
  [2, 4],
  [3, 4],
  [3, 5],
  [4, 5],
]);
