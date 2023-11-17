import Mexp from 'math-expression-evaluator';

const mexp = new Mexp();

export const validateEquation = async (equation, numbersRE, numSet, target, solution, validSolutions) => {
    try {
        validateMathematicalEquation(equation);
        validateNumberUsage(equation, numbersRE);
        validateNumberSet(equation, numSet, numbersRE);
        validateSolutionCorrectness(equation, target, solution);
        validateUniqueSolution(equation, validSolutions);
    } catch (error) {
        throw error;
    }
    return true;
};

const validateMathematicalEquation = (equation) => {
    try {
        mexp.eval(equation);
    } catch (error) {
        throw new Error('Invalid mathematical equation');
    }
};

const validateNumberUsage = (equation, numbersRE) => {
    let numsUsed = equation.match(numbersRE);
    if (!numsUsed) throw new Error('Invalid: No numbers used in solution');
    if (numsUsed.length > 5) throw new Error('Invalid: There are too many numbers in your solution');
    if (numsUsed.length < 5) throw new Error('Invalid: You must use all 5 numbers individually');
};

const validateNumberSet = (equation, numSet, numbersRE) => {
    let numsUsed = equation.match(numbersRE);
    for (let i = 0; i < numSet.length; i++) {
        if (!numSet.includes(numsUsed[i])) {
            throw new Error(`Invalid: ${numsUsed[i]} is not a valid number`);
        }
    }
};

const validateSolutionCorrectness = (equation, target, solution) => {
    if (Number(target) !== Number(solution)) {
        throw new Error(`Invalid: This solution does not equal ${target}`);
    }
};

const validateUniqueSolution = (equation, validSolutions) => {
    if (validSolutions.includes(equation)) {
        throw new Error('Invalid: You have already found this solution');
    }
};