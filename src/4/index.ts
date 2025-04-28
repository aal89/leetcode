// this is marked as a hard problem in leetcode. probably something with two pointers and no sort()
// will make you beat the curve. this however is almost on top of the curve already.
// they ask for an O(log (m+n)) solution. lets come back to this later
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    const zipped = [...nums1, ...nums2].sort((a, b) => a - b);
    const isOdd = zipped.length % 2 === 1;

    return isOdd
        ? zipped[Math.floor(zipped.length / 2)]
        : (zipped[zipped.length / 2] + zipped[zipped.length / 2 - 1]) / 2;
}

export default {
    run: () => [
        { result: findMedianSortedArrays([1, 3], [2]), expected: 2 },
        { result: findMedianSortedArrays([1, 2], [3, 4]), expected: 2.5 },
    ],
};
