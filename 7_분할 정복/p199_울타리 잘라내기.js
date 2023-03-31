function solution(heights) {
  const max = Math.max;
  const min = Math.min;

  let answer;

  function solve(left, right) {
    console.log("left:", left, "right:", right);
    // 기저 사례: 판자가 하나밖에 없는 경우, 그 판자의 길이를 return 한다. (판자의 가로 길이는 1으로 가정한다.)
    if (left === right) return heights[left];

    const mid = Math.floor((left + right) / 2);

    // 좌우 각각 판자의 길이에 대해 더 큰 값을 구하기 위해 재귀.
    let ret = max(solve(left, mid), solve(mid + 1, right));

    let lo = mid,
      hi = mid + 1;
    let height = min(heights[lo], heights[hi]);

    // 판자 개수가 2개인 경우
    ret = max(ret, height * 2);

    // 최대 너비가 mid를 기준으로 양옆으로 포함되는 경우.
    while (left < lo || hi < right) {
      if (hi < right && (lo === left || heights[lo - 1] < heights[hi + 1])) {
        // 오른쪽으로 갈 수 있고, 왼쪽으로 갈 수 없거나 오른쪽 판자 길이가 왼쪽 판자 길이보다 긴 경우.
        hi++;
        height = min(height, heights[hi]);
      } else {
        lo--;
        height = min(height, heights[lo]);
      }

      ret = max(ret, height * (hi - lo + 1));
    }

    return ret;
  }

  answer = solve(0, heights.length - 1);
  console.log(answer);

  return answer;
}

solution([7, 1, 5, 9, 6, 7, 3]);
solution([1, 4, 4, 4, 4, 1, 1]);
solution([1, 8, 2, 2]);
