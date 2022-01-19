// Now here we will implement the Open Closed Principle(OCP)
/* We have make divide or separate the functionalities 
in such way that it should be open to add new functionalities
and closed for modifiaction
*/

/* We can achieve this by separating each functionalities 
into each individual classes*/

class Quiz {
    constructor(type, description) {
        this.type = type;
        this.description = description;
    }
}

class BooleanQuiz extends Quiz {
    constructor(type, description) {
        super(type, description);
    }

    printQuizOption() {
        console.log("1. True");
        console.log("2. False");
    }
}

class MultipleChoiceQuiz extends Quiz {
    constructor(type, description, options) {
        super(type, description);
        this.options = options;
    }

    printQuizOption() {
        this.options.forEach((option, index) => {
            console.log(`${index + 1}. ${option}`);
        })
    }
}


class TextQuiz extends Quiz {
    constructor(type, description) {
        super(type, description);
    }

    printQuizOption() {
        console.log('Answer: ________________ ');
    }
}


// Added later
class RangeQuiz extends Quiz {
    constructor(type, description) {
        super(type, description);
    }

    printQuizOption() {
        console.log('Min: ________________ ');
        console.log('Max: ________________ ');
    }
}


function printQuiz(questions) {
    questions.forEach(question => {
        console.log(question.description);
        question.printQuizOption();
    })
}

const questions = [
    new BooleanQuiz('boolean', 'This video is useful'),
    new MultipleChoiceQuiz('multipleChoice', 'What is your favourite language?', ['CSS', 'HTML', 'JS', 'Python']),
    new TextQuiz('text', 'Describe your favourite JS feature.'),
    new RangeQuiz('range', 'Speed limit in your city')
];

printQuiz(questions);