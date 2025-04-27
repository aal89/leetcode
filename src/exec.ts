import chalk from 'chalk';
import { ok } from 'assert';
import fs from 'fs/promises';

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

const allExercises = async () => {
    return (await fs.readdir(__dirname, { withFileTypes: true }))
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
};

const runExercise = async (exerciseNumber: string) => {
    const exercise = (await import(`./${exerciseNumber}`)).default as Exercise;

    ok(
        isExercise(exercise),
        new BootstrapError(chalk`{red.bold Exercise ${exerciseNumber} does not export a valid exercise type}`),
    );

    console.log(chalk`{bold.blue Executing ${exerciseNumber}...}`);

    const testcases = exercise.run();

    const onlySet = testcases.some((testcase) => testcase.onlyThis);
    const filteredTestcases = onlySet ? testcases.filter((testcase) => testcase.onlyThis) : testcases;

    filteredTestcases.forEach((testcase, idx) => {
        const passed = JSON.stringify(testcase.result) === JSON.stringify(testcase.expected);
        console.log(chalk`{blue Testcase ${idx}} {bold.${passed ? 'green' : 'red'} ${passed ? 'PASSED' : 'FAILED'}}`);

        if (!passed) {
            console.log(chalk`  {bold Expected:} ${testcase.expected}`);
            console.log(chalk`  {bold Received:} ${testcase.result}`);
        }
    });
};

(async () => {
    try {
        ok(process.argv.length > 2, new BootstrapError(chalk`{red.bold No exercise specified in argv}`));
        const userInput = process.argv[2];

        if (userInput === 'all') {
            const allExercisesList = await allExercises();

            for (const exercise of allExercisesList) {
                await runExercise(exercise);
            }
        } else {
            await runExercise(userInput);
        }
    } catch (err) {
        if (err instanceof BootstrapError) {
            console.error(err.message);
            process.exit(1);
        }

        console.error((err as Error).message);
        process.exit(1);
    }
})();
