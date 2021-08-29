const Messages = require("./Messages")
// @ponicode
describe("scrollDown", () => {
    let inst

    beforeEach(() => {
        inst = new Messages.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.scrollDown()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("componentDidUpdate", () => {
    let inst

    beforeEach(() => {
        inst = new Messages.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidUpdate("Pierre Edouard", "Alabama")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.componentDidUpdate("Michael", "Florida")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.componentDidUpdate("Edmond", "Abruzzo")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.componentDidUpdate("Jean-Philippe", "Abruzzo")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.componentDidUpdate("Edmond", "Île-de-France")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.componentDidUpdate(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
