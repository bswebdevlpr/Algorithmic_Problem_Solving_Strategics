// 완전탐색
/*
DESCRIPTION
16개의 시계가 있으며, 이 시계들은 모두 12시, 3시, 6시, 9시 중 한 시각을 가리키고 있다.
시계의 시간을 조작하는 유일한 방법은 10개의 스위치를 조작하는 것으로, 각 스위치들은 모두 3개~5개의 시계와 연결되어 있다.
스위치를 누를 때마다 시간은 3시간씩 앞으로 이동한다. 

GOAL - 시계들이 모두 12시를 가리키도록 하기 위해 최소 스위치를 몇 번 눌러야 하는지 계산하는 프로그램을 작성하라.
*/

function solution(clocks) {
  const CLOCK_NUM = 16,
    SWITCH_NUM = 10;
  let answer;
  let cases = 0;

  const linked = [
    // row - swtch, column - clock
    "xxx.............",
    "...x...x.x.x....",
    "....x.....x...xx",
    "x...xxxx........",
    "......xxx.x.x...",
    "x.x...........xx",
    "...x..........xx",
    "....xx.x......xx",
    ".xxxxx..........",
    "...xxx...x...x..",
  ];

  // 시계가 모두 12시를 가리키는지 확인.
  function checkAll12() {
    let result = true;

    for (const num of clocks) {
      if (num !== 12) {
        result = false;
        break;
      }
    }

    return result;
  }

  // 스위치에 연결되어 있는 모든 시계를 3시간씩 진행시킴.
  function push(swtch) {
    for (let clock = 0; clock < CLOCK_NUM; clock++) {
      if (linked[swtch][clock] === "x") {
        clocks[clock] = clocks[clock] === 12 ? 3 : clocks[clock] + 3;
      }
    }
  }

  // 각 시계는 3, 6, 9, 12를 가리킬 수 있으며, 12시간이 지나면 원래 자리로 돌아오므로
  // 경우의 수는 1번, 2번, 3번, 4번(원래 자리로 돌아옴)의 총 4개이다.
  function exSearch(swtch) {
    // 기저사례: 모든 시계가 12시를 가리키는 경우, 이전 재귀에서 버튼조작이 끝났으므로 0을 return. 아닌 경우, 다른 경우로 가야하므로 최대를 return.
    if (swtch === SWITCH_NUM) return checkAll12() ? 0 : Infinity;

    let min = Infinity;
    // 4가지 경우의 수에 대해 모두 적용.
    for (let i = 0; i < 4; i++) {
      min = Math.min(min, i + exSearch(swtch + 1));
      push(swtch);
    }

    return min;
  }

  answer = exSearch(0);

  console.log(answer);
  return answer;
}

solution([12, 6, 6, 6, 6, 6, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12]);
solution([12, 9, 3, 12, 6, 6, 9, 3, 12, 9, 12, 9, 12, 12, 6, 6]);
