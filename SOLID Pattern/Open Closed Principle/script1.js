const questions = [
    {
        type: 'boolean',
        description: 'This video is useful'
    },
    {
        type: 'multipleChoice',
        description: 'What is your favourite language?',
        options: ['CSS', 'HTML', 'JS', 'Python']
    },
    {
        type: 'text',
        description: 'Describe your favourite JS feature.'
    },
    {
        type: 'range',
        description: 'What is the speed limit in your city?'
    }
]

function printQuiz(questions) {
    questions.forEach(question => {
        console.log(question.description);
        switch (question.type) {
            case 'boolean':
                console.log("1. True");
                console.log("2. False");
                break;
            case 'multipleChoice':
                question.options.forEach((option, index) => {
                    console.log(`${index + 1}. ${option}`);
                });
                break
            case 'text':
                console.log(`Answer: __________________ `);
                break
            case 'range':
                console.log(`Min: __________________ `);
                console.log(`Max: __________________ `);
                break
            default:
                break;
        }
    });
}


printQuiz(questions);