/* eslint-disable @typescript-eslint/no-unused-vars */
import { Exercise } from '../exec';

// First attempt, overthinking it lol

function countSubarraysS1(nums: number[]): number {
    const subarrays = subarray3n(nums);

    return subarrays.reduce((accu, subarray) => {
        const [first, mid, last] = subarray;
        return accu + (first + last === mid / 2 ? 1 : 0);
    }, 0);
}

const subarray3n = (nums: number[]): number[][] => {
    const subarrays: number[][] = [];
    for (let i = 0; i < nums.length; i++) {
        subarrays.push([nums[i], nums[i + 1], nums[i + 2]]);
    }

    return subarrays.filter((subarray) => subarray.every((e) => e !== undefined));
};

// Second solution; on top of the bell curve haha!

function countSubarraysS2(nums: number[]): number {
    let ans = 0;

    for (let i = 0; i < nums.length; i++) {
        const [first, mid, last] = [nums[i], nums[i + 1], nums[i + 2]];
        ans += first + last === mid / 2 ? 1 : 0;
    }

    return ans;
}

// Third solution; beating the bell curve! 87th percentile
function countSubarrays(nums: number[]): number {
    let ans = 0;

    for (let i = 0; i < nums.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        nums[i] + nums[i + 2] === nums[i + 1] / 2 ? ++ans : null;
    }

    return ans;
}

export default {
    run: () => [
        { result: countSubarrays([1, 2, 1, 4, 1]), expected: 1 },
        { result: countSubarrays([1, 1, 1]), expected: 0 },
        { result: countSubarrays([-1, -2, 0]), expected: 1 },
        { result: countSubarrays([0, 0, 0, 0]), expected: 2 },
    ],
} as Exercise;
