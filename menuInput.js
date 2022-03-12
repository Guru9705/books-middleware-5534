const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
  
const menuFunc = () => {
    readline.question(`1 - Show all books 2 - Add a new book 3 - Quit `, menu => {
        if (menu == 1) {
            console.log("black friday \n white moon \n 3 mistakes of my life");
            menuFunc()
        } else if (menu == 2) {
            readline.question(`what book do u want to add `, book => {
                console.log("book added successfully")
                menuFunc()
            })
        } else if (menu == 3) {
            readline.question(`Are you sure you want to quit - press Y to quit`, res => {
                if (res == 'Y') {
                    console.log("Bye Bye");
                    readline.close()
                }
            })
        } else {
            console.log("You have selected an invalid entry so please press 1, 2 or 3")
            menuFunc()
        }
      })
}

menuFunc()

