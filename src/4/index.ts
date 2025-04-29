function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    //  naive implementation, slower solution than below, still very acceptable if you ask me
    // but they want to see a merge sort
    // const zipped = [...nums1, ...nums2].sort((a, b) => a - b);

    const nlen = nums1.length;
    const mlen = nums2.length;
    let npointer = 0;
    let mpointer = 0;
    const sortedMerged: number[] = [];

    // merge sort with two pointers, fast solution 2ms, 90th percentile
    for (let i = 0; i < nlen + mlen; i++) {
        if (npointer === nlen) {
            sortedMerged.push(nums2[mpointer]);
            mpointer++;
        } else if (mpointer === mlen) {
            sortedMerged.push(nums1[npointer]);
            npointer++;
        } else if (nums1[npointer] < nums2[mpointer]) {
            sortedMerged.push(nums1[npointer]);
            npointer++;
        } else {
            sortedMerged.push(nums2[mpointer]);
            mpointer++;
        }
    }
    const isOdd = sortedMerged.length % 2 === 1;

    return isOdd
        ? sortedMerged[Math.floor(sortedMerged.length / 2)]
        : (sortedMerged[sortedMerged.length / 2] + sortedMerged[sortedMerged.length / 2 - 1]) / 2;
}

export default {
    run: () => [
        { result: findMedianSortedArrays([1, 3], [2]), expected: 2 },
        { result: findMedianSortedArrays([1, 2], [3, 4]), expected: 2.5 },
    ],
};
