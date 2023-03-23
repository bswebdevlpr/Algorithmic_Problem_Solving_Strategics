// 분할정복의 반복. 재귀가 참 어렵다.
/*
DESCRIPTION
쿼드 트리는 2^N X 2^N 크기의 흑백 그림을 아래와 같은 과정을 거쳐 문자열로 압축한다.
1. 그림의 모든 픽셀이 검은 색일 경우, 압축 결과는 그림의 크기에 관계없이 b가 된다.
2. 그림의 모든 픽셀이 흰 색일 경우, 압축 결과는 그림의 크기에 관계없이 w가 된다.
3. 1, 2번에 해당되지 않는 경우, 쿼드 트리는 이 그림을 가로 세로로 각각 2등분해 4개의 조각으로 쪼갠 뒤 각각을 쿼드 트리 압축한다.
   이때 전체 그림의 압축 결과는 x(왼쪽 위 부분 압축결과)(오른쪽 위 부분 압축결과)(왼쪽 아래 부분 압축결과)(오른쪽 아래 부분 압축결과)가 된다.
   ex) xbbbw
*/
function solution(str) {
  let answer;

  function reverse() {
    const head = str[pointer++];

    if (head === "b" || head === "w") return head;

    const upperLeft = reverse();
    const upperRight = reverse();
    const lowerLeft = reverse();
    const lowerRight = reverse();

    return "x" + lowerLeft + lowerRight + upperLeft + upperRight;
  }

  let pointer = 0;
  answer = reverse();
  console.log(answer);

  return answer;

  // 쿼드 트리 압축을 해제하는 알고리즘
  // const MAX_SIZE = str.length

  // const decompressed = []
  // for (let i=0; i<n; i++) {
  //    const row = new Array(n)
  //    decompressed.push(row)
  // }

  // function decompress (pointer=0, row=0, col=0, size) {
  //    const head = str[pointer++]

  //    if (head === 'b' || head === 'w') {
  //       for (let dRow=0; dRow<size; dRow++) {
  //          for (let dCol = 0; dCol<size; dCol++) {
  //             decompressed[row+dRow][col+dCol] = head
  //          }
  //       }
  //    } else {
  //       const half = size / 2
  //       decompress(pointer, row, col, half)
  //       decompress(pointer, row, col+half, half)
  //       decompress(pointer, row+half, col, half)
  //       decompress(pointer, row+half, col+half, half)
  //    }

  // }
}

solution("w");
solution("xbwwb");
solution("xbwxwbbwb");
solution("xxwwwbxwxwbbbwwxxxwwbbbwwwwbb");
