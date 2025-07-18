import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
];

const questions = [
    {
        title: "What is your age?",
        description: "Please select your age range.",
        type: "number",
        order: 1,
        required: true,
    },
    {
        title: "What is your gender?",
        description: "Select the gender you identify with.",
        type: "radio",
        order: 2,
        options: JSON.stringify(["Male", "Female", "Non-binary", "Prefer not to say"]),
        required: true,
    },
    {
        title: "What state do you live in?",
        description: "Choose your current state of residence.",
        type: "select",
        order: 3,
        options: JSON.stringify(usStates),
        required: true,
    },
    {
        title: "Marital Status?",
        description: "Select your current marital status.",
        type: "radio",
        order: 4,
        options: JSON.stringify(["Single", "Married", "Divorced", "Widowed", "Separated"]),
        required: true,
    },
    {
        title: "How many people live in your household?",
        description: "Include yourself and anyone who lives with you.",
        type: "number",
        order: 5,
        required: true,
    },
    {
        title: "Employment Status",
        description: "Please select your current employment status.",
        type: "radio",
        order: 6,
        options: JSON.stringify(["Employed full-time", "Employed part-time", "Self-employed", "Unemployed", "Retired", "Student"]),
        required: true,
    },
    {
        title: "Do you currently have any of the following health conditions?",
        description: "Select all that apply.",
        type: "checkbox",
        order: 7,
        options: JSON.stringify(["Diabetes", "Heart Disease", "Arthritis", "Cancer", "Chronic Pain", "None of the above"]),
        required: true,
    },
    {
        title: "How many prescription medications do you currently take?",
        description: "Enter the number of medications you take regularly.",
        type: "number",
        order: 8,
        required: true,
    },
    {
        title: "How would you describe your current mobility?",
        description: "Select the option that best describes your mobility.",
        type: "radio",
        order: 9,
        options: JSON.stringify(["Fully mobile", "Some difficulty", "Use assistive device", "Requires assistance"]),
        required: true,
    },
    {
        title: "Do you currently need help with any daily activities?",
        description: "Daily activities include bathing, dressing, eating, etc.",
        type: "radio",
        order: 10,
        options: JSON.stringify(["Yes", "No", "Sometimes"]),
        required: true,
    },
    {
        title: "Do you have a family history of long-term care needs?",
        description: "Think of parents, grandparents, or close relatives.",
        type: "radio",
        order: 11,
        options: JSON.stringify(["Yes", "No", "Not sure"]),
        required: true,
    },
    {
        title: "What is your annual household income?",
        description: "Choose the income range that fits your household.",
        type: "select",
        order: 12,
        options: JSON.stringify(["Under $25,000", "$25,000 - $49,999", "$50,000 - $74,999", "$75,000 - $99,999", "$100,000+"]),
        required: true,
    },
    {
        title: "What types of insurance do you currently have?",
        description: "Select all types of insurance you currently hold.",
        type: "radio",
        order: 13,
        options: JSON.stringify(["Health", "Life", "Disability", "Long-term care", "None"]),
        required: true,
    },
    {
        title: "How much have you saved specifically for long-term care?",
        description: "Estimate your total savings for long-term care.",
        type: "select",
        order: 14,
        options: JSON.stringify(["None", "Under $10,000", "$10,000 - $49,999", "$50,000 - $99,999", "$100,000+"]),
        required: true,
    },
    {
        title: "What would be a comfortable monthly budget for long-term care services?",
        description: "Choose the amount you could comfortably afford monthly.",
        type: "select",
        order: 15,
        options: JSON.stringify(["Under $500", "$500 - $1,000", "$1,000 - $2,000", "$2,000 - $3,000", "$3,000+"]),
        required: true,
    },
    {
        title: "What are your biggest concerns about paying for long-term care?",
        description: "Select all that apply.",
        type: "checkbox",
        order: 16,
        options: JSON.stringify(["Outliving savings", "Not qualifying for Medicaid", "High cost of care", "Burdening family", "Lack of insurance"]),
        required: true,
    }
];

async function main() {
    await prisma.user.deleteMany();
    await prisma.question.deleteMany(); // Clear existing questions
    await prisma.question.createMany({
        data: questions
    })
}

main()
    .then(() => {
        console.log('Seeding complete');
        return prisma.$disconnect();
    })
    .catch((e) => {
        console.error(e);
        return prisma.$disconnect();
    });
