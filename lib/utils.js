module.exports = {
    generateID: function (length) {
        let result = ""
        let characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        let charactersLength = characters.length
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    },

    generateEmail: () => {
        let values = "abcdefg1222121"
        let email = ""
        let temp
        for (let i = 0; i < 10; i++) {
            temp = values.charAt(Math.round(values.length * Math.random()))
            email += temp
        }
        temp = ""
        email += "@"
        for (let i = 0; i < 9; i++) {
            temp = values.charAt(Math.round(values.length * Math.random()))
            email += temp
        }
        temp += ".com"
        return email
    },

    generateNumbers: () => {
        let numbers = Math.floor(Math.random() * 9000000000) + 100000000
        return numbers.toString()
    }

}