const { expect } = require('chai')

const count = require('./count')

describe('my-first-io', () => {
    it ('should succeed on counting lines', () =>{
        const a = `Hola \n soc l'Àlex \n i sóc molt feliç!`

        const res= count(a)

        expect(res).to.equal(2)
    })

    it ('should return null when there are now lines', () =>{
        const a = `Hola soc l'Àlex i sóc molt feliç!`

        const res= count(a)

        expect(res).to.equal(0)
    })
})