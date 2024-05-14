export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const splitByDash = (str) =>{
    return str.split("_").join(" ");
}

