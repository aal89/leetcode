import chalk from 'chalk';
import { ok } from 'assert';

class BootstrapError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BootstrapError';
    }
}

const isExercise = (exercise: unknown): exercise is Exercise => {
    if (typeof exercise !== 'object' || exercise === null) {
        return false;
    }
    if (typeof (exercise as Exercise).run !== 'function') {
        return false;
    }
    return true;
};

type TestCase = {
    onlyThis?: boolean;
    result: unknown;
    expected: unknown;
};

export type Exercise = {
    run: () => TestCase[];
};

(async () => {
    try {
        ok(process.argv.length > 2, new BootstrapError(chalk`{red.bold No exercise specified in argv}`));
        const userInput = process.argv[2];

        const exercise = (await import(`./${userInput}`)).default as Exercise;

        ok(
            isExercise(exercise),
            new BootstrapError(chalk`{red.bold Exercise ${userInput} does not export a valid exercise}`),
        );

        console.log(chalk`{bold.blue Executing ${userInput}...}`);

        const testcases = exercise.run();

        const onlySet = testcases.some((testcase) => testcase.onlyThis);
        const filteredTestcases = onlySet ? testcases.filter((testcase) => testcase.onlyThis) : testcases;

        filteredTestcases.forEach((testcase, idx) => {
            const passed = testcase.result === testcase.expected;
            console.log(
                chalk`{blue Testcase ${idx}} {bold.${passed ? 'green' : 'red'} ${passed ? 'PASSED' : 'FAILED'}}`,
            );

            if (!passed) {
                console.log(chalk`  {bold Expected:} ${testcase.expected}`);
                console.log(chalk`  {bold Received:} ${testcase.result}`);
            }
        });
    } catch (err) {
        if (err instanceof BootstrapError) {
            console.error(err.message);
            process.exit(1);
        }

        console.error((err as Error).message);
        process.exit(1);
    }
})();
