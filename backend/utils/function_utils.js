/**
 * Flattens data from Sequelize objects to plain objects
 * @param {Array|Object} data - The data to flatten
 * @returns {Array} Flattened data array
 */
const flattenData = (data) => {
    if (Array.isArray(data) && data.length > 0) {
        return data.map(item => item.dataValues || item);
    }
    return data;
};

/**
 * Calculates growth between 2017 and 2018 values
 * @param {Array} data - Array of yearly data
 * @param {string} valueKey - Key name for the value to compare
 * @returns {Object} Object containing year2018 value and formatted growth percentage
 */

const calculateGrowth = (data, valueKey) => {
    const flatData = flattenData(data);
    const year2017 = flatData.find(item => item.tahun === 2017);
    const year2018 = flatData.find(item => item.tahun === 2018);
    
    if (!year2017 || !year2018) {
        return {
            year2018: 0,
            growthFormatted: "+0.00%"
        };
    }

    const currentValue = parseFloat(year2018[valueKey]);
    const previousValue = parseFloat(year2017[valueKey]);
    const growthPercentage = ((currentValue - previousValue) / previousValue) * 100;
    const sign = growthPercentage >= 0 ? '+' : '';
    const isPositive = growthPercentage >= 0;

    return {
        value: valueKey,
        year2018: currentValue,
        growthFormatted: `${sign}${growthPercentage.toFixed(2)}%`,
        isPositive: isPositive,
    };
};

/**
 * Calculates growth between two specific values
 * @param {number} currentValue - The newer value
 * @param {number} previousValue - The older value
 * @returns {string} Formatted growth percentage with sign
 */
const calculateGrowthBetweenValues = (currentValue, previousValue) => {
    const growthPercentage = ((currentValue - previousValue) / previousValue) * 100;
    const sign = growthPercentage >= 0 ? '+' : '';
    return `${sign}${growthPercentage.toFixed(2)}%`;
};

module.exports = {
    flattenData,
    calculateGrowth,
    calculateGrowthBetweenValues
};