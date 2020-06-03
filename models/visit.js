const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jrRangerBadgeSchema = new Schema({
    date: Date,
    parkName: String
})

const visitSchema = new Schema({
    date: Date,
    jrRangerBadge: jrRangerBadgeSchema,
    parkName: {
        type: String,
        enum: [
            'Acadia', 
            'American Samoa', 
            'Arches', 
            'Badlands', 
            'Big Bend', 
            'Biscayne', 
            'Black Canyon of the Gunnison', 
            'Bryce Canyon',
            'Canyonlands',
            'Capitol Reef',
            'Carlsbad Caverns',
            'Channel Islands',
            'Congaree',
            'Crater Lake',
            'Cuyahoga Valley',
            'Death Valley',
            'Denali',
            'Dry Tortugas',
            'Everglades',
            'Gates of the Arctic',
            'Gateway Arch',
            'Glacier',
            'Glacier Bay',
            'Grand Canyon',
            'Grand Teton',
            'Great Basin',
            'Great Sand Dunes',
            'Great Smoky Mountains',
            'Guadalupe Mountains',
            'Haleakalā',
            'Hawai\'i Volcanoes',
            'Hot Springs',
            'Indiana Dunes',
            'Isle Royale',
            'Joshua Tree',
            'Katmai',
            'Kenai Fjords',
            'Kings Canyon',
            'Kobuk Valley',
            'Lake Clark',
            'Lassen Volcanic',
            'Mammoth Cave',
            'Mesa Verde',
            'Mount Rainier',
            'North Cascades',
            'Olympic',
            'Petrified Forest',
            'Pinnacles',
            'Redwood',
            'Rocky Mountain',
            'Saguaro',
            'Sequoia',
            'Shenandoah',
            'Theodore Roosevelt',
            'Virgin Islands',
            'Voyaguers',
            'White Sands',
            'Wind Cave',
            'Wrangell-St. Elias',
            'Yellowstone',
            'Yosemite',
            'Zion'
        ]
    },
    parkState: String,
    parkUrl: String
},{
    timestamps: true
});

module.exports = mongoose.model('Visit', visitSchema);