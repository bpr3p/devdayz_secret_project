difficulties = Difficulty.create([{ name: 'Easy', rating: 1 }, { name: 'Less Easy', rating: 2 }, { name: 'Medium', rating: 3 }, { name: 'Kind of hard', rating: 4 }, { name: 'Difficult', rating: 5 }, { name: 'Evil', rating: 9 }])
Clue.create([{ word: 'Banana', difficulty: difficulties.first }, { word: 'Pencil', difficulty: difficulties.first }, { word: 'Brick', difficulty: difficulties.third }, { word: 'Existentialism', difficulty: difficulties.last }])
