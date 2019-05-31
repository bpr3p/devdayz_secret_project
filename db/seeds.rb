difficulties = Difficulty.create([{ name: 'Easy', rating: 1 }, { name: 'Medium', rating: 3 }, { name: 'Hard', rating: 5 }, { name: 'Nail Biter', rating: 7 }])

Year.create([{ year: 2018 }, { year: 2019, current: true }, { year: 2020 }])

Event.create([{ name: "Pictionary", description: "pictionary 2018", year: Year.first }, { name: "Pictionary", description: "pictionary 2019", year: Year.second }, { name: "Pictionary", description: "pictionary 2020", year: Year.last }])

Clue.create([{ word: 'Banana', difficulty: difficulties.first, event: Event.first }, { word: 'Pencil', difficulty: difficulties.second, event: Event.first }, { word: 'Brick', difficulty: difficulties.third, event: Event.first }, { word: 'Existentialism', difficulty: difficulties.last, event: Event.first }, { word: 'Frog', difficulty: difficulties.find_by(name: "Hard"), event: Event.first }, { word: 'Acrimonious', difficulty: difficulties.last, event: Event.first }, { word: 'Fantasy', difficulty: difficulties.find_by(name: "hard"), event: Event.first }])
