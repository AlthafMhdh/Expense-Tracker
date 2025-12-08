import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";

    for (let i=0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }
    return initials.toUpperCase();
}

// export const addThousandSeparator = (num) => {
//     if (num == null || isNaN(num)) return"";

//     const [integerPart, fractionalPart] = num.toString().split(".");
//     const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

//     return fractionalPart
//         ? `${formattedInteger}.${fractionalPart}`
//         : formattedInteger;
// }

export const addThousandSeparator = (num) => {
  if (num === null || num === undefined || num === "") return "";

  const number = Number(num); // ✅ Convert string to number safely

  if (isNaN(number)) return "";

  const isNegative = number < 0;
  const absValue = Math.abs(number);

  const [integerPart, fractionalPart] = absValue.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const formattedNumber = fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;

  return isNegative ? `-${formattedNumber}` : formattedNumber;
};


export const prepareExpenseBarChartData = (data = []) => {
    const chartData = data.map((item) => ({
        month:moment(item?.date).format('Do MMM'),
        category:item?.category,
        amount:item?.amount,
    }));

    return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
    if (!Array.isArray(data)) {
        console.error("Expected array but got:", data);
        return [];  // prevent crash
    }
    
    const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month:moment(item?.date).format('Do MMM'),
        amount:item?.amount,
        source:item?.source,
    }));

    return chartData;
}

export const prepareExpenseLineChartData = (data = []) => {
    if (!Array.isArray(data)) {
        console.error("Expected array but got:", data);
        return [];  // prevent crash
    }
    
    const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month:moment(item?.date).format('Do MMM'),
        amount:item?.amount,
        source:item?.category,
    }));

    return chartData;
}