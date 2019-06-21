User.create!({email: "admin@3playmedia.com", password: "123456", password_confirmation: "123456" })

Year.create([{ year: 2018 }, { year: 2019, current: true }, { year: 2020 }])

categories = Category.create([{ name: 'Houses', year: Year.second }, { name: 'Boats', year: Year.second }, { name: 'Cars', year: Year.second }, { name: 'Trees', year: Year.second }])

Event.create([{ name: "Pictionary", description: "pictionary 2018", year: Year.first }, { name: "Pictionary", description: "pictionary 2019", year: Year.second }, { name: "Pictionary", description: "pictionary 2020", year: Year.last }])

Clue.create([{ word: 'Banana', category: categories.first, event: Event.second }, { word: 'Pencil', category: categories.second, event: Event.second }, { word: 'Brick', category: categories.third, event: Event.second }, { word: 'Existentialism', category: categories.last, event: Event.second }, { word: 'Frog', category: Category.find_by(name: "Cars"), event: Event.second }, { word: 'Acrimonious', category: Category.last, event: Event.second }, { word: 'Fantasy', category: Category.find_by(name: "Trees"), event: Event.second }])
