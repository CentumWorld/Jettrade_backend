
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email));
}

function isValidPhone(phone) {
  const re = /^(\+91[\d]{10}|\d{10})$/;
  return re.test(phone);
}

  

const isValidBody = function (Stringvalue) {
    if (typeof Stringvalue === "undefined" || Stringvalue === null) return false;
    if (typeof Stringvalue === "string" && Stringvalue.trim().length === 0) return false;
    return true;
  };

const checkSpaceBtwWord = function (string) {
    let str = string.split("").filter(x => x !== " ")
      return string = str.join("");
}

const isValidName = (value) => { return (/^[a-z/\s/A-Z|.|,]+$/).test(value)}

const isValidPassword = (value) => { return (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/.test(value)); }


const isValidCity = (value) => { return (/^[A-za-z]+$/).test(value) }

const isValidPinCode = (value) => { return (/^[1-9][0-9]{5}$/).test(value) }

const isValidProductName = (value) => { return (/^[A-Za-z]+|[A-Za-z]+\[0-9]+$/).test(value) }
const isValidPrice = (value) => { return (/^(?:0|[1-9]\d*)(?:\.(?!.*000)\d+)?$/).test(value) }
const isValidateSize = (value) => { return ["S", "XS", "M", "X", "L", "XXL", "XL"].indexOf(value) !== -1 }
const isValidCurrencyId = (value) => { return (/^(INR|inr|Inr)$/).test(value) }
const isValidNo = (value) => { return (/^[0-9]+$/).test(value) }
const isValidInstallments = (value) => { return (/^\d*\.?\d*$/).test(value) }
const isValidImage = (value) => { return (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/).test(value) }


function isValidUserId(value) {
  const re = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/; // Should have at least 1 letter and 1 digit, minimum length 6
  return re.test(value);
}



module.exports={isValidEmail,isValidPhone,isValidName,isValidPassword,isValidCity,isValidPinCode,isValidProductName,isValidPrice,isValidateSize,isValidCurrencyId,isValidNo,isValidImage,isValidInstallments,isValidBody,checkSpaceBtwWord,isValidUserId}