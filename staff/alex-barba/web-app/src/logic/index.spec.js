
const logic = require('.')
const {expect} = require('chai')

describe("logic testing", () => {
    describe("register", () => {
        let name = "Manuel";
        let surname = "Barzi";
        let email = `manuelbarzi@mail.com-${Math.random()}`;
        let password = "123";
        let passwordConfirm = password;
  
        it("should succed on correct data", () =>
        logic.register(name, surname, email, password, passwordConfirm)
            .then(result => expect(result).to.not.exist)
        )
  
        it("should fail on empty name", () =>
            expect(() => logic.register("", surname, email, password)).to.throw(Error,
            "name is empty"
            ));
    
        it("should fail on empty surname", () =>
            expect(() => logic.register(name, "", email, password)).to.throw(Error,
            "surname is empty"
            ));
    
        it("should fail on empty email", () =>
            expect(() => logic.register(name, surname, "", password)).to.throw(Error,
            "email is empty"
            ));
    
        it("should fail on empty password", () => {
            expect(() => logic.register(name, surname, email, "")).to.throw(Error,
            "password is empty"
            );
        });
    
        it("should fail when name is a number", () =>
            expect(() => logic.register(1, surname, email, password)).to.throw(TypeError,
            "1 is not a string"
            ));
    
        it("should fail when surname is a bolean", () =>
            expect(() => logic.register(name, true, email, password)).to.throw(TypeError,
            "true is not a string"
            ));
    
        it("should fail when email is an array", () =>
            expect(() =>
            logic.register(name, surname, [1, 2, 3], password)
            ).to.throw(TypeError,"1,2,3 is not a string"));
    
        it("should fail when password is an object", () =>
            expect(() =>
            logic.register(name, surname, email, { wrong: "password" })
            ).to.throw(TypeError,"[object Object] is not a string"));
        });
    
        describe("login", () => {
        const name = "Manuel";
        const surname = "Barzi";
        let email;
        const password = "789";
        const passwordConfirm = password;
    
        const emailTest = "dasdasdasd";
        const passwordTest = "111";
    
        beforeEach(() => {
            email = `manuelbarzi@mail.com-${Math.random()}`;
            return logic.register(name, surname, email, password, passwordConfirm);
        });
    
        it("should succeed on correct credentials", () =>
            logic.login(email, password).then(() => {
            expect(logic.__userId__).to.exist;
            expect(logic.__userApiToken__).to.exist;
            }));
    
        it("should fail on wrong email", () =>
            logic
            .login(emailTest, password)
            .catch(error => {
                expect(error).to.exist;
                expect(error.message).to.equal(
                `user with username \"dasdasdasd\" does not exist`
                );
            }));
    
        it("should fail on wrong password", () =>
            logic
            .login(email, passwordTest)
            .catch(error => {
                expect(error).to.exist;
                expect(error.message).to.equal(`username and/or password wrong`);
            }));
    
        it("should fail on empty email", () =>
            expect(() => logic.login("", password)).to.throw(Error ,"email is empty"));
    
        it("should fail on empty password", () => {
            expect(() => logic.login(email, "")).to.throw(Error ,"password is empty");
        });
    
        it("should fail when email is an array", () =>
            expect(() => logic.login([1, 2, 3], password)).to.throw(TypeError,
            "1,2,3 is not a string"
            ));
    
        it("should fail when password is an object", () =>
            expect(() => logic.login(email, { wrong: "password" })).to.throw(TypeError,
            "[object Object] is not a string"
            ));
        });
    
        describe("retrieveUser", () => {
        const name = "Manuel";
        const surname = "Barzi";
        let email;
        const password = "123";
        const passwordConfirm = password;
    
    
        beforeEach(() => {
            email = `manuelbarzi@mail.com-${Math.random()}`;
    
            return logic.register(name, surname, email, password, passwordConfirm)
                .then(() => logic.login(email, password));
        });
    
        it("should succeed with correct credentials", () =>
            logic.retrieveUser()
                .then((data) => expect(data).to.exist)
        )
        });

        describe("updateUser", () => {
            const name = "Manuel";
            const surname = "Barzi";
            let email;
            const password = "123";
            const passwordConfirm = password;
            const data = { favourites: [{ id: "1011334", name: "3-D Man" }] };
        
            beforeEach(() => {
              email = `manuelbarzi@mail.com-${Math.random()}`;
        
              return logic.register(name, surname, email, password, passwordConfirm)
                .then(() => logic.login(email, password))
            });
        
            it("should succed pushing new data", () => {
              return logic.updateUser(data)
                .then(data => {
                  expect(data).to.exist
                  expect(data.status).to.equal("OK")})
            });
        
            it("should fail when data is not an object", () => {
                expect(() => logic.updateUser(12)).to.throw(Error, "12 is not an object");
            });
        
          });
})