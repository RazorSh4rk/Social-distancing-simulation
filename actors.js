
let sample_size = 999

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

