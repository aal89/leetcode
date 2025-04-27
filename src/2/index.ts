import { Exercise } from '../exec';

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    if (!l1 && !l2) {
        return null;
    }

    if (!l1) {
        return l2;
    }

    if (!l2) {
        return l1;
    }

    const nr1: number[] = [];
    const nr2: number[] = [];
    let pointer: ListNode | null = l1;

    do {
        nr1.unshift(pointer.val);
        pointer = pointer.next;
    } while (pointer);

    pointer = l2;

    do {
        nr2.unshift(pointer.val);
        pointer = pointer.next;
    } while (pointer);

    const [first, ...ans] = (BigInt(nr1.join('')) + BigInt(nr2.join(''))).toString().split('').reverse();

    return ans.reduce(
        (acc, curr) => {
            let pointer = acc;

            while (pointer?.next) {
                pointer = pointer.next;
            }

            pointer.next = new ListNode(Number(curr));

            return acc;
        },
        new ListNode(Number(first)),
    );
}

const testCase0a = new ListNode(2, new ListNode(4, new ListNode(3)));
const testCase0b = new ListNode(5, new ListNode(6, new ListNode(4)));
const testCase0ans = new ListNode(7, new ListNode(0, new ListNode(8)));

const testCase1 = new ListNode(0);

const testCase2a = new ListNode(
    9,
    new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9)))))),
);
const testCase2b = new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9))));
const testCase2ans = new ListNode(
    8,
    new ListNode(
        9,
        new ListNode(9, new ListNode(9, new ListNode(0, new ListNode(0, new ListNode(0, new ListNode(1)))))),
    ),
);

export default {
    run: () => [
        { result: addTwoNumbers(null, null), expected: null },
        { result: addTwoNumbers(testCase0a, testCase0b), expected: testCase0ans },
        { result: addTwoNumbers(testCase1, testCase1), expected: testCase1 },
        { result: addTwoNumbers(testCase2a, testCase2b), expected: testCase2ans },
    ],
} as Exercise;
