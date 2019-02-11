const { expect } = require('chai')

const countAsync = require('./countAsync')

describe('my first async io', ()=> {
    it('should succed on right data', () => {
        const a = `Hola \n soc l'Àlex \n i sóc molt feliç!`

        const res= countAsync(a, (error, data) => {
            if (error) return error
            return data
        })
        expect(res).to.equal(2)
    })

    it('should fail when data is not a string', () => {
        const a = 1

        const res= countAsync(a, (error, data) => {
            if (error) return error
            return data
        })
        expect(res).to.equal('1 is not a string')
    })
})