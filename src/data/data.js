const places = [
    { 
        place_name: 'Gaisano Mall of Davao', 
        visitor_nr: 370, 
        capacity: 400,
        coords: [125.61408, 7.07792]
    },
    { 
        place_name: 'University of Immaculate Conception', 
        visitor_nr: 10, 
        capacity: 150,
        coords: [125.60011, 7.06987]
    },
    { 
        place_name: 'Chimes Specialty Store', 
        visitor_nr: 100, 
        capacity: 330,
        coords: [125.61922, 7.07610]
    },
    { 
        place_name: 'Abreeza Mall', 
        visitor_nr: 345, 
        capacity: 450,
        coords: [125.61153, 7.09128]
    },
    { 
        place_name: 'Peoples Park', 
        visitor_nr: 80, 
        capacity: 200,
        coords: [125.60870, 7.07075]
    },
    { 
        place_name: 'San Pedro Cathedral', 
        visitor_nr: 20, 
        capacity: 120,
        coords: [125.60945, 7.06474]
    }
];

export function fetchData() {
    return places.map(p => ({ 
        ...p,
        perc: Math.floor((p.visitor_nr / p.capacity) * 100)
    })).sort((a, b) => a.perc < b.perc ? 1 : -1);
}