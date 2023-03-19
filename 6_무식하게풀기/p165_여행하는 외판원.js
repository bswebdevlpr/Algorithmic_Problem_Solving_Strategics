// 완전탐색
/*
PSUEDO CODE
1. 모든 경로에 대한 matrix 생성.
2. 모든 경로에 대해 완전탐색.
*/

// routes는 [[[1, 2], 10], ...] 형태로 이어져있는 길과 각 코스트를 담은 배열으로 가정.
function solution(n, routes) {
  let answer;

  const matrix = [];
  for (let i = 0; i < n; i++) {
    const row = new Array(n).fill(-1);
    matrix.push(row);
  }

  routes.forEach(([[from, to], cost]) => {
    (matrix[from][to] = cost), (matrix[to][from] = cost);
  });

  function exSearch(path, visited, cost) {
    // 기저사례: 모든 노드를 탐색했으면 처음 도시로 돌아가고 stop.
    let allVisited = true;

    // 내가 생각한거
    // for (let i=0; i<visited.length; i++) {
    //   if(!visited[i]) {
    //     allVisited = false
    //     break
    //   }
    // }
    // if(allVisited) return cost + matrix[0][visited[visited.length-1]]

    //해설
    if (path.length === n) return cost + matrix[0][visited[visited.length - 1]];

    let min = Infinity;
    // 모든 노드에 대해 완전탐색
    for (let i = 0; i < n; i++) {
      if (visited[i]) continue;

      visited[i] = true;
      path.push(i);

      //내가 생각한 풀이
      // cost += matrix[path[path.length-1]][i]
      // min = Math.min(min, exSearch(path, visited, cost))
      // cost -= matrix[path[path.length-1]][i]

      //해설
      min = Math.min(
        min,
        exSearch(path, visited, cost + matrix[path[path.length - 1]][i])
      );
      // 재귀함수 호출단에서 매개변수로 더한 값을 넘겨주면 원래 값을 보존할 수 있다.

      visited[i] = false;
      path.pop();
    }

    return min;
  }

  const visited = new Array(n).fill(false);
  visited[0] = true;
  answer = exSearch([0], visited, 0);
  return answer;
}
