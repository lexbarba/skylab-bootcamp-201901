const {argv : [,, ...nums]} = process

console.log(nums.reduce((accum, currentValue) => Number(accum) + Number(currentValue)))
