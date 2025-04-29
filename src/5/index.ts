// came up with this myself no internet and 40ms runtime, 40th percentile
// pretty sure theres a better solution out there, im guessing something with
// two pointers haha. for now fine
function longestPalindrome(s: string): string {
    let ans = [''];

    for (let i = 0; i < s.length; i++) {
        const subans = [s[i]];
        let left = 1;
        let right = 1;

        while (s[i - left] === s[i]) {
            subans.unshift(s[i - left]);
            left++;
        }

        while (s[i + right] === s[i]) {
            subans.push(s[i + right]);
            right++;
        }

        while ((s[i - left] !== undefined || s[i + right] !== undefined) && s[i - left] === s[i + right]) {
            subans.unshift(s[i - left]);
            subans.push(s[i + right]);
            left++;
            right++;
        }

        if (subans.length === s.length) {
            return subans.join('');
        }

        ans = ans.length > subans.length ? ans : subans;
    }

    return ans.join('');
}

export default {
    run: () => [
        { result: longestPalindrome('babad'), expected: 'aba' },
        { result: longestPalindrome('cbbd'), expected: 'bb' },
        { result: longestPalindrome('abb'), expected: 'bb' },
        { result: longestPalindrome('ccc'), expected: 'ccc' },
        { result: longestPalindrome('adam'), expected: 'ada' },
        { result: longestPalindrome('caaaaa'), expected: 'aaaaa' },
        { result: longestPalindrome('aaaa'), expected: 'aaaa' },
    ],
};
