 // Export a function named 'getDate' from the module
module.exports.getDate = function getDate() {
    // Get the current date and time string in the timezone "Australia/Brisbane"
    let aestString = new Date().toLocaleString("en-US", {timeZone: "America/Lima"});
    
    // Convert that string back into a Date Object
    let aestDate = new Date(aestString);
    return aestDate; // Return the formatted date and time
};
