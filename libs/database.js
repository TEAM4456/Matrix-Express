var mongoose = require("mongoose");
const databasestring = "mongodb://localhost/scoutingdb";
mongoose.connect(databasestring);
/* This is an example of a match
{
    // TEAM INFO BLOCK
    match_number: Number,
    // CHECKBOX BLOCK
    did_climb: Boolean,
    did_piggyback: Boolean,
    // AUTO BLOCK
    auto_line: Boolean,
    auto_delivered_switch: Number,
    auto_delivered_scale: Number,
    auto_delivered_oppswitch: Number,
    // MANUAL BLOCK
    prisms_delivered_switch: Number,
    prisms_delivered_scale: Number,
    prisms_delivered_oppswitch: Number,
    prisms_delivered_vault: Number,
    prisms_failed_switch: Number,
    prisms_failed_scale: Number,
    prisms_failed_oppswitch: Number,
    prisms_failed_vault: Number,
    // OTHER BLOCK
    notes: String,
    failed_in_transit: Number
}
*/
scoutingTeamSchema = mongoose.Schema({
    key: String, // example: "frc4456"
    matches: [{
        // TEAM INFO BLOCK
        match_number: Number,
        // CHECKBOX BLOCK
        did_climb: Boolean,
        did_piggyback: Boolean,
        // AUTO BLOCK
        auto_line: Boolean,
        auto_delivered_switch: Number,
        auto_delivered_scale: Number,
        auto_delivered_oppswitch: Number,
        // MANUAL BLOCK
        prisms_delivered_switch: Number,
        prisms_delivered_scale: Number,
        prisms_delivered_oppswitch: Number,
        prisms_delivered_vault: Number,
        prisms_failed_switch: Number,
        prisms_failed_scale: Number,
        prisms_failed_oppswitch: Number,
        prisms_failed_vault: Number,
        // OTHER BLOCK
        notes: String,
        failed_in_transit: Number
    }]
});
var scoutingTeam = mongoose.model('scoutingTeam', scoutingTeamSchema);
// teamKey is simply something like "frc4456", data is an array of matches for that team.
function updateTeam(teamKey, data) {
    return new Promise(async function(resolve, reject) {
        var currentTeam = await scoutingTeam.find({key: teamKey});
        if(currentTeam.length === 0) {
            scoutingTeam.create({
                key: teamKey,
                matches: data,
            });
            resolve({"error":false});
        }
        else if(currentTeam.length > 1) {
            resolve({"error":true,"message":"Duplicate teams detected in database."});
        }
        else {
            currentTeamData = currentTeam[0];
            data.forEach((match) => {
                currentTeamData.matches.push(match);
            });
            currentTeam.set('matches', currentTeamData.matches);
            currentTeam.save();
            resolve({"error":false});
        }
    });
}
function getTeam(teamKey) {
    return new Promise(async function(resolve, reject) {
        var currentTeam = await scoutingTeam.find({key: teamKey});
        if(currentTeam.length === 0) {
            resolve({"error":true,"message":"Team not found in database."});
        }
        else if(currentTeam.length > 1) {
            resolve({"error":true,"message":"Duplicate teams in database."});
        }
        else {
            var currentTeamData = currentTeam[0];
            resolve({"error":false,"data":currentTeamData});
        }
    });
}
module.exports.updateTeam = updateTeam;
module.exports.getTeam = getTeam;