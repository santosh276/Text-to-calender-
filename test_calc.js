const today = new Date();
today.setHours(0,0,0,0);

const target1 = new Date();
target1.setHours(0,0,0,0); // today

const target2 = new Date();
target2.setDate(target2.getDate() + 5);
target2.setHours(0,0,0,0); // 5 days from now

function getDaysRemaining(targetDate) {
    const today = new Date();
    today.setHours(0,0,0,0);
    const target = new Date(targetDate.getTime());
    target.setHours(0,0,0,0);
    const diff = target - today;
    const days = Math.round(diff / (1000 * 60 * 60 * 24));
    return days;
}

console.log("Target 1 (today):", getDaysRemaining(target1));
console.log("Target 2 (+5 days):", getDaysRemaining(target2));
