let OBAR; // Investment Array last Object containing (deposit, gain, balance)

// 1. rate is define as inflation rate 
// 2. year is define as investment of years or duration
// 3. amount to be invest for first year of investment
// 4. return percentage we are expecting from our investment
// This function takes above argument and return array with consolidated values
export const IFR = (inflationRate, yearsOfInvestment, inititialAmount, gainRate, currYear) => { // Investment for retirement
    let accumulateVal = null, 
        arr = [],
        prevBal = null,
        d, // deposit
        g, // gain
        b, // balance
        sumOfDeposits,
        sumOfGains;

    function objConstruct(deposit, gain, balance){
        let obj = {}
        obj = {
            deposit,
            gain,
            balance
        }
        return obj
    }

    for(let i=0; i<yearsOfInvestment; i++) {
        let fv_amount, acc_amount;
        if (i===0) {
            d = inititialAmount
            g = POV(inititialAmount, gainRate)
            b = SUM(d,g)

            arr.push(objConstruct(d,g,b))

            sumOfDeposits = inititialAmount
            sumOfGains = g
        }
        else {
            fv_amount = POV(!!accumulateVal ? accumulateVal : inititialAmount, inflationRate)
            acc_amount = SUM(fv_amount, !!accumulateVal ? accumulateVal : inititialAmount)
            prevBal = SUM(acc_amount, b)

            d = acc_amount
            g = POV(prevBal, gainRate)

            // Consolidating deposits and gains
            sumOfDeposits += acc_amount
            sumOfGains += g
            b = SUM(
                sumOfDeposits, currYear ? sumOfGains : (sumOfGains - g)
            )

            arr.push(objConstruct(d,g,b))
        }
        accumulateVal = acc_amount;
    }
    OBAR = arr[arr.length-1]
    return arr;
}

export const ARW = (inflation, withdrawalYears, withdrawalRate, gainRate) => { // After retirement withdrawal
    let 
        closingBalance = OBAR.gain + OBAR.balance,
        lastDeposit = OBAR.deposit,
        arr = [],
        g,
        w,
        b;
    
        function objConstruct(gain, withdrawal, balance){
            let obj = {}
            obj = {
                gain,
                withdrawal,
                balance
            }
            return obj
        }

    for(let i=0; i<withdrawalYears; i++) {
        let acc_amount;
        if(i===0) {
            g = POV(closingBalance, gainRate)
            w = lastDeposit*withdrawalRate
            b = SUM(closingBalance, g) - w
            
            arr.push(objConstruct(g,w,b))

        }else {
            acc_amount = POV(arr[i-1].withdrawal, inflation) + arr[i-1].withdrawal

            g = POV(arr[i-1].balance, gainRate)
            w = acc_amount
            b = SUM(arr[i-1].balance, g) - w
            
            arr.push(objConstruct(g,w,b))
        }
    }
    return arr;
}

export const POV = (amount, percentage) => { // Percentage of Value
    return amount*percentage/100
}

export const SUM = (prev, curr) => { // Simply sum two values
    return prev+curr
}

export const numberWithCommas = (num) => { // Example:- 200000000 => "200,000,000"
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}