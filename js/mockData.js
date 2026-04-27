// Mock Data for School LMS Prototype

const mockLeads = [
    { id: 1, name: "Aisha Khan", phone: "+91 98765 43210", source: "Meta", status: "New", area: "North", allocatedTo: "Sarah Jenkins" },
    { id: 2, name: "Rahul Sharma", phone: "+91 87654 32109", source: "Justdial", status: "Follow Up", area: "South", allocatedTo: "Mike Ross" },
    { id: 3, name: "Priya Desai", phone: "+91 76543 21098", source: "Website", status: "Interested", area: "East", allocatedTo: "Anita Patel" },
    { id: 4, name: "Rohan Gupta", phone: "+91 65432 10987", source: "Website", status: "New", area: "West", allocatedTo: "David Kim" },
    { id: 5, name: "Kiran Singh", phone: "+91 54321 09876", source: "Meta", status: "New", area: "North", allocatedTo: "Sarah Jenkins" },
    { id: 6, name: "Sneha Reddy", phone: "+91 43210 98765", source: "Justdial", status: "Not Interested", area: "South", allocatedTo: "Mike Ross" },
    { id: 7, name: "Vikram Malhotra", phone: "+91 32109 87654", source: "Meta", status: "Follow Up", area: "North", allocatedTo: "Sarah Jenkins" },
    { id: 8, name: "Arjun Das", phone: "+91 21098 76543", source: "Justdial", status: "New", area: "East", allocatedTo: "Anita Patel" },
    { id: 9, name: "Meera Nair", phone: "+91 10987 65432", source: "Meta", status: "New", area: "West", allocatedTo: "David Kim" },
    { id: 10, name: "Karan Patel", phone: "+91 09876 54321", source: "Website", status: "Interested", area: "North", allocatedTo: "Sarah Jenkins" },
    { id: 11, name: "Neha Verma", phone: "+91 98760 12345", source: "Meta", status: "New", area: "South", allocatedTo: "Mike Ross" },
    { id: 12, name: "Ravi Kumar", phone: "+91 87650 23456", source: "Justdial", status: "Admitted", area: "East", allocatedTo: "Anita Patel" },
    { id: 13, name: "Pooja Joshi", phone: "+91 76540 34567", source: "Meta", status: "New", area: "West", allocatedTo: "David Kim" },
    { id: 14, name: "Sanjay Mishra", phone: "+91 65430 45678", source: "Website", status: "Follow Up", area: "North", allocatedTo: "Sarah Jenkins" },
];

const mockRecordings = [
    {
        id: 101,
        leadName: "Rahul Sharma",
        date: "Today, 10:30 AM",
        duration: "04:12",
        sentiment: "Positive",
        telecaller: "Mike Ross",
        transcript: [
            { sender: "agent", text: "Hello, am I speaking with Rahul?" },
            { sender: "customer", text: "Yes, speaking." },
            { sender: "agent", text: "Hi Rahul, this is Mike from EduLead Academy. We saw your inquiry on Justdial." },
            { sender: "customer", text: "Ah yes! I was looking for admission details for 11th grade Science." },
            { sender: "agent", text: "Great. Our Science program is highly rated. We have dedicated labs and expert faculty. Would you like me to send the brochure?" },
            { sender: "customer", text: "Yes please, that sounds great. Send it on my WhatsApp.", sentiment: "positive" }
        ]
    },
    {
        id: 102,
        leadName: "Sneha Reddy",
        date: "Yesterday, 2:15 PM",
        duration: "01:45",
        sentiment: "Negative",
        telecaller: "Mike Ross",
        transcript: [
            { sender: "agent", text: "Hello, am I speaking with Sneha?" },
            { sender: "customer", text: "Yes." },
            { sender: "agent", text: "Hi Sneha, this is Mike from EduLead regarding your school admission inquiry." },
            { sender: "customer", text: "I already took admission elsewhere, please stop calling.", sentiment: "negative" }
        ]
    },
    {
        id: 103,
        leadName: "Priya Desai",
        date: "Yesterday, 4:45 PM",
        duration: "03:20",
        sentiment: "Positive",
        telecaller: "Anita Patel",
        transcript: [
            { sender: "agent", text: "Hello Priya, this is Anita from EduLead." },
            { sender: "customer", text: "Hi Anita." },
            { sender: "agent", text: "I noticed you were browsing our primary school programs on our website." },
            { sender: "customer", text: "Yes, I am looking for my daughter.", sentiment: "neutral" },
            { sender: "agent", text: "Our primary campus is very close to your east zone. Would you like to schedule a campus tour?" },
            { sender: "customer", text: "That would be wonderful, weekend works best.", sentiment: "positive" }
        ]
    }
];

const mockStats = {
    totalLeads: 1248,
    metaLeads: 840,
    justdialLeads: 408,
    activeCalls: 12,
    conversionRate: "18.5%"
};
