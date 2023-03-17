/*
GOAL - 절박도를 최대화할 수 있는 물건들의 목록을 계산하라.

RULES
1. 물건들의 부피 합은 캐리어 용량 w 이하여야 한다.
2. 제한시간: 2s
3. 테스트 케이스 수: C (1 <= C <= 50)
4. 가져가고 싶은 물건의 수: N (1 <= N <= 100)
5. 캐리어 용량: W (1 <= W <= 1000)
6. 부피, 절박도: 1000 이하의 자연수
*/

function solution(n, capacity, items) {
  // items's element: [item_name, volume, needs]
  const answer = []
  const memo = new Array(n).fill(-1)

  function packing(left) {
    // 메모이제이션 활용

    let maxNeeds = 

    

    return maxNeeds
  }

  return answer
}

solution(6, 10, [["laptop", 4, 7], ["camera", 2, 10], ["xbox", 6, 6], ["grinder", 4, 7], ["dumbell", 2, 5], ["encyclopedia", 10, 4]])
solution(6, 17, [["laptop", 4, 7], ["camera", 2, 10], ["xbox", 6, 6], ["grinder", 4, 7], ["dumbell", 2, 5], ["encyclopedia", 10, 4]])