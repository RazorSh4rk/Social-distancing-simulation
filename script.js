const d1 = new DrawJS("canv1")
d2 = new DrawJS("canv2")
v1 = new Vertex(0, 200)
v2 = new Vertex(200, 200)
infection_chance = parseFloat(document.getElementById('infection_chance').value) == NaN ? 
0.01 : parseFloat(document.getElementById('infection_chance').value)
isolation_rate = parseFloat(document.getElementById('isolation_rate').value) == NaN ? 
0.5 : parseFloat(document.getElementById('isolation_rate').value)

let days_elapsed = 0
d1.resize(200, 300)
d2.resize(200, 300)

const start = () => {

    console.log(`running with\ninfection chance: ${infection_chance}
    \nisolation rate: ${isolation_rate}\nsample size: ${sample_size}`)

    // loop 1
    setInterval(() => {
        let red = people.filter(el => el.infected).length

        if (red != sample_size + 1) {

            d1.background('black')
            d1.line(v1, v2, 'white')

            // move people into buildings
            people.forEach(el => {
                el.move(buildings)
                el.draw(d1)
            })

            // draw building
            buildings.forEach(el => { el.draw(d1) })
            d1.write('home', 5, 10, 'white', true, '10px Arial')
            d1.write('public', 170, 10, 'white', true, '10px Arial')

            people.filter(el => el.infected)
                .forEach(inf => {
                    people
                        .filter(el => el.location == inf.location)
                        .forEach(el => el.contract(infection_chance))
                })

            let percentage = (people.filter(el => el.infected).length
                / people.length * 100)
                .toFixed(1)

            d1.write("infected: " + people.filter(el => el.infected).length, 10, 220, 'red', true, '20px Arial')
            d1.write(percentage + "%", 150, 220, 'red', true, '14px Arial')
            d1.write("days: " + days_elapsed, 10, 240, 'red', true, '14px Arial')

            old_range = sample_size
            new_range = 50
            flattened = (red * new_range) / old_range

            graph_data = graph_data.length < 200 ?
                graph_data :
                graph_data.splice(1).map(el => { return { x: el.x - 1, y: el.y } })
            graph_data.push({ x: days_elapsed, y: 300 - flattened })
            d1.polygon(graph_data, '#0f0', false)


            days_elapsed++
        }
    }, 100);

    // loop 2
    setInterval(() => {
        let red = people_isolated.filter(el => el.infected).length

        if (red != sample_size + 1) {

            d2.background('black')
            d2.line(v1, v2, 'white')

            // move people into buildings
            people_isolated.forEach(el => {
                if (Math.random() < isolation_rate)
                    el.return_home()
                else
                    el.move(buildings)
                el.draw(d2)
            })

            // draw building
            buildings.forEach(el => { el.draw(d2) })
            d2.write('home', 5, 10, 'white', true, '10px Arial')
            d2.write('public', 170, 10, 'white', true, '10px Arial')

            people_isolated.filter(el => el.infected)
                .forEach(inf => {
                    people_isolated
                        .filter(el => el.location == inf.location && el.location != null)
                        .forEach(el => el.contract(infection_chance))
                })

            let percentage = (people_isolated.filter(el => el.infected).length
                / people_isolated.length * 100)
                .toFixed(1)

            d2.write("infected: " + people_isolated.filter(el => el.infected).length, 10, 220, 'red', true, '20px Arial')
            d2.write(percentage + "%", 150, 220, 'red', true, '14px Arial')
            d2.write("days: " + days_elapsed, 10, 240, 'red', true, '14px Arial')

            old_range = sample_size
            new_range = 50
            flattened = (red * new_range) / old_range

            graph_data_isolated = graph_data_isolated.length < 100 ?
                graph_data_isolated :
                graph_data_isolated.map(el => { return { x: el.x - 1, y: el.y } })
            graph_data_isolated.push({ x: days_elapsed, y: 300 - flattened })
            d2.polygon(graph_data_isolated, '#0f0', false)


            days_elapsed++
        }
    }, 100);
}
