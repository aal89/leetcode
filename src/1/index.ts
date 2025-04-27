import { Exercise } from '../exec';

function twoSum(nums: number[], target: number): number[] {
    const map = {
        [nums[0]]: 0,
    };

    for (let i = 1; i < nums.length; i++) {
        const diff = target - nums[i];

        if (map[diff] !== undefined) {
            return [map[diff], i];
        }

        map[nums[i]] = i;
    }

    return [NaN, NaN];
}

export default {
    run: () => [
        { result: twoSum([2, 7, 11, 15], 9), expected: [0, 1] },
        { result: twoSum([3, 2, 4], 6), expected: [1, 2] },
        { result: twoSum([3, 3], 6), expected: [0, 1] },
    ],
} as Exercise;
