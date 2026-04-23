// Data for the application
const electionProcess = [
    {
        title: "Voter Registration",
        desc: "The first step is ensuring you are eligible and registered to vote. This involves verifying your identity, age, and residency requirements according to local laws.",
        icon: "fa-solid fa-address-card"
    },
    {
        title: "Candidate Nomination",
        desc: "Political parties and independent candidates submit their nominations to run for office. This phase includes vetting and finalizing the list of eligible candidates.",
        icon: "fa-solid fa-users"
    },
    {
        title: "Campaigning",
        desc: "Candidates present their platforms, debate issues, and rally support from voters. This period is strictly regulated to ensure fair play and transparency in funding.",
        icon: "fa-solid fa-bullhorn"
    },
    {
        title: "Voting Day",
        desc: "Registered voters cast their ballots at designated polling stations or via mail-in voting. Security measures are in place to ensure a secret and fair ballot.",
        icon: "fa-solid fa-person-booth"
    },
    {
        title: "Counting & Declaration",
        desc: "Votes are securely counted, often under the observation of independent monitors. The final results are tallied, verified, and officially declared.",
        icon: "fa-solid fa-chart-pie"
    }
];

const electionTimeline = [
    {
        date: "6 Months Before",
        title: "Voter Registration Opens",
        desc: "Citizens are encouraged to register or update their voter details."
    },
    {
        date: "3 Months Before",
        title: "Candidate Filing Deadline",
        desc: "All candidates must finalize their paperwork to appear on the ballot."
    },
    {
        date: "1 Month Before",
        title: "Official Campaign Period Starts",
        desc: "Intensive campaigning, town halls, and official debates take place."
    },
    {
        date: "1 Week Before",
        title: "Early Voting / Mail-in Starts",
        desc: "Eligible voters can cast their ballots before the official election day."
    },
    {
        date: "Election Day",
        title: "Polls Open",
        desc: "The main day for casting votes in person."
    },
    {
        date: "Post-Election",
        title: "Results & Certification",
        desc: "Counting concludes, audits are performed, and winners are certified."
    }
];

const rulesAndRegs = [
    {
        title: "Model Code of Conduct",
        desc: "A set of guidelines issued by the Election Commission to regulate political parties and candidates prior to elections. It ensures level playing field and ethical campaigning.",
        icon: "fa-solid fa-book-open"
    },
    {
        title: "Campaign Finance Limits",
        desc: "Strict limits are placed on how much a candidate or party can spend during an election. All expenditures must be tracked and reported transparently to prevent undue influence.",
        icon: "fa-solid fa-money-bill-wave"
    },
    {
        title: "Voter Identification",
        desc: "Voters must present valid, government-issued photo identification at the polling booth to prevent voter fraud and ensure only eligible citizens cast a ballot.",
        icon: "fa-solid fa-id-badge"
    },
    {
        title: "Media Regulation",
        desc: "During the 'silence period' (usually 48 hours before polling), no active campaigning or election-related public meetings are allowed to give voters a peaceful time to decide.",
        icon: "fa-solid fa-tv"
    }
];

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.content-section');
const processContainer = document.getElementById('process-container');
const timelineContainer = document.getElementById('timeline-container');
const rulesContainer = document.getElementById('rules-container');
const botToggle = document.getElementById('bot-toggle');
const botPanel = document.getElementById('bot-panel');
const closeBot = document.getElementById('close-bot');
const botMessage = document.getElementById('bot-message');

// Navigation Logic
navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Update active nav
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        // Update active section
        const targetId = item.getAttribute('data-target');
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });

        // Update Bot Message based on section
        updateBotMessage(targetId);
    });
});

function updateBotMessage(sectionId) {
    let message = "";
    switch(sectionId) {
        case 'process-section':
            message = "This section breaks down the election into easy steps. Hover over the cards to learn more about each phase!";
            break;
        case 'timeline-section':
            message = "Here is a typical timeline leading up to Election Day. Timeframes can vary slightly depending on the region.";
            break;
        case 'rules-section':
            message = "Rules ensure fair play. Click on any rule to expand it and read the details.";
            break;
        default:
            message = "How can I help you understand the election process today?";
    }
    botMessage.textContent = message;
    
    // Auto show bot when switching tabs
    if(!botPanel.classList.contains('visible')) {
        botPanel.classList.add('visible');
        setTimeout(() => {
            botPanel.classList.remove('visible');
        }, 5000);
    }
}

// Render Process Cards
function renderProcess() {
    processContainer.innerHTML = '';
    electionProcess.forEach((step, index) => {
        const card = document.createElement('div');
        card.className = 'process-card';
        card.innerHTML = `
            <div class="process-step-num">${index + 1}</div>
            <div class="process-icon">
                <i class="${step.icon}"></i>
            </div>
            <h3>${step.title}</h3>
            <p>${step.desc}</p>
        `;
        processContainer.appendChild(card);
    });
}

// Render Timeline
function renderTimeline() {
    timelineContainer.innerHTML = '';
    electionTimeline.forEach(item => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <span class="timeline-date">${item.date}</span>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </div>
        `;
        timelineContainer.appendChild(timelineItem);
    });
}

// Render Rules
function renderRules() {
    rulesContainer.innerHTML = '';
    rulesAndRegs.forEach(rule => {
        const ruleItem = document.createElement('div');
        ruleItem.className = 'rule-item';
        ruleItem.innerHTML = `
            <div class="rule-header">
                <h3>
                    <i class="${rule.icon}"></i>
                    ${rule.title}
                </h3>
                <i class="fa-solid fa-chevron-down rule-toggle"></i>
            </div>
            <div class="rule-body">
                <div class="rule-content">
                    ${rule.desc}
                </div>
            </div>
        `;

        // Add accordion functionality
        const header = ruleItem.querySelector('.rule-header');
        header.addEventListener('click', () => {
            // Close others
            document.querySelectorAll('.rule-item').forEach(item => {
                if (item !== ruleItem) item.classList.remove('active');
            });
            // Toggle current
            ruleItem.classList.toggle('active');
        });

        rulesContainer.appendChild(ruleItem);
    });
}

// Bot Toggle Logic
botToggle.addEventListener('click', () => {
    botPanel.classList.toggle('visible');
});

closeBot.addEventListener('click', () => {
    botPanel.classList.remove('visible');
});

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderProcess();
    renderTimeline();
    renderRules();
    
    // Show bot greeting after 1 second
    setTimeout(() => {
        botPanel.classList.add('visible');
    }, 1000);
});
