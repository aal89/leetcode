// very slow solution, 5th percentile
function lengthOfLongestSubstring(s: string): number {
    let map = {};
    const ans = [0];

    for (let i = 0; i < s.length; i++) {
        if (map[s[i]] === undefined) {
            map[s[i]] = i;
            ans[0]++;
        } else {
            // this setback is very slow, probably some optimization with two pointers possible
            // but came up with this solution without the internet. so bonus points for me
            i = map[s[i]];
            map = {};
            ans.unshift(0);
        }
    }

    return Math.max(...ans);
}

export default {
    run: () => [
        { result: lengthOfLongestSubstring('abcabcbb'), expected: 3 },
        { result: lengthOfLongestSubstring('bbbbb'), expected: 1 },
        { result: lengthOfLongestSubstring('pwwkew'), expected: 3 },
        { result: lengthOfLongestSubstring(''), expected: 0 },
        { result: lengthOfLongestSubstring('aab'), expected: 2 },
        { result: lengthOfLongestSubstring('dvdf'), expected: 3 },
        { result: lengthOfLongestSubstring('ckilbkd'), expected: 5 },
        { result: lengthOfLongestSubstring('anviaj'), expected: 5 },
        { result: lengthOfLongestSubstring('nfpdmpi'), expected: 5 },
    ],
};
