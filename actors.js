
const sample_size = parseInt(document.getElementById('sample_size').value) == NaN ? 
    999 : parseInt(document.getElementById('sample_size').value)

let graph_data = []
    graph_data_isolated = []

class Person {
    constructor(infected){
        this.infected = infected
        this.x = 0
        this.y = 0
        this.location = null
    }
    draw(djs){
        djs.point(this.x, this.y, this.infected?'red':'#040')
    }
    contract(chance){
        this.infected = this.infected ? true : Math.random() < chance
    }
    move(buildings){
        let b = buildings[Math.floor(Math.random() * 5)]
        this.x = b.x + Math.floor(Math.random() * 40)
        this.y = b.y + Math.floor(Math.random() * 40)
        this.location = b
    }
    return_home(){
        this.x = Math.floor(Math.random() * 100)
        this.y = Math.floor(Math.random() * 200)
        this.location = null
    }
}
class Building{
    constructor(y){
        this.x = 160
        this.y = y
        this.w = 40
        this.h = 40
    }
    draw(djs){
        djs.rect(this.x, this.y, this.w, this.h, 'blue', false)
    }
}

let people_isolated = []
let people = []
let buildings = []
let buildings_isolated = []

for (let i = 0; i < 5; i++) {
    buildings.push(new Building(i * 40))
    buildings_isolated.push(new Building(i * 40))
}

for (let i = 0; i < sample_size; i++) {
    people.push(new Person(false))
    people_isolated.push(new Person(false))
}
people.push(new Person(true))
people_isolated.push(new Person(true))
